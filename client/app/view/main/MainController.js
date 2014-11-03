/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('client.view.main.MainController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.main',

    onLogout: function () {
        var values = {},
            self = this;
        Ext.Ajax.request({
            method: 'GET',
            url: ' /directapi/logout',
            params: Ext.JSON.encode(values),// How to encode multiple name values here?
            success: function (response) {
                var resp = Ext.decode(response.responseText),
                    msg = Ext.String.format("Пользователь {0} вышел", resp.username);
                self.getView().destroy();
                Ext.widget('login');
                Ext.toast({
                    title: 'Logout',
                    html: msg,
                    align: 't',
                    bodyPadding: 10
                });
                //Ext.ccenter.msg(Ext.String.format("Пользователь {0} вышел", resp.username), null);
            },
            failure: function (response) {
                //Ext.widget('login');
            }
        });
    },

    createTab: function (record, cfg) {
        var nodeText = record,
            tabPanel = this.lookupReference('main'),
            tabBar = tabPanel.getTabBar(), // получаем тулбар вкладок на панели
            tabIndex;
        // обход по всем вкладкам и сравнение их текста с текстом нажатого узла
        for (var i = 0; i < tabBar.items.length; i++) {
            if (tabBar.items.get(i).getText() === nodeText) {
                tabIndex = i;
            }
        }

        if (Ext.isEmpty(tabIndex)) {
            cfg.closable = true;
            tabPanel.add(cfg);
            tabIndex = tabPanel.items.length - 1;
        }

        tabPanel.setActiveTab(tabIndex);
    },

    onNavDblClick: function (tree, rec, item, index, e, options) {
        var menuItem = rec.data.text;
        if (menuItem === 'Абоненты') {
            this.createTab(menuItem, {
                xtype: 'kontrgrid',
                listeners: {
                    viewkontragent: 'onViewKontragent'
                },
                title: 'Абоненты'
            });
        } else if (menuItem === 'Импорт') {
            this.createTab(menuItem, {
                xtype: 'import',
                title: 'Импорт'
            });
        }

    },

    onViewKontragent: function(view, rec) {
        console.log(rec);
        this.createTab('Абонент - '+rec.data.fullname, {
            xtype: 'kontrdetail',
            viewModel: {
                data: {
                    theKontragent: rec
                }
            }
        });
    }
});
