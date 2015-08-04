

package au.org.emii.portal

import au.org.emii.portal.wms.NcwmsServer
import au.org.emii.portal.wms.GeoserverServer
import org.springframework.web.util.HtmlUtils

import grails.converters.JSON

import static au.org.emii.portal.HttpUtils.Status.*

class LayerController {

    def grailsApplication
    def hostVerifier

    def configuredBaselayers = {
        def baseLayerConfig = grailsApplication.config.baselayers

        baseLayerConfig.each {
            it.isBaseLayer = true
            it.queryable = false
        }

        render baseLayerConfig as JSON
    }

    def getMetadataAbstract = {

        def response = "Error processing request"
        def status = HTTP_500_INTERNAL_SERVER_ERROR

        if (params.uuid != null) {
            try {
                def xml = new XmlSlurper().parse(_getMetadataUrl(params.uuid))
                response = HtmlUtils.htmlEscape(xml.identificationInfo.MD_DataIdentification.abstract.CharacterString.text())
                status = HTTP_200_OK
            }
            catch (Exception e) {
                status = HTTP_500_INTERNAL_SERVER_ERROR
            }
        }

        render status: status, text: response
    }

    def _getMetadataUrl(uuid) {
        return grailsApplication.config.geonetwork.url +
            "/srv/eng/xml_iso19139.mcp?styleSheet=xml_iso19139.mcp.xsl&uuid=" + uuid
    }

    def _getServerClass(serverType) {
        if (serverType == 'ncwms') {
            return new NcwmsServer()
        }
        else {
            return new GeoserverServer(grailsApplication.config.filtering.filePath)
        }
    }

    def getStyles = {
        def (server, layer, serverType) = parseParams(params)

        if (hostVerifier.allowedHost(server)) {
            def serverObject = _getServerClass(serverType)

            render serverObject.getStyles(server, layer) as JSON
        }

        else {
            render text: "Host '$params.server' not allowed", status: HTTP_502_BAD_GATEWAY
        }
    }

    def getFilterValues = {
        def (server, layer, serverType, filter) = parseParams(params)

        if (hostVerifier.allowedHost(server)) {
            def serverObject = _getServerClass(serverType)

            render serverObject.getFilterValues(server, layer, filter) as JSON
        }
        else {
            render text: "Host '$params.server' not allowed", status: HTTP_502_BAD_GATEWAY
        }
    }

    def getFilters = {
        def (server, layer, serverType) = parseParams(params)

        if (hostVerifier.allowedHost(server)) {
            def serverObject = _getServerClass(serverType)

            render serverObject.getFilters(server, layer) as JSON
        }
        else {
            render text: "Host '$params.server' not allowed", status: HTTP_502_BAD_GATEWAY
        }
    }

    def parseParams(params) {
        [params.server, params.layer, params.serverType, params.filter]
    }

    def _isXmlContent(contentType) {
        return contentType.find(/(text|application)\/xml/)
    }
}
