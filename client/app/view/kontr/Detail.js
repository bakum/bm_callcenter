Ext.define('client.view.kontr.Detail', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.kontrdetail',

    requires: [
        'client.view.kontr.DetailModel',
        'client.view.kontr.DetailController',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.layout.container.VBox',
        'Ext.form.field.ComboBox',
        'Ext.view.View'
    ],
    bind: {
        title: 'Абонент - {theKontragent.fullname}'
    },
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    componentCls: 'kontr-detail',
    bodyPadding: 5,

    controller: 'kontrdetail',
    viewModel: {
        type: 'kontrdetail'
    },

    tbar: [{
        text: 'Сохранить',
        handler: 'onSaveClick'
    }],
    items: [
        {
            xtype: 'component',
            bind: '{theKontragent.fullname}',
            cls: 'title',
            margin: '0 0 5 0'
        },
        {
            xtype: 'form',

            border: false,
            maxWidth: 700,
            //height: 200,
            reference: 'form',
            defaults: {
                anchor: '100%'
            },
            items: [

                {
                    xtype: 'textfield',
                    fieldLabel: 'Имя',
                    allowBlank: false,
                    bind: '{theKontragent.fullname}',
                    publishes: ['value']
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Полное имя',
                    allowBlank: true,
                    bind: '{theKontragent.namefull}',
                    publishes: ['value']
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'ИНН',
                    allowBlank: true,
                    bind: '{theKontragent.inn}',
                    publishes: ['value']
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'ОКПО',
                    allowBlank: true,
                    bind: '{theKontragent.okpo}',
                    publishes: ['value']
                },
                /*{
                 xtype: 'combobox',
                 fieldLabel: 'Подразделение',
                 allowBlank: false,
                 //autoSelect:true,
                 queryMode:'remote',
                 forceSelection: true,
                 valueField: 'id',
                 displayField: 'u_name',
                 publishes: ['value'],
                 store: Ext.create('Ext.data.Store',{
                 autoLoad: true,
                 fields: ['id', 'u_name'],
                 proxy: {
                 type: 'rest',
                 url: '/directapi/users',
                 reader: {
                 type: 'json'
                 },

                 writer: {
                 type: 'json',
                 encode: false
                 }
                 }
                 }),
                 bind: '{theKontragent.USERId}'
                 },*/
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Адрес',
                    allowBlank: true,
                    bind: '{theKontragent.adress}',
                    publishes: ['value']
                }
            ]
        },
        {
            xtype: 'gridpanel',
            title: 'Контактные данные',
            //height: 300,
            reference: 'grid',
            margin: '10 0 0 0',
            bind: {
                store: '{contacts}'
            },
            plugins: [
                Ext.create('Ext.grid.plugin.RowEditing', {

                    listeners: {
                        cancelEdit: function (rowEditing, context) {

                            var store = Ext.getStore('conrstore');
                            console.log(store);
                            if (context.record.phantom) {
                                store.remove(context.record);
                            }
                        },
                        edit: function (rowEditing, context) {
                            console.log(Ext.getStore('conrstore'));
                            Ext.getStore('conrstore').sync();
                        }
                    },
                    clicksToMoveEditor: 2,
                    useNull: false,
                    autoCancel: true,
                    pluginId: 'rowconediting',
                    saveBtnText: 'Сохранить',
                    cancelBtnText: 'Отменить',
                    errorSummary: false
                })
            ],
            columns: [
                {
                    text: 'ID',
                    hidden: true,
                    xtype: 'numbercolumn',
                    align: 'right',
                    format: '0',
                    /*flex: 1,
                     sortable: true,*/
                    dataIndex: 'id'
                    //editor: {xtype: 'numberfield', allowBlank: true}
                },
                {
                    text: 'Ссылка',
                    hidden: false,
                    xtype: 'numbercolumn',
                    align: 'right',
                    format: '0',
                    /*flex: 1,
                     sortable: true,*/
                    dataIndex: 'KONTRAGENTId'
                },
                {
                    text: 'Телефон',
                    header: "Телефон",
                    hidden: false,
                    flex: 1,
                    sortable: true,
                    dataIndex: 'phone',
                    editor: {xtype: 'textfield', allowBlank: false}
                },
                {
                    text: 'E-Mail',
                    header: "E-Mail",
                    hidden: false,
                    flex: 1,
                    sortable: true,
                    dataIndex: 'email',
                    editor: {xtype: 'textfield'}
                }
            ],
            bbar:[

            ],
            dockedItems: [
                {
                    xtype: 'pagingtoolbar',
                    bind: {
                        store: '{contacts}'
                    },   // same store GridPanel is using
                    dock: 'bottom',
                    //pageSize: 3,
                    displayInfo: true,
                    emptyMsg: "Нет контактов для отображения"
                },

                {
                    xtype: 'toolbar',
                    items: [
                        {
                            text: 'Добавить',
                            iconCls: 'icon-user-add',
                            handler: 'onCreateContact'
                        },
                        {
                            text: 'Удалить',
                            itemId: 'removeContact',
                            iconCls: 'icon-delete-user',
                            disabled: true,
                            handler: 'onContClickDelete'
                        }
                    ]
                }
            ],
            listeners: {
                selectionchange: 'onContSelection'
            }
        }
    ]
})
