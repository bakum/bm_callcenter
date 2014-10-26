Ext.define('client.model.Divisions', {
    extend: 'client.model.Base',

    fields: [
        { name: 'id', type: 'int',useNull:false },
        { name: 'fullname', type: 'string',useNull:false },
        { name: 'deleted', type: 'bool',defaultValue:0,useNull:false },
        { name: 'is_group', type: 'bool',defaultValue:0,useNull:false },
        { name: 'DIVISIONId', reference: 'Divisions' },
        { name: 'USERId', reference: 'User' }

    ]
});
