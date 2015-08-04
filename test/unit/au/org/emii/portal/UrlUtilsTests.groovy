package au.org.emii.portal

import grails.test.GrailsUnitTestCase

import static au.org.emii.portal.UrlUtils.ensureTrailingSlash
import static au.org.emii.portal.UrlUtils.urlWithQueryString

class UrlUtilsTests extends GrailsUnitTestCase {

    void testEnsureTrailingSlash() {
        assertEquals '/', ensureTrailingSlash('')
        assertEquals 'someUrl/', ensureTrailingSlash('someUrl')
        assertEquals 'someUrl/', ensureTrailingSlash('someUrl/')
        assertEquals 'someUrl/extra/', ensureTrailingSlash('someUrl/extra')
    }

    void testUrlWithQueryString() {
        assertEquals 'url?a=b', urlWithQueryString('url', 'a=b')
        assertEquals 'url?a=b&c=d', urlWithQueryString('url?a=b', 'c=d')
    }

    void testUrlWithQueryStringAcceptingMap() {
        assertEquals 'url?', urlWithQueryString('url', [:])
        assertEquals 'url?a=b&c=d', urlWithQueryString('url?a=b', [c: 'd'])
        assertEquals 'url?a=b&c=%24', urlWithQueryString('url?a=b', [c: '$'])
    }

    void testUrlWithEmptyQueryString() {
        assertEquals 'url?a=b&b=c', urlWithQueryString('url?a=b&b=c', '')
    }
}
