/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('client.Application', {
    extend: 'Ext.app.Application',
    
    name: 'client',

    stores: [

    ],
    views: [
        'client.view.login.Login',
        'client.view.main.Main'
    ],
    
    launch: function () {
        var values = {};
        Ext.Ajax.request({
            method: 'GET',
            url: ' /directapi/loggedin',
            params: Ext.JSON.encode(values),// How to encode multiple name values here?
            success: function (response) {
                Ext.widget('app-main');
            },
            failure: function (response) {
                Ext.widget('login');
            }
        });
    }
});
