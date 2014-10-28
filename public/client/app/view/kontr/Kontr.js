Ext.define('client.view.kontr.Kontr', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.kontrgrid',

    requires: [
        'client.view.kontr.KontrController',
        'client.view.kontr.KontrModel',
        'client.ProgressBarPager'
    ],

    controller: 'kontr',
    viewModel: {
        type: 'kontr'
    },
    plugins: [
        Ext.create('Ext.grid.plugin.RowEditing', {

            listeners: {
                cancelEdit: function (rowEditing, context) {

                    var grid = rowEditing.grid,
                        store = grid.getBind().store.getValue();
                    if (context.record.phantom) {
                        store.remove(context.record);
                    }
                },
                edit : function(rowEditing, context){
                    rowEditing.grid.getBind().store.getValue().sync();
                }
            },
            clicksToMoveEditor: 2,
            reference: 'rowEdit',
            useNull: false,
            autoCancel: true,
            pluginId: 'rowediting',
            saveBtnText: 'Сохранить',
            cancelBtnText: 'Отменить',
            errorSummary: true
        })
    ],
    bind: '{kontragents}',
    columns: [
        {
            xtype: 'actioncolumn',
            width: 50,
            handler: 'onKontrClick',
            items: [{
                tooltip: 'Просмотр абонента',
                iconCls: 'ticket'
            }]
        },
        {
            text: 'ID',
            hidden: true,
            xtype: 'numbercolumn',
            align: 'right',
            format:'0',
            /*flex: 1,
            sortable: true,*/
            dataIndex: 'id'
            //editor: {xtype: 'numberfield', allowBlank: true}
        },
        {
            text: 'Наименование',
            header: "Наименование",
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
    dockedItems: [{
        xtype: 'pagingtoolbar',
        bind: {
            store: '{kontragents}'
        },   // same store GridPanel is using
        dock: 'bottom',
        displayInfo: true,
        plugins: Ext.create('client.ProgressBarPager', {
            width: 350,
            pluginId: 'pager'
        })
    },
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
        selectionchange: 'onSelection'
    }
})
