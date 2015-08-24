import geb.spock.GebReportingSpec

import spock.lang.*

import pages.*

class SmokeSpec extends GebReportingSpec {
    def "smoke test"() {
        given:
        to SearchPage

        when:
        selectCollectionWithUuid('4402cb50-e20a-44ee-93e6-4728259250d2')
        page SubsetPage
        verifyAt()

        applySpatialSubset([
            northBL: -42.36,
            southBL: -44.39,
            eastBL: 136.45,
            westBL: 134.08
        ])

        navigateToDownloadStep()
        page DownloadPage
        verifyAt()

        def listOfUrlsFile = new File('listOfUrls.txt')
        new FileOutputStream(listOfUrlsFile) <<  downloadUuidAs('4402cb50-e20a-44ee-93e6-4728259250d2', 'List of URLs')

        then:
        listOfUrlsFile.readLines().size() > 0
    }
}
