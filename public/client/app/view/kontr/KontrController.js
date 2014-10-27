Ext.define('client.view.kontr.KontrController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.kontr',

    requires: [
        'Ext.MessageBox',
        'Ext.window.Toast'
    ],

    onCancelEdit: function(rowEditing, context) {
        var grid = this.getView(),
            store = grid.getBind().store.getValue();
        if (context.record.phantom) {
            store.remove(context.record);
        }
    },
    onCreateRecord: function () {
        var grid = this.getView(),
            store = grid.getBind().store.getValue(),
            rec = new client.model.Kontragents({
                deleted:0,
                ur_fiz:0
            }),
            rowEditing = grid.getPlugin('rowediting');

        rowEditing.cancelEdit();
        store.insert(0, rec);
        rowEditing.startEdit(0, 0);
    },
    onClickDelete: function () {
        Ext.Msg.confirm('Подтверждение', 'Вы уверены?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice == 'yes') {
            var grid = this.getView(),
                sm = grid.getSelectionModel(),
                store = grid.getBind().store.getValue(),
                rowEditing = grid.getPlugin('rowediting');

            rowEditing.cancelEdit();
            store.remove(sm.getSelection());
            if (store.getCount() > 0) {
                sm.select(0);
            }
        }
    },

    onSelection: function(view, records){
        //var grid = this.getView();
        this.getView().down('#removeKontrag').setDisabled(!records.length);
    }
})
