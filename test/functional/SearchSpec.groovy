import geb.spock.GebReportingSpec

import spock.lang.*

import pages.*

class SearchSpec extends GebReportingSpec {
    def "default search results"() {
        when:
        to SearchPage

        then:
        searchResultRows.size() == 10
    }

    def "goes to step 2 on select collection"() {
        given:
        to SearchPage

        when:
        selectCollectionWithUuid('4402cb50-e20a-44ee-93e6-4728259250d2')
        page SubsetPage

        then:
        verifyAt()
    }
}
