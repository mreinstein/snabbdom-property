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

            const _blurLabel = function (ev) {
                
                // TODO
            }

            const _keydownLabel = function (ev) {
                // TODO
            }

            const _focusLabel = function (ev) {

                // TODO
            }

            const _blurVal = function (ev) {
                // TODO
            }

            const _keydownVal = function (ev) {
                // TODO
            }

            const _focusVal = function (ev) {
                // TODO
            }

            return html`<div class="property-field">
                <div class="property-label">
                    <input type="text"
                           value="${p.label}"
                           @on:blur=${_blurLabel}
                           @on:focus=${_focusLabel}
                           @on:keydown=${_keydownLabel}>
                </div>

                <div class="c">
                    <input type="text"
                           value="${p.value}"
                           @on:blur=${_blurVal}
                           @on:focus=${_focusVal}
                           @on:keydown=${_keydownVal}>
                </div>
            </div>`
        })}
    </div>`
}


export default { init, view }
