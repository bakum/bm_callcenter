Ext.define('client.model.User', {
    extend: 'client.model.Base',
    
    fields: [
        { name: 'id', type: 'int',useNull:false },
        { name: 'fullname', type:'string' },
        { name: 'real_name', type:'string' },
        { name: 'u_name', type:'string',useNull:false },
        { name: 'is_admin', type: 'bool',defaultValue:0,useNull:false },
        { name: 'u_password', type:'string',useNull:false },
        { name: 'email', type:'string' }

    ]
});
