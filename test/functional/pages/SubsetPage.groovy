package pages

import geb.Page

class SubsetPage extends Page {
    static url = "home"

    static at = {
        $('#viewPortTab1').hasClass('viewPortTabActiveLast')
    }
}
