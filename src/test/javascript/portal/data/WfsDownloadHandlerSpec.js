/*
 * Copyright 2014 IMOS
 *
 * The AODN/IMOS Portal is distributed under the terms of the GNU General Public License
 *
 */

describe('Portal.cart.WfsDownloadHandler', function () {

    describe('getDownloadOption', function() {

        var downloadOptions;

        describe('when required info is present', function() {

            beforeEach(function() {

                var testResource = {
                    name: 'layer_name',
                    href: 'server_url'
                };
                var handler = new Portal.cart.WfsDownloadHandler(testResource);
                downloadOptions =  handler.getDownloadOptions();
            });

            it('should return one download handler', function() {

                expect(downloadOptions.length).toBe(1);
            });

            it('should return a function which calls other appropriate functions', function() {

                var downloadOption = downloadOptions[0];

                expect(downloadOption.textKey).not.toBeNull();
                expect(downloadOption.textKey).not.toBe('');
                expect(downloadOption.handler).not.toBeNull();
                expect(downloadOption.handlerParams).not.toBeNull();

                var downloadHandler = downloadOption.handler;
                var dummyCollection = {
                    wmsLayer: {
                        getWfsLayerFeatureRequestUrl: jasmine.createSpy('getWfsLayerFeatureRequestUrl')
                    }
                };

                downloadHandler(dummyCollection);

                expect(dummyCollection.wmsLayer.getWfsLayerFeatureRequestUrl).toHaveBeenCalledWith('server_url', 'layer_name', 'csv');
            });
        });

        describe('when required info is missing', function() {

            beforeEach(function() {

                var testResource = {/* empty */};
                var handler = new Portal.cart.WfsDownloadHandler(testResource);
                downloadOptions = handler.getDownloadOptions();
            });

            it('should not return any download options', function() {

                expect(downloadOptions.length).toBe(0);
            });
        });
    });
});