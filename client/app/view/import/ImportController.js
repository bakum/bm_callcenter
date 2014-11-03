Ext.define('client.view.import.ImportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.import',

    requires: [
        'Ext.window.Toast'
    ],

    onUpload: function () {
        var form = this.lookupReference('form'),
            my = this;
        if (form.isValid()) {
            form.submit({
                url: '/directapi/uploads',
                waitMsg: 'Uploading your file...',
                success: function (fp, o) {
                    var grid = my.lookupReference('filegrid'),
                        store = grid.getBind().store.getValue();
                    //console.log(store);
                    store.add([
                        {filename:Ext.decode(o.response.responseText).file}
                    ]);
                    //label.setText(Ext.decode(o.response.responseText).file);
                },
                failure:function (form, action) {
                    Ext.Msg.alert('Failed', action.result ? action.result.message : 'No response');
                }
            });
        }
    },
    onExport: function() {

    }
})