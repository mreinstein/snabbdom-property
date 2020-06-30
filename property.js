import html from 'https://cdn.jsdelivr.net/npm/snabby@1/snabby.js'


function init (options={}) {
    const model = {
        properties: [ ...options.properties ]
    }

    return model
}


function view (model, update) {
    return html`<div class="property-set-contents">
        ${model.property.properties.map((p) => {
            return html`<div class="property-field">
                <div class="property-label">
                    <input type="text" value="${p.label}">
                </div>

                <div class="c"><input type="text" value="${p.value}"></div>
            </div>`
        })}
    </div>`
}


export default { init, view }
