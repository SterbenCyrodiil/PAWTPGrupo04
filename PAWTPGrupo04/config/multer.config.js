const path = require('path')
const multer = require('multer')

// Filtro para os ficheiros de resultado do diagnóstico (only .pdf)
const pdfFilter = (_, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const allowedMimes = [
        'application/pdf'
    ];

    if(fileExt === '.pdf' && allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only PDF files are allowed!'));
    }
}

// Configuração MULTER STORAGE
const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './files/temp')
	},
	filename: function (req, file, cb) {
		req.uploadedFile = `${ file.originalname }`
		cb(null, `${ file.fieldname }-${ Date.now() }-temp`)
    }
})

// Configuração MULTER
const upload = multer({ 
    storage: storage,
    fileFilter: pdfFilter
})

module.exports = upload