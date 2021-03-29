import html from 'https://cdn.skypack.dev/snabby?min'


function init (options={}) {
    const model = {
        properties: [ ...options.properties ]
    }

    return model
}


function view (model, update) {

    return html`<div class="property-set-contents">
        ${model.property.properties.map((p, propertyIdx) => {

            const _focusLabel = function (ev) {
                // store the current property name before it's modified
                // if it's changed, we can use this to rename the property
                // on the selected element
                /*
                currentProp = label.value
                initialLabelValue = label.value
                initialInputValue = input.value
                */
            }


            const _blurLabel = function (ev) {
                const label = ev.target
                const value = label.value.trim()

                if (value === model.property.properties[propertyIdx].label)
                    return

                if (value.length > 0)
                     model.property.properties[propertyIdx].label = value
                else
                    model.property.properties.splice(propertyIdx, 1)

                update()
            }


            const _keydownLabel = function (ev) {
                // enter and colon keys save input
                if (ev.keyCode === 13 || ev.keyCode === 186) {
                    ev.preventDefault()

                    // change focus to the property value element   
                    const input = ev.target.parentNode.parentNode.querySelector('.c > input')
                    input.focus()
                }
            }

            
            const _blurVal = function (ev) {
                const label = ev.target
                const value = label.value.trim()

                if (value === model.property.properties[propertyIdx].value)
                    return

                if (value.length > 0)
                     model.property.properties[propertyIdx].value = value
                else
                    model.property.properties.splice(propertyIdx, 1)

                update()
            }


            const _keydownVal = function (ev) {
                // enter and semicolon keys save input
                if (ev.keyCode === 13 || ev.keyCode === 186) {
                    ev.preventDefault()

                    if (propertyIdx === model.property.properties.length-1) {
                        // there's already a blank row, don't add a new one
                        if (p.value === '' && p.label === '')
                            return
                        
                        model.property.properties.push({
                            label: '',
                            type: 'string',
                            value: ''
                        })
                        update()
                        setTimeout(function () {
                            const input = ev.target.parentNode.parentNode.nextElementSibling.querySelector('.property-label > input')
                            input.focus()
                        }, 0)
                    } else {
                        // focus on the next one
                        const input = ev.target.parentNode.parentNode.nextElementSibling.querySelector('.property-label > input')
                        input.focus()
                    }
                }
            }


            const _focusVal = function (ev) {
                const el = ev.target
                // force caret to the end of the input
                // https://stackoverflow.com/questions/511088/use-javascript-to-place-cursor-at-end-of-text-in-text-input-element
                el.selectionStart = el.selectionEnd = el.value.length
            }

            return html`<div class="property-field" @key=${propertyIdx}>
                <div class="property-label">
                    <input type="text"
                           @props:value=${p.label}
                           @on:blur=${_blurLabel}
                           @on:focus=${_focusLabel}
                           @on:keydown=${_keydownLabel}/>
                </div>

                <div class="c">
                    <input type="text"
                           @props:value=${p.value}
                           @on:blur=${_blurVal}
                           @on:focus=${_focusVal}
                           @on:keydown=${_keydownVal}/>
                </div>
            </div>`
        })}
    </div>`
}


export default { init, view }
