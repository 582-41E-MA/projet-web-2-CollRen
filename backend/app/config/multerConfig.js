const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Fonction pour s'assurer que le répertoire existe
const ensureDirectoryExistence = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Répertoire de téléchargement
const uploadDirectory = path.join(__dirname, '../../../frontend/public/imgs');
ensureDirectoryExistence(uploadDirectory);

// Configuration du stockage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

// Filtre de fichiers pour garantir que seuls les images soient acceptées
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|webp|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
        return cb(null, true);
    }
    cb(new Error('Erreur : Seuls les fichiers .jpeg, .jpg, .png sont autorisés !'));
};

// Configuration du téléchargement
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 50000000 } 
});

console.log("upload config", upload);
module.exports = upload;