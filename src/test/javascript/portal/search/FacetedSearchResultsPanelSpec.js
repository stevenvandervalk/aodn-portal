

describe("Portal.search.FacetedSearchResultsPanel", function() {

    var resultsPanel;
    var searcher;
    var store;
    var testTarget;
    var testLayerLink;

    beforeEach(function() {
        Portal.search.FacetedSearchResultsPanel.prototype._refreshView = function() {}

        searcher = {
            pageSize: 999
        };

        store = new Portal.data.GeoNetworkRecordStore();
        resultsPanel = new Portal.search.FacetedSearchResultsPanel({
            searcher: searcher,
            store: store
        });

        spyOn(Portal.data.ActiveGeoNetworkRecordStore.instance(), 'add');
    });

    describe('paging control' , function() {
        it(' pageSize should match searcher pageSize', function() {
            expect(resultsPanel.pagingBar.pageSize).toEqual(999);
        });
    });

    describe('active geo network record store events', function() {
        it('refreshes view on record added', function() {
            spyOn(resultsPanel, '_refreshView');
            Ext.MsgBus.publish(PORTAL_EVENTS.DATA_COLLECTION_ADDED);
            expect(resultsPanel._refreshView).toHaveBeenCalled();
        });

        it('refreshes view on record removed', function() {
            spyOn(resultsPanel, '_refreshView');
            Ext.MsgBus.publish(PORTAL_EVENTS.DATA_COLLECTION_REMOVED);
            expect(resultsPanel._refreshView).toHaveBeenCalled();
        });
    });
});
