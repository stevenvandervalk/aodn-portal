

package au.org.emii.portal

class UniqueFilenameGenerator {

    def usedFilenames = [:]

    def generateUniqueFilename(filename, extension = "") {

        def currentCount = usedFilenames[filename]

        // First usage of this filename
        if (!currentCount) {
            usedFilenames[filename] = 1

            return filename + extension
        }

        // Subsequent usage of this filename
        currentCount++
        usedFilenames[filename] = currentCount

        return "$filename($currentCount)$extension"
    }
}
