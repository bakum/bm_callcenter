Ext.define('client.view.kontr.KontrController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.kontr',

    requires: [
        'Ext.MessageBox',
        'Ext.window.Toast'
    ],

    onCancelEdit: function (rowEditing, context) {
        var grid = this.getView(),
            store = Ext.getStore('kontrstore');
        if (context.record.phantom) {
            store.remove(context.record);
        }
    },
    onCreateRecord: function () {
        var grid = this.getView(),
            store = Ext.getStore('kontrstore'),
            rec = new client.model.Kontragents({
                id: null,
                deleted: 0,
                ur_fiz: 0
            }),
            rowEditing = grid.getPlugin('rowediting');

        rowEditing.cancelEdit();
        store.insert(0, rec);
        rowEditing.startEdit(0, 0);
        this.getView().down('#removeKontrag').setDisabled(true);
    },
    onClickDelete: function () {
        Ext.Msg.confirm('Подтверждение', 'Вы уверены?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice == 'yes') {
            var grid = this.getView(),
                sm = grid.getSelectionModel(),
                store = Ext.getStore('kontrstore'),
                rowEditing = grid.getPlugin('rowediting');

            rowEditing.cancelEdit();
            store.remove(sm.getSelection());
            if (store.getCount() > 0) {
                sm.select(0);
            }
            ;
            store.sync();
        }
    },

    onSelection: function (view, records) {
        //var grid = this.getView();
        this.getView().down('#removeKontrag').setDisabled(!records.length);
    },

    onKontrClick: function (view, rowIdx, colIdx, item, e, rec) {
       // console.log(rec);
        this.fireViewEvent('viewkontragent', this.getView(), rec);
    },

    destroy: function(){
        /* this.getView().destroy();
        var store = Ext.getWidget('kontrgrid');
        console.log('Destroy called',store);*/
    }
})
