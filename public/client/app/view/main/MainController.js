/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('client.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    requires: [
        'Ext.MessageBox',
        'Ext.window.Toast'
    ],

    alias: 'controller.main',

    onClickDelete: function () {
        Ext.Msg.confirm('Подтверждение', 'Вы уверены?', 'onConfirm', this);
    },

    onConfirm: function (choice) {
        if (choice == 'yes') {
            var grid = this.lookupReference('kon_grid'),
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
    onLogout: function () {
        var values = {},
            self = this;
        Ext.Ajax.request({
            method: 'GET',
            url: ' /directapi/logout',
            params: Ext.JSON.encode(values),// How to encode multiple name values here?
            success: function (response) {
                var resp = Ext.decode(response.responseText),
                    msg = Ext.String.format("Пользователь {0} вышел", resp.username);
                self.getView().destroy();
                Ext.widget('login');
                Ext.toast({
                    title: 'Logout',
                    html: msg,
                    align: 't',
                    bodyPadding: 10
                });
                //Ext.ccenter.msg(Ext.String.format("Пользователь {0} вышел", resp.username), null);
            },
            failure: function (response) {
                //Ext.widget('login');
            }
        });
    },

    onCreateRecord: function () {
        var grid = this.lookupReference('kon_grid'),
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

    onCancelEdit: function(rowEditing, context) {
        var grid = this.lookupReference('kon_grid'),
            store = grid.getBind().store.getValue();
        if (context.record.phantom) {
            store.remove(context.record);
        }
    },

    onSelection: function(view, records){
        var grid = this.lookupReference('kon_grid');
        grid.down('#removeKontrag').setDisabled(!records.length);
    }
});
