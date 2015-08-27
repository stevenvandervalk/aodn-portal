import geb.spock.GebReportingSpec

import spock.lang.*

import pages.*

class SmokeSpec extends GebReportingSpec {
    def "smoke test"() {
        given:
        to SearchPage
        report 'SearchPage'

        when:

        selectCollectionWithUuid('4402cb50-e20a-44ee-93e6-4728259250d2')
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

        def listOfUrlsFile = new File(getConfig().getReportsDir(), 'listOfUrls.txt')
        new FileOutputStream(listOfUrlsFile) <<  downloadUuidAs('4402cb50-e20a-44ee-93e6-4728259250d2', 'List of URLs')

        then:
        listOfUrlsFile.readLines().size() > 0
    }
}
