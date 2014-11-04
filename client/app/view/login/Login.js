Ext.define("client.view.login.Login",{
    extend: 'Ext.window.Window',
    xtype: 'login',

    requires: [
        'client.view.login.LoginController',
        'Ext.form.Panel'
    ],

    controller: 'login',
    bodyPadding: 10,
    title: 'Авторизация',
    closable: false,
    autoShow: true,

    items: {
        xtype: 'form',
        itemId: 'loginform',
        reference: 'form',
        items: [{
            xtype: 'textfield',
            name: 'username',
            itemId: 'username',
            fieldLabel: 'Логин',
            emptyText: 'username',
            enableKeyEvents:true,
            allowBlank: false,
            listeners:{
                specialKey: function(field, el)
                {
                    if(el.getKey() == Ext.EventObject.ENTER)
                    {
                        Ext.getCmp('login-button').fireEvent('click');
                    }
                }
            }
        }, {
            xtype: 'textfield',
            name: 'password',
            itemId: 'password',
            inputType: 'password',
            fieldLabel: 'Пароль',
            emptyText: 'password',
            enableKeyEvents:true,
            allowBlank: false,
            listeners:{
                specialKey: function(field, el)
                {
                    //console.log(field);
                    if(el.getKey() == Ext.EventObject.ENTER)
                    {
                        Ext.getCmp('login-button').fireEvent('click');
                    }
                }
            }
        }, {
            xtype: 'displayfield',
            hideEmptyLabel: false,
            value: 'Введите имя пользователя и пароль'
        }],
        buttons: [{
            text: 'Login',
            itemId: 'login-button',
            formBind: true,
            listeners: {
                click: 'onLoginClick'
            }
        }]
    }
});