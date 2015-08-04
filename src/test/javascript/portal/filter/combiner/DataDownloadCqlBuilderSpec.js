

describe("Portal.filter.combiner.DataDownloadCqlBuilder", function() {

    var layer;
    var builder;

    beforeEach(function() {

        layer = {
            filters: [
                {
                    constructor: Portal.filter.GeometryFilter, // Is Geometry filter
                    isVisualised: returns(true),
                    hasValue: returns(true),
                    getCql: returns('cql1')
                },
                {
                    isVisualised: returns(false), // Not visualised
                    hasValue: returns(true),
                    getCql: returns('cql2')
                },
                {
                    isVisualised: returns(true),
                    hasValue: returns(false), // No value
                    getCql: returns('cql3')
                },
                {
                    isVisualised: returns(true),
                    hasValue: returns(true),
                    getCql: returns('cql4')
                }
            ]
        };

        builder = new Portal.filter.combiner.DataDownloadCqlBuilder({
            layer: layer
        });
    });

    describe('buildCql', function() {

        it('returns correct CQL', function() {

            expect(builder.buildCql()).toBe('cql1 AND cql2 AND cql4');
        });
    });
});
