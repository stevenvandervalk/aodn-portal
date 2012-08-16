Ext.namespace('Portal.common');

/* Code common to main map and minimap */

Portal.common.LayerOpacitySliderFixed = Ext.extend(GeoExt.LayerOpacitySlider, {
    //WARNING, inverse doesn't won't work with this class.
	    /** private: method[getOpacityValue]
     *  :param layer: ``OpenLayers.Layer`` or :class:`GeoExt.data.LayerRecord`
     *  :return:  ``Integer`` The opacity for the layer.
     *
     *  Returns the opacity value for the layer.
     *  
     * No longer messes up when min and max are different.
     */
    getOpacityValue: function(layer) {
        var value;
        if (layer && layer.opacity !== null) {
            value = parseInt(layer.opacity * 100);
            if(value < this.minValue)
            {
            	value = this.minValue;
            }
        } else {
            value = this.maxValue;
        }
        return value;
    },
    
        /** private: method[changeLayerOpacity]
     *  :param slider: :class:`GeoExt.LayerOpacitySlider`
     *  :param value: ``Number`` The slider value
     *
     *  Updates the ``OpenLayers.Layer`` opacity value.
     */
    changeLayerOpacity: function(slider, value) {
        if (this.layer) {
            value = value / 100;
            this._settingOpacity = true;
            this.layer.setOpacity(value);
            delete this._settingOpacity;
        }
    }
});
