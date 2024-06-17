const http = require("http");
const fs = require("fs");
const path = require("path");
const express = require("express");
const server = express();
const db = require("./data/db"); 
const cors = require("cors");

// Doit être défini au début de l'application
const dotenv = require("dotenv");

/**
 * Gestion static ou dynamique dans un server
 */
dotenv.config();
server.use(cors()); // Ajouter IP ou domaine, sinon bar open à toutes demandes

/**
 * req.body pour récupérer le body du fetch..? à suivre
 */
server.use(express.json()); // Permet d'envoyer des json dans le body
server.use(express.urlencoded({extended:true})); // Permet de récupérer des formulaire html qui contiennent des fichiers

/**
 * On informe le server de l'endroit où se trouve nos fichiers
 * Cherchera là-dedans avant de chercher plus loin ici
 * La route "/", n'a donc pas besoin d'être ici
 */
server.use(express.static(path.join(__dirname, "public")));

/**  --- __DÉBUT DES ROUTES__ --- */

// 1. BD en place (.env) 2.Table vehicule -> voir /routes/vehicule
const recettesRoutes = require("./routes/vehicule");
server.use("/api/vehicule", recettesRoutes);



// Middleware -> Message d'erreur en cas... d'erreur
server.use((req, res) => {
  res.statusMessage = "Ressource non trouvée";
  res.status(404).json("Ressource non trouvée");
});

/**
 * npm run dev
 * Start server grâce au script ("dev": "nodemon server.js") /package.json
 * Doit être défini à la fin de l'application
 */
server.listen(process.env.PORT, () => {
  console.log("Vous êtes connecté au port" + process.env.PORT);
});



module.exports = server;
