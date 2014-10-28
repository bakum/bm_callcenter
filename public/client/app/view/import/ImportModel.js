Ext.define('client.view.import.ImportModel', {
    extend: 'Ext.app.ViewModel',

    // This enables "viewModel: { type: 'ticketdetail' }" in the view:
    alias: 'viewmodel.import',

    stores: {
        files:{
            autoLoad: true,
            autoSync: true,
            autoDestroy: true,
            fields: [{name: 'filename'}],
            proxy: {
                type: 'memory'
            }
        }
    }
});