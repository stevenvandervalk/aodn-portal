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
}
