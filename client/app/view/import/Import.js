Ext.define('client.view.import.Import', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.import',

    requires: [
        'client.view.import.ImportModel',
        'client.view.import.ImportController',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.field.TextArea',
        'Ext.layout.container.VBox',
        'Ext.form.field.ComboBox',
        'Ext.view.View'
    ],

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    componentCls: 'importcls',
    bodyPadding: 10,

    controller: 'import',
    viewModel: {
        type: 'import'
    },
    items: [
        {
            xtype: 'component',
            title: "Import",
            //bind: '{theTicket.title}',
            cls: 'title',
            margin: '0 0 20 0'
        },
        {
            xtype: 'form',
            border: false,
            maxWidth: 600,
            height: 100,
            reference: 'form',
            defaults: {
                anchor: '95%'
            },
            items: [{
                xtype: 'filefield',
                fileInputAttributes: {
                    accept: '*.csv'
                },
                name: 'file',
                fieldLabel: 'File',
                labelWidth: 50,
                msgTarget: 'side',
                allowBlank: false,
                anchor: '100%',
                buttonText: 'Select a File...'
            }],
            buttons: [{
                text: 'Upload',
                handler: 'onUpload'
            }]

        }, {
            xtype: 'gridpanel',
            reference: 'filegrid',
            margin: '20 0 0 0',
            title: 'Файлы для обработки',
            bind: {
                store: '{files}'
            },
            columns: [{
                text: 'Имя файла',
                dataIndex: 'filename',
                flex: 1
            },
                {
                    xtype: 'actioncolumn',
                    width: 100,
                    handler: 'onExport',
                    items: [{
                        iconCls: 'icon-disk'
                    }]
                }]
        }
    ]
})