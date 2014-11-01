Ext.define('client.view.kontr.DetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.kontrdetail',

    requires: [
        'Ext.window.Toast'
    ],

    onSaveClick: function() {
        var form = this.lookupReference('form'),
            rec;

        if (form.isValid()) {
            rec = this.getViewModel().getData().theKontragent;
            // TODO: implement isolated sessions
            Ext.Msg.wait('Сохранение', 'Сохранение абонента...');
            rec.save({
                scope: this,
                callback: this.onComplete
            });
        }
    },

    onCancelClick: function() {
        var rec = this.getViewModel().getData().theKontragent;
        rec.cancelEdit();
        console.log(rec);
    },

    onComplete: function() {
        Ext.Msg.hide();
        Ext.toast({
            title: 'Save',
            html: 'Абонент успешно сохранен',
            align: 't',
            bodyPadding: 10
        });
    }
})