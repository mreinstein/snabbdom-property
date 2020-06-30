// TODO: port this to snabbdom

// from  https://github.com/mreinstein/substrate-builder/tree/master/lib


function findNextPropertyLabel (el) {
  const currentField = el.parentNode.parentNode
  const fields = currentField.parentNode.querySelectorAll('.property-field')
  for (let i = fields.length-2; i >= 0; i--)
    if (fields[i] === currentField)
      return fields[i+1].querySelector('.property-label > input')
}


/**
 * Encapsulates the UI properties pane element
 */
export default function uiPropertyPane (options={}) {
  const { dom, contentDom } = expandoPane({ name: options.name || 'properties' })

  const mode = options.mode || 'properties'

  let currentNode, el, currentProp, initialLabelValue, initialInputValue


  const _setProperty = function (key, value) {
    if (currentNode) {
      //const props = currentNode.style
      if (value) {
        publish('property-change', currentNode, key, value)
      }
      else if (initialInputValue) {
        //deleting
        publish('property-change', currentNode, key, '__DELETE')
      }
    }
  }


  const _setProperties = function () {
    contentDom.innerHTML = ''

    let count = 0

    // for both nodes and scripts:
    // human-friendly name
    _createStringField(contentDom, { label: 'name', value: currentNode.name, type: 'string' })
    count++

    // if not a script
    if (currentNode.style) {
      let props = currentNode.style
      Object.keys(props).forEach(function (key) {
       _createStringField(contentDom, { label: key, value: props[key], type: 'string' })
        count++
      })
    }

    return count
  }


  // associate a substrate node with this property pane
  const setNode = function (node) {
    contentDom.innerHTML = ''
    currentNode = node
    el = node

    let count = 0
    if (currentNode)
      count += _setProperties()

    if (!count)
      _createStringField(contentDom, { label: '', value: '', type: 'string' })
  }


  const _createStringField = function (propertySet, property={}) {
    const div = document.createElement('div')
    div.classList.add('property-field')

    div.innerHTML = `\
      <div class="property-label">
        <input type="text" value="${property.label || ''}">
      </div>
      <div class="c"><input type="text" value="${property.value || ''}"></div>`

    //============================
    // LABEL
    //============================

    const label = div.querySelector('.property-label > input')
    label.addEventListener('focus', function (ev) {
      // store the current property name before it's modified
      // if it's changed, we can use this to rename the property
      // on the selected element
      currentProp = label.value
      initialLabelValue = label.value
      initialInputValue = input.value
    })

    label.addEventListener('blur', function (ev) {
      if (label.value == currentProp)
        return // unchanged prop name, do nothing

      label.value = label.value.trim()
      // rename element property
      if (currentNode) {
        if (mode === 'properties') {
          if (label.value.length > 0) {
            _setProperty(label.value, initialInputValue)
            _setProperty(currentProp, undefined)
          } else {
            // just delete it
            _setProperty(currentProp, undefined)
          }
        }
      }
    })
    label.addEventListener('keydown', function (ev) {
      // enter and colon keys save input
      if (ev.keyCode === 13 || ev.keyCode === 186) {
        ev.preventDefault()
        // change focus to the property value element
        input.focus()
      }
    })

    //============================
    // INPUT
    //============================

    const input = div.querySelector('.c > input')
    input.addEventListener('focus', function (ev) {
      currentProp = label.value
      initialInputValue = input.value
    })
    input.addEventListener('keydown', function (ev) {
      // enter and semicolon keys save input
      if (ev.keyCode === 13 || ev.keyCode === 186) {
        ev.preventDefault()
        //publish('property-change', property.label, input.value)
        let nextLabel = findNextPropertyLabel(input)
        if (!nextLabel && currentNode.style) {
          _createStringField(contentDom)
          nextLabel = findNextPropertyLabel(input)
        }
        if (nextLabel)
          nextLabel.focus()
        else
          input.blur()
      }
    })
    input.addEventListener('blur', function (ev) {
      if (initialInputValue == input.value)
        return // unchanged value, do nothing
      try {
        if (mode === 'properties') {
          if (!input.value || input.value.length == 0) {
            // just delete it
            _setProperty(currentProp, undefined)
          } else {
            _setProperty(label.value, input.value)
          }
        }
      } catch (er) {
        console.log(er)
      }
    })

    propertySet.appendChild(div)
  }

  options.props = options.props || [ ]
  if (!options.props.length)
    options.props.push({ label: '', value: '', type: 'string' })

  options.props.forEach(function (property) {
    if (property.type === 'string') {
      _createStringField(contentDom, property)
    } else if (property.type === 'button') {
      const button = document.createElement('button')
      button.style.width = '100%'
      button.innerText = property.label
      button.classList.add('editor-button')
      contentDom.appendChild(button)
      button.addEventListener('click', function (ev) {
        publish('property-change', property.label, ev)
      })
    }
  })

  return Object.freeze({ dom, setNode, subscribe, unsubscribe })
}
