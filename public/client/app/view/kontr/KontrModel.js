Ext.define('client.view.kontr.KontrModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.kontr',

    data: {
        name: 'client'
    },
    stores: {
        kontragents: {
            model: 'Kontragents',
            autoLoad: true,
            autoSync: false,
            autoDestroy: true,
            pageSize: 15,
            sorters: [{
                property: 'fullname',
                direction: 'ASC'
            }],
            proxy: {
                type: 'rest',
                url: '/directapi/kontragents',
                appendId: true,
                reader: {
                    type: 'json',
                    rootProperty: 'setlist',
                    totalProperty: 'totalCount'
                },

                writer: {
                    type: 'json',
                    encode: false
                }
            },
            listeners: {
                write: function (store, operation) {
                    var record = operation.getRecords()[0],
                        name = Ext.String.capitalize(operation.action),
                        verb;


                    if (name == 'Destroy') {
                        //record = operation.records[0];
                        verb = 'Удалена';
                    } else if (name == 'Create') {
                        store.reload();
                        verb = 'Добавлена';
                        //record = operation.records[0];

                    } else {
                        verb = 'Отредактирована';
                    };
                    var msg = Ext.String.format("{0} запись: {1}", verb, record.getId());
                    Ext.toast({
                        title: name,
                        html: msg,
                        align: 't',
                        bodyPadding: 10
                    });

                }
            }
        }
    }
})
