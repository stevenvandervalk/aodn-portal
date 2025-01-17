''/*
 * Copyright 2014 IMOS
 *
 * The AODN/IMOS Portal is distributed under the terms of the GNU General Public License
 *
 */

Ext.namespace('Portal.cart');

Portal.cart.PythonDownloadHandler = Ext.extend(Portal.cart.DownloadHandler, {

    getDownloadOptions: function() {
        var downloadOptions = [];

        if (this._hasRequiredInfo()) {

            downloadOptions.push({
                textKey: 'downloadAsPythonSnippetLabel',
                handler: this._getUrlGeneratorFunction(),
                handlerParams: {
                    filenameFormat: "{0}.py",
                    downloadControllerArgs: {
                        action: 'downloadPythonSnippet'
                    }
                }
            });
        }

        return downloadOptions;
    },

    _hasRequiredInfo: function() {
        return this._resourceHrefNotEmpty();
    },

    _getUrlGeneratorFunction: function() {
        var _this = this;

        return function(collection) {
            return OpenLayers.Layer.WMS.getFeatureRequestUrl(
                collection.getFilters(),
                _this._resourceHref(),
                _this._resourceName(),
                OpenLayers.Layer.DOWNLOAD_FORMAT_CSV
            );
        };
    }
});
