/*
 * Copyright 2012 IMOS
 *
 * The AODN/IMOS Portal is distributed under the terms of the GNU General Public License
 *
 */

Ext.namespace('Portal.data');

Portal.data.MetadataRecordStore = Ext.extend(Ext.data.XmlStore, {

    constructor: function() {

        var config = {
            record : 'metadata',
            totalProperty: 'summary/@count',
            fields: Portal.data.MetadataRecord
        };

        Portal.data.MetadataRecordStore.superclass.constructor.call(this, config);
    },

    getByUuid: function(uuid) {
        return this.getAt(
            this.find('uuid', uuid)
        );
    }
});
