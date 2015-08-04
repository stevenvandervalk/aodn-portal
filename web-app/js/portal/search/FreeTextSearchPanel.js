

Ext.namespace('Portal.search');

Portal.search.FreeTextSearchPanel = Ext.extend(Ext.Panel, {

    constructor: function(cfg) {
        cfg = cfg || {};

        if (cfg.title) {
            cfg.title = '<span class="filter-selection-panel-header">' + cfg.title + '</span>';
        }

        var defaults = {
            collapsible: true,
            collapsed: false,
            titleCollapse: true
        };

        var config = Ext.apply({
            layout: 'form',
            cls: 'search-filter-panel filter-selection-panel',
            align: 'stretch',
            items: [{
                xtype: 'container',
                layout: 'hbox',
                align: 'middle',
                cls: 'free-text-search',
                items: [
                    this.searchField = new Ext.form.TextField({
                        flex: 1,
                        enableKeyEvents: true
                    }),
                    { xtype: 'spacer', width: 10 },
                    this.goButton = new Ext.Button({
                        text: OpenLayers.i18n("goButton")
                    }),
                    { xtype: 'spacer', width: 10 },
                    this.clearButton = new Ext.Button({
                        text: OpenLayers.i18n("clearButton")
                    })
                ]
            }]
        }, cfg, defaults);

        Portal.search.FreeTextSearchPanel.superclass.constructor.call(this, config);

        this.mon(this.goButton, 'click', this.onGo, this);
        this.mon(this.clearButton, 'click', this.clearSearch, this);
        this.mon(this.searchField, 'keyup', this.onSearchChange, this);
    },

    initComponent: function() {
        Portal.search.FreeTextSearchPanel.superclass.initComponent.apply(this, arguments);
    },

    onGo: function() {
        this.searcher.removeFilters('any');
        this.searcher.addFilter('any', this.searchField.getRawValue());
        this.searcher.search();
    },

    clearSearch: function() {
        this.searchField.setRawValue('');
        this.onGo();
    },

    onSearchChange: function(_field, event) {
        if (event.getKey() === event.ENTER) {
            this.onGo();
        }
    },

    removeAnyFilters: function() {
        this.collapse();
    }
});
