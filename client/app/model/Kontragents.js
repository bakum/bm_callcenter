Ext.define('client.model.Kontragents', {
    extend: 'client.model.Base',
    
    fields: [
        { name: 'id', type: 'int',useNull:false },
        { name: 'fullname', type: 'string',useNull:false },
        { name: 'deleted', type: 'bool',defaultValue:0,useNull:false },
        { name: 'inn', type: 'string' },
        { name: 'okpo', type: 'string' },
        { name: 'kpp', type: 'string' },
        { name: 'namefull', type: 'string' },
        { name: 'ur_fiz', type: 'bool',defaultValue:0,useNull:false },
        { name: 'USERId', reference: 'User' },
        { name: 'adress', type: 'string'}

    ],
    proxy: {
        type: 'ajax',
        api: {
            read: 'directapi/kontragents/get',
            update: 'directapi/kontragents/update'
        },
        reader: {
            type: 'json'
        }
    }
});
