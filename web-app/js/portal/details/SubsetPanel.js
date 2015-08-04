
Ext.namespace('Portal.details');

Portal.details.SubsetPanel = Ext.extend(Ext.Container, {

    constructor: function(cfg) {

        var panelType = cfg.layer.isNcwms() ? Portal.details.NcWmsPanel : Portal.filter.ui.FilterGroupPanel;
        var newPanel = new panelType({
            map: cfg.map,
            layer: cfg.layer
        });

        var config = Ext.apply({
            title: OpenLayers.i18n('subsetPanelTitle'),
            items: [newPanel]
        }, cfg);

        Portal.details.SubsetPanel.superclass.constructor.call(this, config);
    }
});
