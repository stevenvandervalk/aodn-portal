package pages

import geb.Page

class SearchPage extends Page {
    static url = "home"

    static at = {
        $('#viewPortTab0').hasClass('viewPortTabActiveLast')
    }

    static content = {
        searchBodyPanel { $('#searchBodypanel') }
        searchResultRows(wait: true) { searchBodyPanel.find('.resultsHeaderBackground') }

        selectButton { uuid ->
            searchResultRows.find("#fsSearchAddBtn-${uuid}").find('button')
        }
    }

    void selectCollectionWithUuid(uuid) {
        selectButton(uuid).click()
    }
}
