import geb.spock.GebReportingSpec

import spock.lang.*

import pages.*

class SmokeSpec extends GebReportingSpec {

    static def argoUuid = '4402cb50-e20a-44ee-93e6-4728259250d2'

    def "smoke test"() {
        given:
        to SearchPage
        report 'SearchPage'

        when:

        selectCollectionWithUuid(argoUuid)
        at SubsetPage

        applySpatialSubset([
            northBL: -42.36,
            southBL: -44.39,
            eastBL: 136.45,
            westBL: 134.08
        ])
        report 'SubsetPage'

        navigateToDownloadStep()
        at DownloadPage
        report 'DownloadPage'

        def format = 'List of URLs'
        def downloadFileLabel = "${argoUuid}-${format}"
        def listOfUrlsFile = new File(reportGroupDir, downloadFileLabel)

        listOfUrlsFile << downloadUuidAs(argoUuid, format)

        then:
        listOfUrlsFile.readLines().size() > 0
    }
}
