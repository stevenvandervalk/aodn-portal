package pages

import geb.Page

class DownloadPage extends Page {
    static url = "home"

    static at = {
        $('#viewPortTab2').hasClass('viewPortTabActiveLast')
    }

    static content = {
        downloadAsMenu { uuid ->
            $("#download-button-${uuid}").find('button')
        }

        downloadAsLink { uuid, format ->
            $("#downloadMenuItem-${uuid}-${format.replaceAll(' ', '_')}")
        }

        confirmationButton {
            $('button', text: 'I understand, download')
        }
    }

    def downloadUuidAs(uuid, format) {
        downloadAsMenu(uuid).click()

        def href = downloadAsLink(uuid, format).@href.replaceAll('#', '')
        downloadStream(downloadAsLink(uuid, format).@href)
    }
}
