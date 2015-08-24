import org.openqa.selenium.firefox.FirefoxDriver
import org.openqa.selenium.Dimension

driver = {
    def driverInstance = new FirefoxDriver()
    // driverInstance.manage().window().maximize()
    driverInstance.manage().window().size = new Dimension(1280, 960)
    driverInstance
}
