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
                //bind: '{currentUser.name}',
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
            html: '<ul><li>This area is commonly used for navigation, for example, using a "tree" component.</li></ul>',
            width: 250,
            split: true,
            collapsible: true,
            collapsed: false,
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
            items: [
                {
                    title: 'Клиенты',
                    layout: 'fit',
                    items: [
                        {
                            xtype: 'grid',
                            reference: 'kon_grid',
                            plugins: [
                                Ext.create('Ext.grid.plugin.RowEditing', {
                                    listeners: {
                                        cancelEdit: 'onCancelEdit'
                                    },
                                    clicksToMoveEditor: 2,
                                    reference: 'rowEdit',
                                    useNull: false,
                                    autoCancel: true,
                                    pluginId: 'rowediting',
                                    saveBtnText: 'Сохранить',
                                    cancelBtnText: 'Отменить',
                                    errorSummary: false
                                })
                            ],
                            //title:"Клиенты",
                            //store:Ext.create('client.store.Kontragents'),
                            bind: '{kontragents}',
                            columns: [
                                {
                                    text: 'ID',
                                    hidden: true,
                                    xtype: 'numbercolumn', align: 'right',
                                    flex: 1,
                                    sortable: true,
                                    dataIndex: 'id',
                                    editor: {xtype: 'numberfield', allowBlank: true}
                                },
                                {
                                    text: 'Наименование',
                                    hidden: false,
                                    flex: 1,
                                    sortable: true,
                                    dataIndex: 'fullname',
                                    editor: {xtype: 'textfield', allowBlank: false}
                                },
                                {
                                    text: 'ИНН',
                                    hidden: false,
                                    flex: 1,
                                    sortable: true,
                                    dataIndex: 'inn',
                                    editor: {xtype: 'textfield', allowBlank: true}
                                },
                                {
                                    text: 'ОКПО',
                                    hidden: false,
                                    flex: 1,
                                    sortable: true,
                                    dataIndex: 'okpo',
                                    editor: {xtype: 'textfield', allowBlank: true}
                                }

                            ],
                            bbar: Ext.create('Ext.PagingToolbar', {
                                pageSize: 20,
                                bind: {
                                    store: '{kontragents}'
                                },
                                //displayMsg: '{0} - {1} из {2}',
                                displayInfo: true,
                                plugins: Ext.create('Ext.ccenter.ProgressBarPager', {
                                    width: 350,
                                    pluginId: 'pager'
                                })
                            }),
                            dockedItems: [
                                {
                                    xtype: 'toolbar',
                                    items: [
                                        {
                                            text: 'Добавить',
                                            iconCls: 'icon-user-add',
                                            handler: 'onCreateRecord'
                                        },
                                        {
                                            text: 'Удалить',
                                            itemId: 'removeKontrag',
                                            iconCls: 'icon-delete-user',
                                            disabled: true,
                                            handler: 'onClickDelete'
                                        }
                                    ]
                                }
                            ],
                            listeners: {
                                beforerender: function (component, b) {
                                    var store = component.getBind().store.getValue();
                                    //store.load();
                                },
                                selectionchange:'onSelection'

                            }
                        }
                    ]
                }
            ]
        }
    ]
});
