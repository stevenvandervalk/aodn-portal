describe("Portal.filter.Filter", function() {

    describe('classFor', function() {

        it('returns expected types for simple examples (not exhaustive)', function() {

            checkClassFor('integer', Portal.filter.NumberFilter);
            checkClassFor('string', Portal.filter.StringFilter);
            checkClassFor('geometrypropertytype', Portal.filter.GeometryFilter);
            checkClassFor('boolean', Portal.filter.BooleanFilter);
            checkClassFor('date', Portal.filter.DateFilter);
            checkClassFor('unknown', null);
        });

        var checkClassFor = function(filterType, expectedResult) {

            var filterConfig = {
                type: filterType
            };

            expect(Portal.filter.Filter.classFor(filterConfig)).toEqual(expectedResult);
        }
    });
});
