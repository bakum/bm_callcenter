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
    ]
})
