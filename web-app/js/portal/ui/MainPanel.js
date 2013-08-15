/*
 * Copyright 2012 IMOS
 *
 * The AODN/IMOS Portal is distributed under the terms of the GNU General Public License
 *
 */

Ext.namespace('Portal.ui');

// Tab indexes (global)
TAB_INDEX_HOME = 0;
TAB_INDEX_MAP = 1;
TAB_INDEX_SEARCH = 2;
TAB_INDEX_DOWNLOAD_CART = 3;

Portal.ui.MainPanel = Ext.extend(Ext.Panel, {

    constructor:function (cfg) {

        Ext.apply(this, cfg);

        this.portalPanel = new Portal.ui.PortalPanel({appConfig:Portal.app.config});
        this.searchTabPanel = this._initSearchTabPanel(cfg);
        this.homePanel = new Portal.ui.HomePanel({appConfig:Portal.app.config});

        // TODO: uneccessary nesting (but deliberate), see https://github.com/aodn/aodn-portal/issues/315
        this.downloadCartPanel = new Ext.Panel({
            layout: 'fit',
            items: [new Portal.cart.DownloadPanel()]
        });

        var config = Ext.apply({
            autoDestroy:false, // wont destroy tab contents when switching
            activeItem: TAB_INDEX_HOME,
            margins: {
                left: 5,
                right: 5
            },
            unstyled:true,
            layout: 'card',
            items:[
                this.homePanel,
                this.portalPanel,
                this.searchTabPanel,
                this.downloadCartPanel
            ]
        }, cfg);

        Portal.ui.MainPanel.superclass.constructor.call(this, config);

        Ext.MsgBus.subscribe('selectedLayerChanged', this.onSelectedLayerChange, this);
    },

    _initSearchTabPanel: function(cfg) {

        if (this.appConfigStore.isFacetedSearchEnabled()) {
            return new Portal.ui.search.SearchPanel({
                itemId: 'searchPanel',
                proxyUrl: proxyURL,
		        catalogUrl: Portal.app.config.catalogUrl,
                spatialSearchUrl: this.appConfigStore.getById('spatialsearch.url').data.value,
		        protocols: Portal.app.config.metadataLayerProtocols.split("\n").join(' or '),
		        dragAndDrop: cfg.dragAndDrop,
                resultGridSize: 10
		    });
        }
        else {
            return new Portal.search.SearchTabPanel({mapPanel:this.getMapPanel()});
        }
    },

    getPortalPanel:function () {
        return this.portalPanel;
    },

    getMapPanel:function () {
        return this.portalPanel.getMapPanel();
    },

    homePanelActive:function () {
        return this.getActiveTab() === this.homePanel;
    },

    showPortalPanel:function () {
        this.setActiveTab(TAB_INDEX_MAP);
    },

    getActiveTab: function() {
        return this.layout.activeItem;
    },

    setActiveTab:function (item) {

        this.layout.setActiveItem(item);

        // Portal.ui.MainPanel.superclass.setActiveTab.call(this, item);

        //
        // Nasty hack for #27 - without this, the details panel on the right has no content
        // and it partially obscures the MapPanel.
        //
        // It's probably worth having a look at how the RightDetailsPanel/DetailsPanel/DetailsTabPanel
        // etc etc etc interact in terms of layout when selected layer changes - and perhaps this forced
        // layout can be removed.
        //
        this.doLayout(false, true /* force update */);

        if (!this.isMapVisible()) {
            this.portalPanel.getMapPanel()._closeFeatureInfoPopup();
        }

        // Ensure tab selectors reflect actual tab selected
        var tabIndex = this.items.indexOf(this.getActiveTab());

        //TODO: componentise this
        jQuery('[id^=viewPortTab]').removeClass('viewPortTabActive');
        jQuery('#viewPortTab' + tabIndex).addClass('viewPortTabActive');
    },

    isMapVisible:function () {
        return this.isMapSelected();
    },

    isMapSelected:function () {
        return this.getActiveTab() === this.portalPanel;
    },

    onSelectedLayerChange:function () {
        if (this.homePanelActive()) {
            this.showPortalPanel();
        }
    }
});
