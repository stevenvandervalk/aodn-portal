import org.openqa.selenium.Dimension
import org.openqa.selenium.firefox.FirefoxDriver

driver = {
    def driverInstance = new FirefoxDriver()
    driverInstance.manage().window().setSize(new Dimension(1280, 1024))
    driverInstance
}
