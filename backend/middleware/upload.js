const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

module.exports = upload ;


//The callback cb is called with two arguments: null (for error handling) and the destination folder (uploads).

// filename: Determines the filename under which the file will be saved.
// A uniqueSuffix is created using the current timestamp (Date.now()) and a random number (Math.random()).
// The filename will be of the form: fieldname-uniqueSuffix. For example, if the uploaded file's field name is avatar, the saved file could be named avatar-1633019173480-123456789.