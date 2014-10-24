/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('client.view.main.Main', {
    extend: 'Ext.container.Container',
    plugins: 'viewport',
    requires: [
        'client.view.main.MainController',
        'client.view.main.MainModel'
    ],

    xtype: 'app-main',

    controller: 'main',
    viewModel: {
        type: 'main'
    },

    layout: {
        type: 'border'
    },

    items: [
        {
            region: 'north',
            xtype: 'component',
            cls: 'appBanner',
            padding: 10,
            height: 70,
            html: '<div class="logo"></div><h2>Asterisk BM Call Center</h2>'
        },
        {
            xtype: 'panel',
            bind: {
                title: 'Navigation'
            },
            region: 'west',
            html: '<ul><li>This area is commonly used for navigation, for example, using a "tree" component.</li></ul>',
            width: 250,
            split: true,
            collapsible: true,
            collapsed: true,
            tbar: [
                {
                    text: 'Button',
                    handler: 'onClickButton'
                }
            ]
        },
        {
            region: 'center',
            xtype: 'tabpanel',
            items: [
                {
                    title: 'Tab 1',
                    html: '<h2>Content appropriate for the current navigation.</h2>'
                }
            ]
        }
    ]
});
