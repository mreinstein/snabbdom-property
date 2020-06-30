import html from 'https://cdn.jsdelivr.net/npm/snabby@1/snabby.js'


function init (options={}) {
    const model = {
        properties: [
            {
                name: 'name',
                type: 'string',
                value: 'root'
            },
            {
                name: 'display',
                type: 'string',
                value: 'grid'
            },
            {
                name: 'grid-template-columns',
                type: 'string',
                value: 'repeat(2, 1fr)'
            },
            {
                name: 'grid-template-rows',
                type: 'string',
                value: 'repeat(3, 1fr)'
            },
            {
                name: 'grid-gap',
                type: 'string',
                value: '8px'
            },
            {
                name: 'height',
                type: 'string',
                value: '100%'
            }               
        ]
    }
    return model
}


function view (model, update) {
    return html`<div class="property-set-contents">
        <div class="property-field">
            <div class="property-label">
                <input type="text" value="name">
            </div>

            <div class="c"><input type="text" value="root"></div>
        </div>

        <div class="property-field">
            <div class="property-label">
                <input type="text" value="display">
            </div>
            <div class="c"><input type="text" value="grid"></div>

        </div>

        <div class="property-field">
            <div class="property-label">
                <input type="text" value="grid-template-columns">
            </div>
            <div class="c">
                <input type="text" value="repeat(2, 1fr)">
            </div>

        </div>

        <div class="property-field">
            <div class="property-label">
                <input type="text" value="grid-template-rows">
            </div>
            <div class="c"><input type="text" value="repeat(3, 1fr)"></div>
        </div>

        <div class="property-field">
            <div class="property-label">
                <input type="text" value="grid-gap">
            </div>
            <div class="c"><input type="text" value="8px"></div>
        </div>

        <div class="property-field">
            <div class="property-label">
                <input type="text" value="height">
            </div>
            <div class="c"><input type="text" value="100%"></div>
        </div>
    </div>`
}


export default { init, view }
