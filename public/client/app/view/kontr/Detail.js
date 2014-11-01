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
    bodyPadding: 20,

    controller: 'kontrdetail',
    viewModel: {
        type: 'kontrdetail'
    },

    tbar: [{
        text: 'Сохранить',
        handler: 'onSaveClick'
    }],
    items: [{
        xtype: 'component',
        bind: '{theKontragent.fullname}',
        cls: 'title',
        margin: '0 0 10 0'
    },
        {
            xtype: 'form',
            border: false,
            maxWidth: 700,
            height: 200,
            reference: 'form',
            defaults: {
                anchor: '80%'
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
                {
                    xtype: 'combobox',
                    fieldLabel: 'Подразделение',
                    allowBlank: false,
                    //autoSelect:true,
                    queryMode:'remote',
                    forceSelection: true,
                    valueField: 'id',
                    displayField: 'fullname',
                    publishes: ['value'],
                    store: Ext.create('Ext.data.Store',{
                        storeId:'DivStore',
                        autoLoad: true,
                        fields: ['id', 'fullname'],
                        proxy: {
                            type: 'rest',
                            url: '/directapi/divisions',
                            reader: {
                                type: 'json'
                            },

                            writer: {
                                type: 'json',
                                encode: false
                            }
                        }
                    }),
                    bind: '{theKontragent.DIVISIONId}'
                }
            ]
        }
    ]
})
