Ext.define('client.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',


    onLoginClick: function (btn) {

        // This would be the ideal location to verify the user's credentials via 
        // a server-side lookup. We'll just move forward for the sake of this example.
        var self = this,
            username = btn.up('login').down('#username').getValue(),
            password = btn.up('login').down('#password').getValue(),
            form = btn.up('login').down('#loginform').getForm(),
            values = {
                "username": username,
                "password": password
            };

        Ext.Ajax.request({
            method: 'POST',
            url: ' /directapi/autuser',
            params: values,
            success: function (response) {


                self.getView().destroy();

                // Add the main view to the viewport
                Ext.widget('app-main');
            },
            failure: function (response) {
                form.reset();
                Ext.ccenter.msg("Имя пользователя или пароль неверны!",Ext.String.format("Логин: {0}",username));
            }
        });

        // Set the localStorage value to true
        //localStorage.setItem("clientLoggedIn", true);


    }
});