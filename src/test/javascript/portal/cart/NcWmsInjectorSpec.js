/*
 * Copyright 2013 IMOS
 *
 * The AODN/IMOS Portal is distributed under the terms of the GNU General Public License
 *
 */

describe('Portal.cart.NcWmsInjector', function() {

    var injector;
    var dataCollection;
    var startDate;
    var endDate;

    var dateLabel = OpenLayers.i18n('temporalExtentHeading');

    beforeEach(function() {
        injector = new Portal.cart.NcWmsInjector();
        startDate = moment.utc(Date.UTC(2013, 10, 20, 0, 30, 0, 0)); // NB.Months are zero indexed
        endDate = moment.utc(Date.UTC(2014, 11, 21, 22, 30, 30, 500));
        dataCollection = {
            uuid: 9,
            getFilters: returns([
                {
                    isNcwmsParams: true,
                    dateRangeStart: startDate,
                    dateRangeEnd: endDate,
                    latitudeRangeStart: '-10',
                    latitudeRangeEnd: '40',
                    longitudeRangeEnd: '180',
                    longitudeRangeStart: '150'
                },
                {
                    type: Portal.filter.DateFilter,
                    comment: 'Should be safely ignored for URL building'
                }
            ])
        };
    });

    describe('getDataFilterEntry', function() {

        it('still returns date range stuff with no bbox', function() {
            expect(injector._getDataFilterEntry(dataCollection)).not.toEqual(String.format("<i>{0}<i>", OpenLayers.i18n("noFilterLabel")));
        });

        it('returns a default message when no defined date', function() {
            dataCollection.getFilters = returns([{
                isNcwmsParams: true,
                dateRangeStart: null
            }]);

            expect(injector._getDataFilterEntry(dataCollection)).toEqual(OpenLayers.i18n("emptyDownloadPlaceholder"));
        });

        it('indicates bounds properly created', function() {

            var entry = injector._getDataFilterEntry(dataCollection);
            expect(entry).toContain(OpenLayers.i18n("spatialExtentHeading"));
        });

        it('indicates temporal range', function() {

            dataCollection.getFilters = returns([{
                isNcwmsParams: true,
                dateRangeStart: moment.utc(Date.UTC(2013, 10, 20, 0, 30, 0, 0)),
                dateRangeEnd: moment.utc(Date.UTC(2014, 11, 21, 10, 30, 30, 500))
            }]);

            var entry = injector._getDataFilterEntry(dataCollection);
            expect(entry).toContain(dateLabel);

            entry = injector._formatHumanDateInfo('temporalExtentHeading', 'startdate', 'enddate');
            expect(entry).toContain(dateLabel);
            expect(entry).toContain('startdate');
            expect(entry).toContain('enddate');
        });
    });
});
