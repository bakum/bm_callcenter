Ext.define('client.FileFieldAttributes', {
    override: 'Ext.form.field.File',

    /**
     * @cfg {Object} fileInputAttributes
     * Extra attributes to add to the file input element.
     */

    onRender: function() {
        var me = this,
            attr = me.fileInputAttributes,
            fileInputEl, name;

        me.callParent();
        fileInputEl = me.getTrigger('filebutton').component.fileInputEl.dom;
        for (name in attr) {
            fileInputEl.setAttribute(name, attr[name]);
        }
    }
});