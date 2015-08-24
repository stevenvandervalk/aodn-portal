import org.openqa.selenium.firefox.FirefoxDriver
import org.openqa.selenium.firefox.FirefoxProfile
import org.openqa.selenium.Dimension


driver = {
    def fxProfile = new FirefoxProfile();

    fxProfile.setPreference('browser.download.folderList', 2);
    fxProfile.setPreference('browser.download.manager.showWhenStarting', false);
    fxProfile.setPreference('browser.download.dir', '/tmp')
    fxProfile.setPreference('browser.helperApps.neverAsk.saveToDisk', 'text/csv');

    def driverInstance = new FirefoxDriver(fxProfile)
    driverInstance.manage().window().size = new Dimension(1280, 960)
    driverInstance
}
