Ext.define('client.model.Contacts', {
    extend: 'client.model.Base',

    fields: [
        { name: 'id', type: 'int',useNull:false },
        { name: 'adress', type: 'string',useNull:true },
        { name: 'phone', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'KONTRAGENTId', reference: 'Kontragents' }

    ]
});
