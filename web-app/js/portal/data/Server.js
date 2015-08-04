Ext.namespace('Portal.data');

Portal.data.Server = {
    UNKNOWN: {
        uri: 'BLOCKED',
        type: 'BLOCKED'
    },

    getInfo: function(uri) {
        var serverInfo = this._getConfig(uri);
        serverInfo.getLayerType = this._getLayerType;

        return serverInfo;
    },

    _getConfig: function(uri) {
        var serverInfo;

        Ext.each(Portal.app.appConfig.knownServers, function(server) {
            if (server.uri == uri) {
                serverInfo = server;
                return false;
            }
            else {
                return true;
            }
        });

        if (!serverInfo) {
            serverInfo = this.UNKNOWN;
        }

        return serverInfo;
    },

    _getLayerType: function(serverInfo) {
        if (this.type.toLowerCase() == 'ncwms') {
            return OpenLayers.Layer.NcWMS;
        }

        return OpenLayers.Layer.WMS;
    }
};
