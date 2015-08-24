package pages

import geb.Page

class SubsetPage extends Page {
    static url = "home"

    static at = {
        $('#viewPortTab1').hasClass('viewPortTabActiveLast')
    }

    static content = {
        downloadStepLink { $('#viewPortTab2').find('a')}
        spatialSubsetBoundingLineTextField { name ->
            $("input[name=${name}]")

        }
    }

    void applySpatialSubset(bounds) {
        [ 'northBL', 'southBL', 'eastBL', 'westBL' ].each { boundLine ->
            spatialSubsetBoundingLineTextField(boundLine) << String.valueOf(bounds[boundLine])
        }
    }

    void navigateToDownloadStep() {
        downloadStepLink.click()
    }
}
