/*
 * Copyright 2012 IMOS
 *
 * The AODN/IMOS Portal is distributed under the terms of the GNU General Public License
 *
 */

Ext.namespace('Portal.ui');

Portal.ui.MapPanel = Ext.extend(Portal.common.MapPanel, {
    loadSpinner: null,

    defaultSpatialConstraintType: OpenLayers.i18n('comboBoxTypeLabels')[0].value,

    constructor: function(cfg) {

        this.appConfig = Portal.app.appConfig;
        var portalConfig = this.appConfig.portal;

        var config = Ext.apply({
            stateful: false,
            forceLayout: true,   // Makes the map appear (almost) instantly when user clicks the 'map' button.
            split: true,
            header: false,
            initialBbox: portalConfig.initialBbox,
            hideLayerOptions: this.appConfig.hideLayerOptions
        }, cfg);

        Portal.ui.MapPanel.superclass.constructor.call(this, config);

        this.initMap();

        this.on('afterlayout', function() {
            jQuery("div.olControlMousePosition,div.olControlScaleLine *").mouseover(function() {
                jQuery("div.olControlMousePosition,div.olControlScaleLine *").addClass('allwhite');
            });
            jQuery("div.olControlMousePosition,div.olControlScaleLine *").mouseout(function() {
                jQuery("div.olControlMousePosition,div.olControlScaleLine *").removeClass('allwhite');
            });
        }, this);

        Ext.MsgBus.subscribe(PORTAL_EVENTS.BASE_LAYER_CHANGED, function(subject, message) {
            this.onBaseLayerChanged(message);
        }, this);

        Ext.MsgBus.subscribe(PORTAL_EVENTS.RESET, function() {
            this.reset();
            this._closeFeatureInfoPopup();
        }, this);
    },

    onBaseLayerChanged: function(openLayer) {
        this.map.setBaseLayer(openLayer);
    },

    afterRender: function() {
        Portal.ui.MapPanel.superclass.afterRender.call(this);
        this.mapOptions.afterRender(this);
    },

    reset: function() {
        this._closeFeatureInfoPopup();
        this.map.resetSpatialConstraint();
        this.zoomToInitialBbox();
    },

    handleFeatureInfoClick: function(event) {
        this._closeFeatureInfoPopup();
        this._findFeatureInfo(event);
    },

    _closeFeatureInfoPopup: function() {
        if (this.featureInfoPopup) {
            this.featureInfoPopup.close();
        }
    },

    _findFeatureInfo: function(event) {
        this.featureInfoPopup = new Portal.ui.FeatureInfoPopup({
            map: this.map,
            appConfig: this.appConfig,
            maximisedPosition: { x: this.getPanelX(), y: this.getPanelY() }
        });
        this.featureInfoPopup.findFeatures(event);
    },

    renderMap: function() {
        if (this.layers.getBaseLayers().getCount() > 0) {
            Portal.common.MapPanel.superclass.renderMap.call(this);
        }
        else {
            var mapPanel = this;
            Ext.MsgBus.subscribe(PORTAL_EVENTS.BASE_LAYER_LOADED_FROM_SERVER, function() {
                Ext.MsgBus.unsubscribe(PORTAL_EVENTS.BASE_LAYER_LOADED_FROM_SERVER);
                Portal.common.MapPanel.superclass.renderMap.call(mapPanel);
            });
        }
    },

    initMap: function() {

        // The MapActionsControl (in the OpenLayers map tools) needs this.
        this.appConfig.mapPanel = this;

        this.mapOptions = new Portal.ui.openlayers.MapOptions(this.appConfig, this);
        this.map = this.mapOptions.newMap();
        this.map.setDefaultSpatialConstraintType(this.defaultSpatialConstraintType);
    },

    getPanelX: function() {
        return this.getPosition()[0];
    },

    getPanelY: function() {
        return this.getPosition()[1];
    },

    beforeParentHide: function() {

        this._closeFeatureInfoPopup();
    }
});
