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
            xtype: 'container',
            cls: 'appBanner',
            padding: 10,
            height: 70,
            html: '<div class="logo"></div><h2>Asterisk BM Call Center</h2>',
            layout: {
                type: 'hbox',
                align: 'middle'
            },
            items: {
                xtype: 'component',
                id: 'app-header-username',
                cls: 'app-header-text',
                //html: '<h3>Username</h3>',
                bind: '{currentUser.name}',
                listeners: {
                    click: 'onClickUserName',
                    element: 'el'
                },
                margin: '0 10 0 0'
            }

        },
        {
            xtype: 'panel',
            bind: {
                title: 'Navigation'
            },
            region: 'west',
            //html: '<ul><li>This area is commonly used for navigation, for example, using a "tree" component.</li></ul>',
            width: 250,
            split: true,
            collapsible: true,
            collapsed: false,

            items: [
                {
                    xtype: 'treepanel',
                    rootVisible: false,
                    store: Ext.create('Ext.data.TreeStore', {
                        root: {
                            text: "Navigation",
                            expanded: true,
                            children: [
                                {
                                    text: "Контрагенты",
                                    leaf: true
                                },
                                {
                                    text: "Листы дозвона",
                                    leaf: true
                                },
                                {
                                    text: "Настройки",
                                    leaf: true
                                },
                                {
                                    text: "Пользователи",
                                    leaf: true
                                }

                            ]
                        }
                    }),
                    listeners: {
                        itemdblclick: 'onNavDblClick'
                    }
                }
            ],
            tbar: [
                {
                    text: 'Logout',
                    handler: 'onLogout'
                }
            ]
        },
        {
            region: 'center',
            xtype: 'tabpanel',
            flex: 1,
            reference: 'main',
            plugins: [
                {
                    ptype: 'tabscrollermenu'
                },
                {
                    ptype: 'tabclosemenu',
                    closeTabText: 'Закрыть вкладку',
                    closeOthersTabsText: 'Закрыть другие вкладки',
                    closeAllTabsText: 'Закрыть все вкладки'
                }
            ],
            items: [{
                title: 'Dashboard',
                html: '<h2>asdasdasaasdasda</h2>'
            }]
        }
    ]
});
