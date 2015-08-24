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
        selectNthCollection(1)
        page SubsetPage

        then:
        verifyAt()
    }
}
