package pages

import geb.Page

class SearchPage extends Page {
    static url = "home"

    static at = {
        $('#viewPortTab0').hasClass('viewPortTabActiveLast')
    }

    static content = {
        searchBodyPanel { $('#searchBodypanel') }
        searchResultRows { searchBodyPanel.find('.resultsHeaderBackground') }
        selectButton { n ->
            searchResultRows[n].find('button')
        }
    }

    void selectNthCollection(n) {
        selectButton(n).click()
    }
}
