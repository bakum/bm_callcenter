Ext.define('client.view.kontr.DetailModel', {
    extend: 'Ext.app.ViewModel',

    // This enables "viewModel: { type: 'ticketdetail' }" in the view:
    alias: 'viewmodel.kontrdetail',

    stores: {
        contacts: {
            model: 'Contacts',
            storeId:'conrstore',
            autoLoad: true,
            autoSync: false,
            autoDestroy: false,
            pageSize: 10,
            remoteFilter: true,
            filters: [{
                property: 'KONTRAGENTId',
                value: '{theKontragent.id}'
            }],
            proxy: {
                type: 'rest',
                url: '/directapi/contacts',
                //appendId: true,
                reader: {
                    type: 'json',
                    rootProperty: 'setlist',
                    totalProperty: 'totalCount'
                },

                writer: {
                    type: 'json',
                    encode: false
                }
            }
        }
    }
});