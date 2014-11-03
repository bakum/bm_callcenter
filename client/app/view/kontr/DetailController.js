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
    },

    onCreateContact: function () {
        var grid = this.lookupReference('grid'),
            store = Ext.getStore('conrstore'),
            dat = rec = this.getViewModel().getData().theKontragent;
            rec = new client.model.Contacts({
                KONTRAGENTId: dat.id
            }),
            rowEditing = grid.getPlugin('rowconediting');

        console.log(dat);
        rowEditing.cancelEdit();
        store.insert(0, rec);
        rowEditing.startEdit(0, 0);
        grid.down('#removeContact').setDisabled(true);
    },

    onContSelection: function(view, records) {
        var grid = this.lookupReference('grid');
        grid.down('#removeContact').setDisabled(!records.length);
    },

    onContClickDelete: function () {
        Ext.Msg.confirm('Подтверждение', 'Вы уверены?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice == 'yes') {
            var grid = this.lookupReference('grid'),
                sm = grid.getSelectionModel(),
                store = Ext.getStore('conrstore'),
                rowEditing = grid.getPlugin('rowconediting');

            rowEditing.cancelEdit();
            store.remove(sm.getSelection());
            if (store.getCount() > 0) {
                sm.select(0);
            }
            ;
            store.sync();
        }
    }
})