-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : mer. 17 juil. 2024 à 18:27
-- Version du serveur : 5.7.39
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `vehiculeoccasion`
--

-- --------------------------------------------------------

--
-- Structure de la table `carburants`
--

CREATE TABLE `carburants` (
  `id` int(11) NOT NULL,
  `type` longtext,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `carburants`
--

INSERT INTO `carburants` (`id`, `type`, `createdAt`, `updatedAt`) VALUES
(1, '{ \"en\": \"Gasoline\", \"fr\": \"Essence\" }', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(2, '{ \"en\": \"Diesel\", \"fr\": \"Diesel\" }', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(3, '{ \"en\": \"Electric\", \"fr\": \"Électrique\" }', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(4, '{ \"en\": \"Hybrid\", \"fr\": \"Hybride\" }', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(5, '{ \"en\": \"Plug-in Hybrid\", \"fr\": \"Hybride rechargeable\" }', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(6, '{ \"en\": \"Hydrogen Fuel Cell\", \"fr\": \"Pile à combustible hydrogène\" }', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(7, '{ \"en\": \"Ethanol\", \"fr\": \"Éthanol\" }', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(8, '{ \"en\": \"LPG\", \"fr\": \"GPL (Gaz de Pétrole Liquéfié)\" }', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(9, '{ \"en\": \"CNG\", \"fr\": \"GNC (Gaz Naturel Comprimé)\" }', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(11, '{\"en\":\"a\",\"fr\":\"a\"}', '2024-07-16 16:25:03', '2024-07-16 16:25:03'),
(12, '{\"en\":\"b\",\"fr\":\"b\"}', '2024-07-16 16:28:46', '2024-07-16 16:28:46'),
(13, '{\"en\":\"\",\"fr\":\"\"}', '2024-07-16 16:29:36', '2024-07-16 16:29:36'),
(14, '{\"en\":\"\",\"fr\":\"\"}', '2024-07-16 16:29:52', '2024-07-16 16:29:52');

-- --------------------------------------------------------

--
-- Structure de la table `commandes`
--

CREATE TABLE `commandes` (
  `id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `prix` double DEFAULT NULL,
  `mode_paiement_id` int(11) DEFAULT NULL,
  `expedition_id` int(11) DEFAULT NULL,
  `utilisateur_id` int(11) DEFAULT NULL,
  `statut_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `commandes`
--

INSERT INTO `commandes` (`id`, `date`, `prix`, `mode_paiement_id`, `expedition_id`, `utilisateur_id`, `statut_id`, `createdAt`, `updatedAt`) VALUES
(1, '2024-07-16', 1111, 2, 1, 26, 1, '2024-07-16 17:03:41', '2024-07-16 17:03:41');

-- --------------------------------------------------------

--
-- Structure de la table `commande_has_taxes`
--

CREATE TABLE `commande_has_taxes` (
  `id` int(11) NOT NULL,
  `taux` double DEFAULT NULL,
  `taxe_id` int(11) NOT NULL,
  `commande_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `constructeurs`
--

CREATE TABLE `constructeurs` (
  `id` int(11) NOT NULL,
  `type` longtext,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `constructeurs`
--

INSERT INTO `constructeurs` (`id`, `type`, `createdAt`, `updatedAt`) VALUES
(1, 'Ford', '2024-07-01 14:11:44', '2024-07-05 12:23:32'),
(2, 'Volkswagen', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(3, 'Chevrolet', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(4, 'BMW', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(5, 'Kia', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(6, 'Tesla', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(7, 'Honda', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(8, 'Audi', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(9, 'Nissan', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(11, 'Porshe', '2024-07-03 19:05:56', '2024-07-03 19:06:28'),
(12, 'Hyundai', '2024-07-03 19:08:10', '2024-07-03 19:08:10');

-- --------------------------------------------------------

--
-- Structure de la table `corps`
--

CREATE TABLE `corps` (
  `id` int(11) NOT NULL,
  `type` longtext,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `corps`
--

INSERT INTO `corps` (`id`, `type`, `createdAt`, `updatedAt`) VALUES
(1, '{\"en\":\"Convertible\",\"fr\":\"Décapotable\"}', '2024-07-01 14:11:44', '2024-07-03 20:21:45'),
(2, '{\"en\":\"Coupe\",\"fr\":\"Coupé\"}', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(3, '{\"en\":\"Sedan\",\"fr\":\"Berline\"}', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(4, '{\"en\":\"Hatchback\",\"fr\":\"À hayon\"}', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(5, '{ \"en\": \"SUV (Sport Utility Vehicle)\", \"fr\": \"Véhicule utilitaire sportif (VUS)\"}', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(6, '{\"en\":\"Station wagon\",\"fr\":\"Break\"}', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(7, '{\"en\":\"Minivan\",\"fr\":\"Monospace\"}', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(8, '{\"en\":\"Pickup Truck\",\"fr\":\"Camionnette\"}', '2024-07-01 14:11:44', '2024-07-01 14:11:44');

-- --------------------------------------------------------

--
-- Structure de la table `expeditions`
--

CREATE TABLE `expeditions` (
  `id` int(11) NOT NULL,
  `type` longtext,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `expeditions`
--

INSERT INTO `expeditions` (`id`, `type`, `createdAt`, `updatedAt`) VALUES
(1, '{ \"en\": \"In Store\", \"fr\": \"En magasin\" }', '2024-07-16 17:01:55', '2024-07-16 17:01:55');

-- --------------------------------------------------------

--
-- Structure de la table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `est_principale` tinyint(4) DEFAULT NULL,
  `chemin` text NOT NULL,
  `voiture_id` int(11) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `images`
--

INSERT INTO `images` (`id`, `est_principale`, `chemin`, `voiture_id`, `createdAt`, `updatedAt`) VALUES
(68, 1, 'voiture_imgs-1720547194096-126474194.jpg', 44, '2024-07-09 17:46:34', '2024-07-09 17:59:09'),
(69, 0, 'voiture_imgs-1720547194098-447578084.jpg', 44, '2024-07-09 17:46:34', '2024-07-09 17:59:09'),
(70, NULL, 'voiture_imgs-1720548212794-79706818.jpg', 44, '2024-07-09 18:03:32', '2024-07-09 18:03:32'),
(71, NULL, 'voiture_imgs-1720548312210-315866529.png', 44, '2024-07-09 18:05:12', '2024-07-09 18:05:12'),
(72, 1, 'voiture_imgs-1720552693965-948279409.jpeg', 45, '2024-07-09 19:18:13', '2024-07-09 19:18:45'),
(73, 0, 'voiture_imgs-1720552693967-343186374.jpeg', 45, '2024-07-09 19:18:13', '2024-07-09 19:18:45');

-- --------------------------------------------------------

--
-- Structure de la table `journals`
--

CREATE TABLE `journals` (
  `id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `adresse_ip` int(11) DEFAULT NULL,
  `utilisateur_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `modeles`
--

CREATE TABLE `modeles` (
  `id` int(11) NOT NULL,
  `type` text,
  `constructeur_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `modeles`
--

INSERT INTO `modeles` (`id`, `type`, `constructeur_id`, `createdAt`, `updatedAt`) VALUES
(1, 'Mustang', 1, '2024-07-01 14:11:44', '2024-07-04 18:57:48'),
(2, 'Civic', 7, '2024-07-04 18:54:51', '2024-07-04 18:54:51'),
(4, 'NouveauModele', 7, '2024-07-16 15:33:51', '2024-07-16 15:33:51');

-- --------------------------------------------------------

--
-- Structure de la table `mode_paiements`
--

CREATE TABLE `mode_paiements` (
  `id` int(11) NOT NULL,
  `type` longtext,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `mode_paiements`
--

INSERT INTO `mode_paiements` (`id`, `type`, `createdAt`, `updatedAt`) VALUES
(1, '{ \"en\": \"Credit\", \"fr\": \"Crédit\" }', '2024-07-16 17:02:26', '2024-07-16 17:02:26'),
(2, '{ \"en\": \"Cash\", \"fr\": \"Argent\" }', '2024-07-16 17:02:46', '2024-07-16 17:02:46');

-- --------------------------------------------------------

--
-- Structure de la table `motopropulseurs`
--

CREATE TABLE `motopropulseurs` (
  `id` int(11) NOT NULL,
  `type` longtext,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `motopropulseurs`
--

INSERT INTO `motopropulseurs` (`id`, `type`, `createdAt`, `updatedAt`) VALUES
(1, '{ \"en\": \"1.5L Turbocharged Inline-4\", \"fr\": \"1.5L turbo 4 cylindres en ligne\" }', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(2, '{ \"en\": \"2.0L Naturally Aspirated Inline-4\", \"fr\": \"2.0L atmosphérique 4 cylindres en ligne\" }\n', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(3, '{ \"en\": \"Hybrid\", \"fr\": \"Hybride\" }', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(4, '{ \"en\": \"2.3L EcoBoost Inline-4\", \"fr\": \"2.3L EcoBoost 4 cylindres en ligne\" }', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(5, '{ \"en\": \"5.0L V8\", \"fr\": \"5.0L V8\" }', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(6, '{ \"en\": \"5.2L Supercharged V8\", \"fr\": \"5.2L V8 suralimenté\" }', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(7, '{ \"en\": \"Plug-in Hybrid\", \"fr\": \"Hybride rechargeable\" }', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(8, '{ \"en\": \"1.4L TSI Inline-4\", \"fr\": \"1.4L TSI 4 cylindres en ligne\" }', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(9, '{ \"en\": \"2.0L TSI Inline-4\", \"fr\": \"2.0L TSI 4 cylindres en ligne\" }', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(10, '{ \"en\": \"2.0L TDI Inline-4\", \"fr\": \"2.0L TDI 4 cylindres en ligne\" }', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(11, '{ \"en\": \"Electric\", \"fr\": \"Électrique\" }', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(12, '{ \"en\": \"1.8L TSI Inline-4\", \"fr\": \"1.8L TSI 4 cylindres en ligne\" }', '2024-07-01 14:11:44', '2024-07-01 14:11:44');

-- --------------------------------------------------------

--
-- Structure de la table `privileges`
--

CREATE TABLE `privileges` (
  `id` int(11) NOT NULL,
  `type` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `privileges`
--

INSERT INTO `privileges` (`id`, `type`, `createdAt`, `updatedAt`) VALUES
(1, '{\"en\":\"Adminsssss\",\"fr\":\"Managerrrrrrrrt\"}', '2024-06-27 12:43:44', '2024-07-02 12:30:53'),
(2, '{\"en\":\"Employee\",\"fr\":\"Employé.e\"}', '2024-06-27 12:47:31', '2024-06-27 12:47:31'),
(3, '{\"en\":\"Client\",\"fr\":\"Client.e\"}', '2024-06-27 14:45:19', '2024-06-27 14:45:19'),
(13, '{\"en\":\"Boss\",\"fr\":\"PAtron\"}', '2024-06-27 18:32:06', '2024-06-27 18:32:06');

-- --------------------------------------------------------

--
-- Structure de la table `provinces`
--

CREATE TABLE `provinces` (
  `id` int(11) NOT NULL,
  `nom` longtext,
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `provinces`
--

INSERT INTO `provinces` (`id`, `nom`, `createdAt`, `updatedAt`) VALUES
(1, '{\"fr\":\"Québec\", \"en\":\"Quebec\"}', '2024-07-16 13:14:57', '2024-07-16 13:14:57'),
(2, '{\"en\":\"Ontario\", \"fr\":\"Ontario\"}', '2024-07-16 13:14:57', '2024-07-16 13:14:57'),
(3, '{\"fr\":\"Alberta\", \"en\":\"Alberta\"}', '2024-07-16 13:14:57', '2024-07-16 13:14:57'),
(4, '{\"fr\":\"Colombie-Britannique\", \"en\":\"Colombie-Britannique\"}', '2024-07-16 13:14:57', '2024-07-16 13:14:57'),
(5, '{\"fr\":\"Île-du-Prince-Édouard\", \"en\":\"Île-du-Prince-Édouard\"}', '2024-07-16 13:14:57', '2024-07-16 13:14:57'),
(6, '{\"fr\":\"Manitoba\", \"en\":\"Manitoba\"}', '2024-07-16 13:14:57', '2024-07-16 13:14:57'),
(7, '{\"fr\":\"Nouveau-Brunswick\", \"en\":\"Nouveau-Brunswick\"}', '2024-07-16 13:14:57', '2024-07-16 13:14:57'),
(8, '{\"fr\":\"Nouvelle-Écosse\", \"en\":\"Nouvelle-Écosse\"}', '2024-07-16 13:14:57', '2024-07-16 13:14:57'),
(9, '{\"fr\":\"Nunavut\", \"en\":\"Nunavut\"}', '2024-07-16 13:14:57', '2024-07-16 13:14:57'),
(10, '{\"fr\":\"Saskatchewan\", \"en\":\"Saskatchewan\"}', '2024-07-16 13:14:57', '2024-07-16 13:14:57'),
(11, '{\"fr\":\"Terre-Neuve-et-Labrador\", \"en\":\"Terre-Neuve-et-Labrador\"}', '2024-07-16 13:14:57', '2024-07-16 13:14:57'),
(12, '{\"fr\":\"Territoires du Nord-Ouest\", \"en\":\"Territoires du Nord-Ouest\"}', '2024-07-16 13:14:57', '2024-07-16 13:14:57'),
(13, '{\"fr\":\"Yukon\", \"en\":\"Yukon\"}', '2024-07-16 13:14:57', '2024-07-16 13:14:57');

-- --------------------------------------------------------

--
-- Structure de la table `statuts`
--

CREATE TABLE `statuts` (
  `id` int(11) NOT NULL,
  `type` longtext,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `statuts`
--

INSERT INTO `statuts` (`id`, `type`, `createdAt`, `updatedAt`) VALUES
(1, '{ \"en\": \"Reserved\", \"fr\": \"Réservé\" }', '2024-07-16 17:03:02', '2024-07-16 17:03:02'),
(2, '{ \"en\": \"Sold\", \"fr\": \"Vendu\" }', '2024-07-16 17:03:21', '2024-07-16 17:03:21');

-- --------------------------------------------------------

--
-- Structure de la table `taxes`
--

CREATE TABLE `taxes` (
  `id` int(11) NOT NULL,
  `type` longtext,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `province_id` int(11) DEFAULT NULL,
  `taux` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `taxes`
--

INSERT INTO `taxes` (`id`, `type`, `createdAt`, `updatedAt`, `province_id`, `taux`) VALUES
(1, '{\"en\":\"GST\", \"fr\":\"TPS\"}', '2024-07-16 17:29:07', '2024-07-16 17:29:07', 3, 0.05),
(2, '{\"en\":\"GST + PST\", \"fr\":\"TPS + TVP\"}', '2024-07-16 17:29:07', '2024-07-16 17:29:07', 4, 0.12),
(3, '{\"en\":\"GST + PST\", \"fr\":\"TPS + TVP\"}', '2024-07-16 17:29:07', '2024-07-16 17:29:07', 6, 0.12),
(4, '{\"en\":\"HST\", \"fr\":\"TVH\"}', '2024-07-16 17:29:07', '2024-07-16 17:29:07', 7, 0.15),
(5, '{\"en\":\"HST\", \"fr\":\"TVH\"}', '2024-07-16 17:29:07', '2024-07-16 17:29:07', 11, 0.15),
(6, '{\"en\":\"GST\", \"fr\":\"TVP\"}', '2024-07-16 17:29:07', '2024-07-16 17:29:07', 12, 0.05),
(7, '{\"en\":\"HST\", \"fr\":\"TVH\"}', '2024-07-16 17:29:07', '2024-07-16 17:29:07', 8, 0.15),
(8, '{\"en\":\"GST\", \"fr\":\"TPS\"}', '2024-07-16 17:29:07', '2024-07-16 17:29:07', 9, 0.05),
(9, '{\"en\":\"HST\", \"fr\":\"TVH\"}', '2024-07-16 17:29:07', '2024-07-16 17:29:07', 2, 0.13),
(10, '{\"en\":\"HST\", \"fr\":\"TVH\"}', '2024-07-16 17:29:07', '2024-07-16 17:29:07', 5, 0.15),
(11, '{\"en\":\"GST + *QST\", \"fr\":\"TPS + *TVQ\"}', '2024-07-16 17:29:07', '2024-07-16 17:29:07', 1, 0.14975),
(12, '{\"en\":\"GST + PST\", \"fr\":\"TPS + TVP\"}', '2024-07-16 17:29:07', '2024-07-16 17:29:07', 10, 0.11),
(13, '{\"en\":\"GST\", \"fr\":\"TPS\"}', '2024-07-16 17:29:07', '2024-07-16 17:29:07', 13, 0.05);

-- --------------------------------------------------------

--
-- Structure de la table `transmissions`
--

CREATE TABLE `transmissions` (
  `id` int(11) NOT NULL,
  `type` longtext,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `transmissions`
--

INSERT INTO `transmissions` (`id`, `type`, `createdAt`, `updatedAt`) VALUES
(1, '{\"en\":\"6-Speed Manuallllll\",\"fr\":\"Manuelle 6 vitessesssssssss\"}', '2024-07-01 14:11:44', '2024-07-04 11:38:49'),
(2, '{ \"en\": \"10-Speed Automatic\", \"fr\": \"Automatique 10 vitesses\" }', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(3, '{ \"en\": \"6-Speed Automatic\", \"fr\": \"Automatique 6 vitesses\" }', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(4, '{ \"en\": \"7-Speed DSG Automatic\", \"fr\": \"Automatique DSG 7 vitesses\" }', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(5, '{ \"en\": \"Single-speed automatic\", \"fr\": \"Monovitesse automatique\" }', '2024-07-01 14:11:44', '2024-07-01 14:11:44'),
(6, '{ \"en\": \"6-speed dual-clutch automatic (DSG)\", \"fr\": \"6 vitesses automatique à double embrayage (DSG)\" }', '2024-07-01 14:11:44', '2024-07-01 14:11:44');

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `anniversaire` date DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `ville_id` int(12) DEFAULT NULL,
  `code_postal` varchar(255) DEFAULT NULL,
  `telephone` int(11) DEFAULT NULL,
  `cellulaire` int(11) DEFAULT NULL,
  `courriel` varchar(255) DEFAULT NULL,
  `nom_utilisateur` varchar(255) DEFAULT NULL,
  `mot_de_passe` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `privilege_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `utilisateurs`
--

INSERT INTO `utilisateurs` (`id`, `nom`, `prenom`, `anniversaire`, `adresse`, `ville_id`, `code_postal`, `telephone`, `cellulaire`, `courriel`, `nom_utilisateur`, `mot_de_passe`, `token`, `privilege_id`, `createdAt`, `updatedAt`) VALUES
(21, 'Q', 'Clara', NULL, NULL, 434, 'h1h1h1', NULL, NULL, 'clara@clara.com', 'clara', '$2b$10$9N1qGSvQR3x86biRdcBXRuZk7COSmvd0G1INAV77SzQq2t6CVScqe', NULL, 2, '2024-06-27 18:31:04', '2024-07-02 12:29:53'),
(22, 'B', 'Juju', '2008-02-11', NULL, 33, 'h1h1h1', NULL, NULL, 'juju@juju.com', 'jujuzinha', '$2b$10$9N1qGSvQR3x86biRdcBXRuZk7COSmvd0G1INAV77SzQq2t6CVScqe', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjIsImlhdCI6MTcyMDU2MDcxN30.Im7UffHXGA2JMXslERElJ6R_IvTPxd-QSaiPY1Bebqw', 1, '2024-07-01 00:53:49', '2024-07-09 21:31:57'),
(23, 'B', 'Ariela', '2007-01-27', '1111 Ste Catherine', 2, '', 0, 0, 'ariela@ariela', 'ariela', '$2b$10$9N1qGSvQR3x86biRdcBXRuZk7COSmvd0G1INAV77SzQq2t6CVScqe', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsImlhdCI6MTcxOTk1NzE1M30.j6i4Af5SecChd1O7eThc-CKbMj3R3BXWX-_eE71xNCw', 3, '2024-07-01 14:43:56', '2024-07-02 21:52:33'),
(24, 'teste', 'teste', NULL, NULL, 1, NULL, NULL, NULL, 'teste@teste.com', 'teste', '$2b$10$5lf7grwpFdiIffeznRjFU.GnbzifgpmdXUMFHsnKnt0EdHv2wC2gi', NULL, 3, '2024-07-04 17:51:11', '2024-07-04 17:51:11'),
(25, 'Ren', 'Ren', NULL, NULL, 452, NULL, NULL, NULL, 'r@g.c', 'G', '$2b$10$2ze5Ue8qK8NGwTvnLE7Sd.4/OQT8lH2kIL26Er44rQ3Y2UH8hB11y', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjUsImlhdCI6MTcyMTE0NzA3OX0.AHNibGW-FnjcfYh0VLP_idOUdYcWuZpejKwmJel6eHs', 1, '2024-07-16 15:24:16', '2024-07-16 16:24:39'),
(26, 'Re', 'Re', NULL, NULL, 188, NULL, NULL, NULL, 'r@m.c', 'Re', '$2b$10$eMtPyLZYIk86Yul3TBXAbuuUMDvEOlx.2xkz83RhpLxxTO3tzHDp.', NULL, 3, '2024-07-16 16:16:22', '2024-07-16 16:16:22');

-- --------------------------------------------------------

--
-- Structure de la table `villes`
--

CREATE TABLE `villes` (
  `id` int(11) NOT NULL,
  `nom` longtext,
  `province_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `villes`
--

INSERT INTO `villes` (`id`, `nom`, `province_id`, `createdAt`, `updatedAt`) VALUES
(1, '{\"fr\":\"botsford\", \"en\":\"botsford\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(2, '{\"fr\":\"Armstrong\", \"en\":\"Armstrong\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(3, '{\"fr\":\"Burnaby\", \"en\":\"Burnaby\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(4, '{\"fr\":\"Campbell River\", \"en\":\"Campbell River\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(5, '{\"fr\":\"Castlegar\", \"en\":\"Castlegar\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(6, '{\"fr\":\"Chilliwack\", \"en\":\"Chilliwack\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(7, '{\"fr\":\"Cloverdale\", \"en\":\"Cloverdale\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(8, '{\"fr\":\"Colwood\", \"en\":\"Colwood\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(9, '{\"fr\":\"Coquitlam\", \"en\":\"Coquitlam\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(10, '{\"fr\":\"Courtenay\", \"en\":\"Courtenay\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(11, '{\"fr\":\"Cranbrook\", \"en\":\"Cranbrook\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(12, '{\"fr\":\"Dawson Creek\", \"en\":\"Dawson Creek\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(13, '{\"fr\":\"Duncan\", \"en\":\"Duncan\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(14, '{\"fr\":\"Enderby\", \"en\":\"Enderby\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(15, '{\"fr\":\"Fernie\", \"en\":\"Fernie\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(16, '{\"fr\":\"Fort St. John\", \"en\":\"Fort St. John\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(17, '{\"fr\":\"Grand Forks\", \"en\":\"Grand Forks\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(18, '{\"fr\":\"Greenwood\", \"en\":\"Greenwood\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(19, '{\"fr\":\"Kamloops\", \"en\":\"Kamloops\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(20, '{\"fr\":\"Kelowna\", \"en\":\"Kelowna\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(21, '{\"fr\":\"Kimberley\", \"en\":\"Kimberley\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(22, '{\"fr\":\"Kitimat\", \"en\":\"Kitimat\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(23, '{\"fr\":\"Langford\", \"en\":\"Langford\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(24, '{\"fr\":\"Langley\", \"en\":\"Langley\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(25, '{\"fr\":\"Merritt\", \"en\":\"Merritt\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(26, '{\"fr\":\"Mission\", \"en\":\"Mission\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(27, '{\"fr\":\"Nanaimo\", \"en\":\"Nanaimo\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(28, '{\"fr\":\"Nelson\", \"en\":\"Nelson\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(29, '{\"fr\":\"New Westminster\", \"en\":\"New Westminster\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(30, '{\"fr\":\"North Vancouver\", \"en\":\"North Vancouver\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(31, '{\"fr\":\"Parksville\", \"en\":\"Parksville\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(32, '{\"fr\":\"Penticton\", \"en\":\"Penticton\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(33, '{\"fr\":\"Pitt Meadows\", \"en\":\"Pitt Meadows\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(34, '{\"fr\":\"Port Alberni\", \"en\":\"Port Alberni\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(35, '{\"fr\":\"Port Coquitlam\", \"en\":\"Port Coquitlam\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(36, '{\"fr\":\"Port Moody\", \"en\":\"Port Moody\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(37, '{\"fr\":\"Powell River\", \"en\":\"Powell River\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(38, '{\"fr\":\"Prince George\", \"en\":\"Prince George\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(39, '{\"fr\":\"Prince Rupert\", \"en\":\"Prince Rupert\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(40, '{\"fr\":\"Quesnel\", \"en\":\"Quesnel\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(41, '{\"fr\":\"Revelstoke\", \"en\":\"Revelstoke\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(42, '{\"fr\":\"Richmond\", \"en\":\"Richmond\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(43, '{\"fr\":\"Rossland\", \"en\":\"Rossland\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(44, '{\"fr\":\"Salmon Arm\", \"en\":\"Salmon Arm\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(45, '{\"fr\":\"Surrey\", \"en\":\"Surrey\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(46, '{\"fr\":\"Terrace\", \"en\":\"Terrace\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(47, '{\"fr\":\"Trail\", \"en\":\"Trail\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(48, '{\"fr\":\"Vancouver\", \"en\":\"Vancouver\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(49, '{\"fr\":\"Vernon\", \"en\":\"Vernon\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(50, '{\"fr\":\"Victoria\", \"en\":\"Victoria\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(51, '{\"fr\":\"White Rock\", \"en\":\"White Rock\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(52, '{\"fr\":\"Williams Lake\", \"en\":\"Williams Lake\"}', 4, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(53, '{\"fr\":\"Brandon\", \"en\":\"Brandon\"}', 6, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(54, '{\"fr\":\"Dauphin\", \"en\":\"Dauphin\"}', 6, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(55, '{\"fr\":\"Flin Flon\", \"en\":\"Flin Flon\"}', 6, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(56, '{\"fr\":\"Portage la Prairie\", \"en\":\"Portage la Prairie\"}', 6, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(57, '{\"fr\":\"Selkirk\", \"en\":\"Selkirk\"}', 6, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(58, '{\"fr\":\"Steinbach\", \"en\":\"Steinbach\"}', 6, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(59, '{\"fr\":\"Thompson\", \"en\":\"Thompson\"}', 6, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(60, '{\"fr\":\"Winkler\", \"en\":\"Winkler\"}', 6, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(61, '{\"fr\":\"Winnipeg\", \"en\":\"Winnipeg\"}', 6, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(62, '{\"fr\":\"Bathurst\", \"en\":\"Bathurst\"}', 7, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(63, '{\"fr\":\"Campbellton\", \"en\":\"Campbellton\"}', 7, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(64, '{\"fr\":\"Dieppe\", \"en\":\"Dieppe\"}', 7, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(65, '{\"fr\":\"Edmundston\", \"en\":\"Edmundston\"}', 7, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(66, '{\"fr\":\"Elsipogtog\", \"en\":\"Elsipogtog\"}', 7, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(67, '{\"fr\":\"Fredericton\", \"en\":\"Fredericton\"}', 7, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(68, '{\"fr\":\"Miramichi\", \"en\":\"Miramichi\"}', 7, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(69, '{\"fr\":\"Moncton\", \"en\":\"Moncton\"}', 7, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(70, '{\"fr\":\"Saint-Jean\", \"en\":\"Saint-Jean\"}', 7, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(71, '{\"fr\":\"Barrie\", \"en\":\"Barrie\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(72, '{\"fr\":\"Belleville\", \"en\":\"Belleville\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(73, '{\"fr\":\"Brampton\", \"en\":\"Brampton\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(74, '{\"fr\":\"Brant\", \"en\":\"Brant\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(75, '{\"fr\":\"Brantford\", \"en\":\"Brantford\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(76, '{\"fr\":\"Brockville\", \"en\":\"Brockville\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(77, '{\"fr\":\"Burlington\", \"en\":\"Burlington\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(78, '{\"fr\":\"Cambridge\", \"en\":\"Cambridge\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(79, '{\"fr\":\"Chatham-Kent\", \"en\":\"Chatham-Kent\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(80, '{\"fr\":\"Clarence-Rockland\", \"en\":\"Clarence-Rockland\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(81, '{\"fr\":\"Cornwall\", \"en\":\"Cornwall\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(82, '{\"fr\":\"Dryden\", \"en\":\"Dryden\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(83, '{\"fr\":\"Elliot Lake\", \"en\":\"Elliot Lake\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(84, '{\"fr\":\"Grand Sudbury\", \"en\":\"Grand Sudbury\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(85, '{\"fr\":\"Guelph\", \"en\":\"Guelph\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(86, '{\"fr\":\"Hamilton\", \"en\":\"Hamilton\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(87, '{\"fr\":\"Kawartha Lakes\", \"en\":\"Kawartha Lakes\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(88, '{\"fr\":\"Kenora\", \"en\":\"Kenora\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(89, '{\"fr\":\"Kingston\", \"en\":\"Kingston\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(90, '{\"fr\":\"Kitchener\", \"en\":\"Kitchener\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(91, '{\"fr\":\"London\", \"en\":\"London\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(92, '{\"fr\":\"Mississauga\", \"en\":\"Mississauga\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(93, '{\"fr\":\"Niagara Falls\", \"en\":\"Niagara Falls\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(94, '{\"fr\":\"Comté de Norfolk\", \"en\":\"Comté de Norfolk\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(95, '{\"fr\":\"North Bay\", \"en\":\"North Bay\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(96, '{\"fr\":\"Orillia\", \"en\":\"Orillia\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(97, '{\"fr\":\"Oshawa\", \"en\":\"Oshawa\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(98, '{\"fr\":\"Ottawa\", \"en\":\"Ottawa\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(99, '{\"fr\":\"Owen Sound\", \"en\":\"Owen Sound\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(100, '{\"fr\":\"Pembroke\", \"en\":\"Pembroke\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(101, '{\"fr\":\"Peterborough\", \"en\":\"Peterborough\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(102, '{\"fr\":\"Pickering\", \"en\":\"Pickering\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(103, '{\"fr\":\"Comté du Prince-Édouard\", \"en\":\"Comté du Prince-Édouard\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(104, '{\"fr\":\"Port Colborne\", \"en\":\"Port Colborne\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(105, '{\"fr\":\"Quinte West\", \"en\":\"Quinte West\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(106, '{\"fr\":\"Sarnia\", \"en\":\"Sarnia\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(107, '{\"fr\":\"Sault Ste. Marie\", \"en\":\"Sault Ste. Marie\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(108, '{\"fr\":\"St. Catharines\", \"en\":\"St. Catharines\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(109, '{\"fr\":\"St. Thomas\", \"en\":\"St. Thomas\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(110, '{\"fr\":\"Stratford\", \"en\":\"Stratford\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(111, '{\"fr\":\"Temiskaming Shores\", \"en\":\"Temiskaming Shores\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(112, '{\"fr\":\"Thorold\", \"en\":\"Thorold\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(113, '{\"fr\":\"Thunder Bay\", \"en\":\"Thunder Bay\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(114, '{\"fr\":\"Timmins\", \"en\":\"Timmins\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(115, '{\"fr\":\"Toronto\", \"en\":\"Toronto\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(116, '{\"fr\":\"Vaughan\", \"en\":\"Vaughan\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(117, '{\"fr\":\"Waterloo\", \"en\":\"Waterloo\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(118, '{\"fr\":\"Welland\", \"en\":\"Welland\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(119, '{\"fr\":\"Windsor\", \"en\":\"Windsor\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(120, '{\"fr\":\"Woodstock\", \"en\":\"Woodstock\"}', 2, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(121, '{\"fr\":\"Acton Vale\", \"en\":\"Acton Vale\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(122, '{\"fr\":\"Alma\", \"en\":\"Alma\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(123, '{\"fr\":\"Amos\", \"en\":\"Amos\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(124, '{\"fr\":\"Amqui\", \"en\":\"Amqui\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(125, '{\"fr\":\"Asbestos\", \"en\":\"Asbestos\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(126, '{\"fr\":\"Baie-Comeau\", \"en\":\"Baie-Comeau\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(127, '{\"fr\":\"Baie-Saint-Paul\", \"en\":\"Baie-Saint-Paul\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(128, '{\"fr\":\"Barkmere\", \"en\":\"Barkmere\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(129, '{\"fr\":\"Beaconsfield\", \"en\":\"Beaconsfield\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(130, '{\"fr\":\"Beauceville\", \"en\":\"Beauceville\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(131, '{\"fr\":\"Beauharnois\", \"en\":\"Beauharnois\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(132, '{\"fr\":\"Beaupré\", \"en\":\"Beaupré\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(133, '{\"fr\":\"Bécancour\", \"en\":\"Bécancour\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(134, '{\"fr\":\"Bedford\", \"en\":\"Bedford\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(135, '{\"fr\":\"Belleterre\", \"en\":\"Belleterre\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(136, '{\"fr\":\"Belœil\", \"en\":\"Belœil\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(137, '{\"fr\":\"Berthierville\", \"en\":\"Berthierville\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(138, '{\"fr\":\"Blainville\", \"en\":\"Blainville\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(139, '{\"fr\":\"Bois-des-Filion\", \"en\":\"Bois-des-Filion\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(140, '{\"fr\":\"Boisbriand\", \"en\":\"Boisbriand\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(141, '{\"fr\":\"Bonaventure\", \"en\":\"Bonaventure\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(142, '{\"fr\":\"Boucherville\", \"en\":\"Boucherville\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(143, '{\"fr\":\"Lac-Brome\", \"en\":\"Lac-Brome\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(144, '{\"fr\":\"Bromont\", \"en\":\"Bromont\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(145, '{\"fr\":\"Brossard\", \"en\":\"Brossard\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(146, '{\"fr\":\"Brownsburg-Chatham\", \"en\":\"Brownsburg-Chatham\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(147, '{\"fr\":\"Cabano\", \"en\":\"Cabano\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(148, '{\"fr\":\"Candiac\", \"en\":\"Candiac\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(149, '{\"fr\":\"Cap-Chat\", \"en\":\"Cap-Chat\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(150, '{\"fr\":\"Cap-Santé\", \"en\":\"Cap-Santé\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(151, '{\"fr\":\"Carignan\", \"en\":\"Carignan\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(152, '{\"fr\":\"Carleton-sur-Mer\", \"en\":\"Carleton-sur-Mer\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(153, '{\"fr\":\"Causapscal\", \"en\":\"Causapscal\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(154, '{\"fr\":\"Chambly\", \"en\":\"Chambly\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(155, '{\"fr\":\"Chandler\", \"en\":\"Chandler\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(156, '{\"fr\":\"Chapais\", \"en\":\"Chapais\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(157, '{\"fr\":\"Charlemagne\", \"en\":\"Charlemagne\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(158, '{\"fr\":\"ChateauguayChâteauguay\", \"en\":\"ChateauguayChâteauguay\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(159, '{\"fr\":\"Chateau-RicherChâteau-Richer\", \"en\":\"Chateau-RicherChâteau-Richer\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(160, '{\"fr\":\"Chibougamau\", \"en\":\"Chibougamau\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(161, '{\"fr\":\"Clermont\", \"en\":\"Clermont\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(162, '{\"fr\":\"Coaticook\", \"en\":\"Coaticook\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(163, '{\"fr\":\"Contrecœur\", \"en\":\"Contrecœur\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(164, '{\"fr\":\"Cookshire-Eaton\", \"en\":\"Cookshire-Eaton\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(165, '{\"fr\":\"Cote-Saint-LucCôte-Saint-Luc\", \"en\":\"Cote-Saint-LucCôte-Saint-Luc\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(166, '{\"fr\":\"Cowansville\", \"en\":\"Cowansville\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(167, '{\"fr\":\"Danville\", \"en\":\"Danville\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(168, '{\"fr\":\"Daveluyville\", \"en\":\"Daveluyville\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(169, '{\"fr\":\"DegelisDégelis\", \"en\":\"DegelisDégelis\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(170, '{\"fr\":\"Delson\", \"en\":\"Delson\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(171, '{\"fr\":\"Desbiens\", \"en\":\"Desbiens\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(172, '{\"fr\":\"Deux-Montagnes\", \"en\":\"Deux-Montagnes\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(173, '{\"fr\":\"Disraeli\", \"en\":\"Disraeli\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(174, '{\"fr\":\"Dolbeau-Mistassini\", \"en\":\"Dolbeau-Mistassini\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(175, '{\"fr\":\"Dollard-des-Ormeaux\", \"en\":\"Dollard-des-Ormeaux\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(176, '{\"fr\":\"Donnacona\", \"en\":\"Donnacona\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(177, '{\"fr\":\"Dorval\", \"en\":\"Dorval\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(178, '{\"fr\":\"Drummondville\", \"en\":\"Drummondville\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(179, '{\"fr\":\"Dunham\", \"en\":\"Dunham\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(180, '{\"fr\":\"Duparquet\", \"en\":\"Duparquet\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(181, '{\"fr\":\"East Angus\", \"en\":\"East Angus\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(182, '{\"fr\":\"Estérel\", \"en\":\"Estérel\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(183, '{\"fr\":\"Farnham\", \"en\":\"Farnham\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(184, '{\"fr\":\"Fermont\", \"en\":\"Fermont\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(185, '{\"fr\":\"Forestville\", \"en\":\"Forestville\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(186, '{\"fr\":\"Fossambault-sur-le-Lac\", \"en\":\"Fossambault-sur-le-Lac\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(187, '{\"fr\":\"Gaspé\", \"en\":\"Gaspé\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(188, '{\"fr\":\"Gatineau\", \"en\":\"Gatineau\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(189, '{\"fr\":\"Gracefield\", \"en\":\"Gracefield\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(190, '{\"fr\":\"Granby\", \"en\":\"Granby\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(191, '{\"fr\":\"Grande-Rivière\", \"en\":\"Grande-Rivière\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(192, '{\"fr\":\"Hampstead\", \"en\":\"Hampstead\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(193, '{\"fr\":\"Hudson\", \"en\":\"Hudson\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(194, '{\"fr\":\"Huntingdon\", \"en\":\"Huntingdon\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(195, '{\"fr\":\"Joliette\", \"en\":\"Joliette\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(196, '{\"fr\":\"Kingsey Falls\", \"en\":\"Kingsey Falls\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(197, '{\"fr\":\"Kirkland\", \"en\":\"Kirkland\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(198, '{\"fr\":\"Lac-Delage\", \"en\":\"Lac-Delage\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(199, '{\"fr\":\"Lac-Mégantic\", \"en\":\"Lac-Mégantic\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(200, '{\"fr\":\"Lac-Saint-Joseph\", \"en\":\"Lac-Saint-Joseph\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(201, '{\"fr\":\"Lac-Sergent\", \"en\":\"Lac-Sergent\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(202, '{\"fr\":\"Lachute\", \"en\":\"Lachute\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(203, '{\"fr\":\"Laval\", \"en\":\"Laval\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(204, '{\"fr\":\"Lavaltrie\", \"en\":\"Lavaltrie\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(205, '{\"fr\":\"Lebel-sur-Quévillon\", \"en\":\"Lebel-sur-Quévillon\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(206, '{\"fr\":\"LeryLéry\", \"en\":\"LeryLéry\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(207, '{\"fr\":\"LevisLévis\", \"en\":\"LevisLévis\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(208, '{\"fr\":\"Longueuil\", \"en\":\"Longueuil\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(209, '{\"fr\":\"Lorraine\", \"en\":\"Lorraine\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(210, '{\"fr\":\"Louiseville\", \"en\":\"Louiseville\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(211, '{\"fr\":\"Macamic\", \"en\":\"Macamic\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(212, '{\"fr\":\"Magog\", \"en\":\"Magog\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(213, '{\"fr\":\"Malartic\", \"en\":\"Malartic\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(214, '{\"fr\":\"MalbaieLa Malbaie\", \"en\":\"MalbaieLa Malbaie\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(215, '{\"fr\":\"Maniwaki\", \"en\":\"Maniwaki\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(216, '{\"fr\":\"Marieville\", \"en\":\"Marieville\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(217, '{\"fr\":\"Mascouche\", \"en\":\"Mascouche\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(218, '{\"fr\":\"Matagami\", \"en\":\"Matagami\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(219, '{\"fr\":\"Matane\", \"en\":\"Matane\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(220, '{\"fr\":\"Mercier\", \"en\":\"Mercier\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(221, '{\"fr\":\"MetabetchouanMétabetchouan–Lac-à-la-Croix\", \"en\":\"MetabetchouanMétabetchouan–Lac-à-la-Croix\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(222, '{\"fr\":\"MetisMétis-sur-Mer\", \"en\":\"MetisMétis-sur-Mer\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(223, '{\"fr\":\"Mirabel (Québec)\", \"en\":\"Mirabel (Québec)\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(224, '{\"fr\":\"Mont-Joli\", \"en\":\"Mont-Joli\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(225, '{\"fr\":\"Mont-Laurier\", \"en\":\"Mont-Laurier\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(226, '{\"fr\":\"Mont-Saint-Hilaire\", \"en\":\"Mont-Saint-Hilaire\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(227, '{\"fr\":\"Mont-Tremblant\", \"en\":\"Mont-Tremblant\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(228, '{\"fr\":\"Montmagny\", \"en\":\"Montmagny\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(229, '{\"fr\":\"Montréal\", \"en\":\"Montréal\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(230, '{\"fr\":\"Montréal-Est\", \"en\":\"Montréal-Est\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(231, '{\"fr\":\"Montréal-Ouest\", \"en\":\"Montréal-Ouest\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(232, '{\"fr\":\"Mont-Royal\", \"en\":\"Mont-Royal\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(233, '{\"fr\":\"Murdochville\", \"en\":\"Murdochville\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(234, '{\"fr\":\"Neuville\", \"en\":\"Neuville\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(235, '{\"fr\":\"New Richmond\", \"en\":\"New Richmond\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(236, '{\"fr\":\"Nicolet\", \"en\":\"Nicolet\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(237, '{\"fr\":\"Normandin\", \"en\":\"Normandin\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(238, '{\"fr\":\"Notre-Dame-des-Prairies\", \"en\":\"Notre-Dame-des-Prairies\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(239, '{\"fr\":\"Notre-Dame-du-Lac\", \"en\":\"Notre-Dame-du-Lac\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(240, '{\"fr\":\"Otterburn Park\", \"en\":\"Otterburn Park\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(241, '{\"fr\":\"Paspébiac\", \"en\":\"Paspébiac\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(242, '{\"fr\":\"Percé\", \"en\":\"Percé\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(243, '{\"fr\":\"Pincourt\", \"en\":\"Pincourt\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(244, '{\"fr\":\"Plessisville\", \"en\":\"Plessisville\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(245, '{\"fr\":\"PocatiereLa Pocatière\", \"en\":\"PocatiereLa Pocatière\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(246, '{\"fr\":\"PohenegamookPohénégamook\", \"en\":\"PohenegamookPohénégamook\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(247, '{\"fr\":\"Pointe-Claire\", \"en\":\"Pointe-Claire\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(248, '{\"fr\":\"Pont-Rouge\", \"en\":\"Pont-Rouge\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(249, '{\"fr\":\"Port-Cartier\", \"en\":\"Port-Cartier\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(250, '{\"fr\":\"Portneuf\", \"en\":\"Portneuf\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(251, '{\"fr\":\"PrairieLa Prairie\", \"en\":\"PrairieLa Prairie\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(252, '{\"fr\":\"Princeville\", \"en\":\"Princeville\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(253, '{\"fr\":\"Prévost\", \"en\":\"Prévost\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(254, '{\"fr\":\"Québec\", \"en\":\"Québec\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(255, '{\"fr\":\"Repentigny\", \"en\":\"Repentigny\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(256, '{\"fr\":\"Richelieu\", \"en\":\"Richelieu\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(257, '{\"fr\":\"Richmond\", \"en\":\"Richmond\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(258, '{\"fr\":\"Rimouski\", \"en\":\"Rimouski\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(259, '{\"fr\":\"Rivière-du-Loup\", \"en\":\"Rivière-du-Loup\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(260, '{\"fr\":\"Rivière-Rouge\", \"en\":\"Rivière-Rouge\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(261, '{\"fr\":\"Roberval\", \"en\":\"Roberval\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(262, '{\"fr\":\"Rosemère\", \"en\":\"Rosemère\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(263, '{\"fr\":\"Rouyn-Noranda\", \"en\":\"Rouyn-Noranda\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(264, '{\"fr\":\"Saguenay\", \"en\":\"Saguenay\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(265, '{\"fr\":\"Sainte-Adèle\", \"en\":\"Sainte-Adèle\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(266, '{\"fr\":\"Sainte-Agathe-des-Monts\", \"en\":\"Sainte-Agathe-des-Monts\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(267, '{\"fr\":\"Sainte-Anne-de-Beaupré\", \"en\":\"Sainte-Anne-de-Beaupré\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(268, '{\"fr\":\"Sainte-Anne-de-Bellevue\", \"en\":\"Sainte-Anne-de-Bellevue\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(269, '{\"fr\":\"Sainte-Anne-des-Monts\", \"en\":\"Sainte-Anne-des-Monts\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(270, '{\"fr\":\"Sainte-Anne-des-Plaines\", \"en\":\"Sainte-Anne-des-Plaines\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(271, '{\"fr\":\"Saint-Augustin-de-Desmaures\", \"en\":\"Saint-Augustin-de-Desmaures\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(272, '{\"fr\":\"Saint-Basile\", \"en\":\"Saint-Basile\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(273, '{\"fr\":\"Saint-Basile-le-Grand\", \"en\":\"Saint-Basile-le-Grand\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(274, '{\"fr\":\"Saint-Bruno-de-Montarville\", \"en\":\"Saint-Bruno-de-Montarville\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(275, '{\"fr\":\"Sainte-Catherine\", \"en\":\"Sainte-Catherine\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(276, '{\"fr\":\"Sainte-Catherine-de-la-Jacques-Cartier\", \"en\":\"Sainte-Catherine-de-la-Jacques-Cartier\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(277, '{\"fr\":\"Saint-Césaire\", \"en\":\"Saint-Césaire\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(278, '{\"fr\":\"Saint-Constant\", \"en\":\"Saint-Constant\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(279, '{\"fr\":\"Saint-Eustache\", \"en\":\"Saint-Eustache\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(280, '{\"fr\":\"Saint-Félicien\", \"en\":\"Saint-Félicien\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(281, '{\"fr\":\"Saint-Gabriel\", \"en\":\"Saint-Gabriel\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(282, '{\"fr\":\"Saint-Georges\", \"en\":\"Saint-Georges\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(283, '{\"fr\":\"Saint-Hyacinthe\", \"en\":\"Saint-Hyacinthe\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(284, '{\"fr\":\"Saint-Jean-sur-Richelieu\", \"en\":\"Saint-Jean-sur-Richelieu\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(285, '{\"fr\":\"Saint-Jérôme\", \"en\":\"Saint-Jérôme\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(286, '{\"fr\":\"Saint-Joseph-de-Beauce\", \"en\":\"Saint-Joseph-de-Beauce\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(287, '{\"fr\":\"Saint-Joseph-de-Sorel\", \"en\":\"Saint-Joseph-de-Sorel\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(288, '{\"fr\":\"Sainte-Julie\", \"en\":\"Sainte-Julie\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(289, '{\"fr\":\"Saint-Lambert\", \"en\":\"Saint-Lambert\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(290, '{\"fr\":\"Saint-Lazare\", \"en\":\"Saint-Lazare\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(291, '{\"fr\":\"Saint-Lin-Laurentides\", \"en\":\"Saint-Lin-Laurentides\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(292, '{\"fr\":\"Saint-Marc-des-Carrières\", \"en\":\"Saint-Marc-des-Carrières\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(293, '{\"fr\":\"Sainte-Marguerite-du-Lac-Masson\", \"en\":\"Sainte-Marguerite-du-Lac-Masson\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(294, '{\"fr\":\"Sainte-Marie\", \"en\":\"Sainte-Marie\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(295, '{\"fr\":\"Sainte-Marthe-sur-le-Lac\", \"en\":\"Sainte-Marthe-sur-le-Lac\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(296, '{\"fr\":\"Saint-Ours\", \"en\":\"Saint-Ours\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(297, '{\"fr\":\"Saint-Pamphile\", \"en\":\"Saint-Pamphile\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(298, '{\"fr\":\"Saint-Pascal\", \"en\":\"Saint-Pascal\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(299, '{\"fr\":\"Saint-Pie\", \"en\":\"Saint-Pie\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(300, '{\"fr\":\"Saint-Raymond\", \"en\":\"Saint-Raymond\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(301, '{\"fr\":\"Saint-Rémi\", \"en\":\"Saint-Rémi\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(302, '{\"fr\":\"Saint-Sauveur\", \"en\":\"Saint-Sauveur\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(303, '{\"fr\":\"Sainte-Thérèse\", \"en\":\"Sainte-Thérèse\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(304, '{\"fr\":\"Saint-Tite\", \"en\":\"Saint-Tite\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(305, '{\"fr\":\"Salaberry-de-Valleyfield\", \"en\":\"Salaberry-de-Valleyfield\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(306, '{\"fr\":\"SarreLa Sarre\", \"en\":\"SarreLa Sarre\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(307, '{\"fr\":\"Schefferville\", \"en\":\"Schefferville\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(308, '{\"fr\":\"Scotstown\", \"en\":\"Scotstown\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(309, '{\"fr\":\"Senneterre\", \"en\":\"Senneterre\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(310, '{\"fr\":\"Sept-Îles\", \"en\":\"Sept-Îles\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(311, '{\"fr\":\"Shawinigan\", \"en\":\"Shawinigan\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(312, '{\"fr\":\"Sherbrooke\", \"en\":\"Sherbrooke\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(313, '{\"fr\":\"Sorel-Tracy\", \"en\":\"Sorel-Tracy\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(314, '{\"fr\":\"Stanstead\", \"en\":\"Stanstead\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(315, '{\"fr\":\"Sutton\", \"en\":\"Sutton\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(316, '{\"fr\":\"Témiscaming\", \"en\":\"Témiscaming\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(317, '{\"fr\":\"Terrebonne\", \"en\":\"Terrebonne\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(318, '{\"fr\":\"Thetford Mines\", \"en\":\"Thetford Mines\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(319, '{\"fr\":\"Thurso\", \"en\":\"Thurso\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(320, '{\"fr\":\"Trois-Pistoles\", \"en\":\"Trois-Pistoles\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(321, '{\"fr\":\"Trois-Rivières\", \"en\":\"Trois-Rivières\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(322, '{\"fr\":\"TuqueLa Tuque\", \"en\":\"TuqueLa Tuque\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(323, '{\"fr\":\"Valcourt\", \"en\":\"Valcourt\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(324, '{\"fr\":\"Varennes\", \"en\":\"Varennes\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(325, '{\"fr\":\"Vaudreuil-Dorion\", \"en\":\"Vaudreuil-Dorion\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(326, '{\"fr\":\"Victoriaville\", \"en\":\"Victoriaville\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(327, '{\"fr\":\"Ville-Marie\", \"en\":\"Ville-Marie\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(328, '{\"fr\":\"Warwick\", \"en\":\"Warwick\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(329, '{\"fr\":\"Waterloo\", \"en\":\"Waterloo\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(330, '{\"fr\":\"Waterville\", \"en\":\"Waterville\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(331, '{\"fr\":\"Westmount\", \"en\":\"Westmount\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(332, '{\"fr\":\"Windsor\", \"en\":\"Windsor\"}', 1, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(333, '{\"fr\":\"Corner Brook\", \"en\":\"Corner Brook\"}', 11, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(334, '{\"fr\":\"Mount Pearl\", \"en\":\"Mount Pearl\"}', 11, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(335, '{\"fr\":\"Saint-Jean\", \"en\":\"Saint-Jean\"}', 11, '2024-06-25 13:38:33', '2024-06-25 13:38:33'),
(336, '{\"fr\":\"Abbotsford\", \"en\":\"Abbotsford\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(337, '{\"fr\":\"Armstrong\", \"en\":\"Armstrong\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(338, '{\"fr\":\"Burnaby\", \"en\":\"Burnaby\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(339, '{\"fr\":\"Campbell River\", \"en\":\"Campbell River\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(340, '{\"fr\":\"Castlegar\", \"en\":\"Castlegar\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(341, '{\"fr\":\"Chilliwack\", \"en\":\"Chilliwack\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(342, '{\"fr\":\"Cloverdale\", \"en\":\"Cloverdale\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(343, '{\"fr\":\"Colwood\", \"en\":\"Colwood\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(344, '{\"fr\":\"Coquitlam\", \"en\":\"Coquitlam\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(345, '{\"fr\":\"Courtenay\", \"en\":\"Courtenay\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(346, '{\"fr\":\"Cranbrook\", \"en\":\"Cranbrook\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(347, '{\"fr\":\"Dawson Creek\", \"en\":\"Dawson Creek\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(348, '{\"fr\":\"Duncan\", \"en\":\"Duncan\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(349, '{\"fr\":\"Enderby\", \"en\":\"Enderby\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(350, '{\"fr\":\"Fernie\", \"en\":\"Fernie\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(351, '{\"fr\":\"Fort St. John\", \"en\":\"Fort St. John\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(352, '{\"fr\":\"Grand Forks\", \"en\":\"Grand Forks\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(353, '{\"fr\":\"Greenwood\", \"en\":\"Greenwood\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(354, '{\"fr\":\"Kamloops\", \"en\":\"Kamloops\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(355, '{\"fr\":\"Kelowna\", \"en\":\"Kelowna\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(356, '{\"fr\":\"Kimberley\", \"en\":\"Kimberley\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(357, '{\"fr\":\"Kitimat\", \"en\":\"Kitimat\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(358, '{\"fr\":\"Langford\", \"en\":\"Langford\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(359, '{\"fr\":\"Langley\", \"en\":\"Langley\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(360, '{\"fr\":\"Merritt\", \"en\":\"Merritt\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(361, '{\"fr\":\"Mission\", \"en\":\"Mission\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(362, '{\"fr\":\"Nanaimo\", \"en\":\"Nanaimo\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(363, '{\"fr\":\"Nelson\", \"en\":\"Nelson\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(364, '{\"fr\":\"New Westminster\", \"en\":\"New Westminster\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(365, '{\"fr\":\"North Vancouver\", \"en\":\"North Vancouver\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(366, '{\"fr\":\"Parksville\", \"en\":\"Parksville\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(367, '{\"fr\":\"Penticton\", \"en\":\"Penticton\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(368, '{\"fr\":\"Pitt Meadows\", \"en\":\"Pitt Meadows\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(369, '{\"fr\":\"Port Alberni\", \"en\":\"Port Alberni\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(370, '{\"fr\":\"Port Coquitlam\", \"en\":\"Port Coquitlam\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(371, '{\"fr\":\"Port Moody\", \"en\":\"Port Moody\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(372, '{\"fr\":\"Powell River\", \"en\":\"Powell River\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(373, '{\"fr\":\"Prince George\", \"en\":\"Prince George\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(374, '{\"fr\":\"Prince Rupert\", \"en\":\"Prince Rupert\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(375, '{\"fr\":\"Quesnel\", \"en\":\"Quesnel\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(376, '{\"fr\":\"Revelstoke\", \"en\":\"Revelstoke\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(377, '{\"fr\":\"Richmond\", \"en\":\"Richmond\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(378, '{\"fr\":\"Rossland\", \"en\":\"Rossland\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(379, '{\"fr\":\"Salmon Arm\", \"en\":\"Salmon Arm\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(380, '{\"fr\":\"Surrey\", \"en\":\"Surrey\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(381, '{\"fr\":\"Terrace\", \"en\":\"Terrace\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(382, '{\"fr\":\"Trail\", \"en\":\"Trail\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(383, '{\"fr\":\"Vancouver\", \"en\":\"Vancouver\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(384, '{\"fr\":\"Vernon\", \"en\":\"Vernon\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(385, '{\"fr\":\"Victoria\", \"en\":\"Victoria\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(386, '{\"fr\":\"White Rock\", \"en\":\"White Rock\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(387, '{\"fr\":\"Williams Lake\", \"en\":\"Williams Lake\"}', 4, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(388, '{\"fr\":\"Brandon\", \"en\":\"Brandon\"}', 6, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(389, '{\"fr\":\"Dauphin\", \"en\":\"Dauphin\"}', 6, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(390, '{\"fr\":\"Flin Flon\", \"en\":\"Flin Flon\"}', 6, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(391, '{\"fr\":\"Portage la Prairie\", \"en\":\"Portage la Prairie\"}', 6, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(392, '{\"fr\":\"Selkirk\", \"en\":\"Selkirk\"}', 6, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(393, '{\"fr\":\"Steinbach\", \"en\":\"Steinbach\"}', 6, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(394, '{\"fr\":\"Thompson\", \"en\":\"Thompson\"}', 6, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(395, '{\"fr\":\"Winkler\", \"en\":\"Winkler\"}', 6, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(396, '{\"fr\":\"Winnipeg\", \"en\":\"Winnipeg\"}', 6, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(397, '{\"fr\":\"Bathurst\", \"en\":\"Bathurst\"}', 7, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(398, '{\"fr\":\"Campbellton\", \"en\":\"Campbellton\"}', 7, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(399, '{\"fr\":\"Dieppe\", \"en\":\"Dieppe\"}', 7, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(400, '{\"fr\":\"Edmundston\", \"en\":\"Edmundston\"}', 7, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(401, '{\"fr\":\"Elsipogtog\", \"en\":\"Elsipogtog\"}', 7, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(402, '{\"fr\":\"Fredericton\", \"en\":\"Fredericton\"}', 7, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(403, '{\"fr\":\"Miramichi\", \"en\":\"Miramichi\"}', 7, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(404, '{\"fr\":\"Moncton\", \"en\":\"Moncton\"}', 7, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(405, '{\"fr\":\"Saint-Jean\", \"en\":\"Saint-Jean\"}', 7, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(406, '{\"fr\":\"Barrie\", \"en\":\"Barrie\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(407, '{\"fr\":\"Belleville\", \"en\":\"Belleville\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(408, '{\"fr\":\"Brampton\", \"en\":\"Brampton\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(409, '{\"fr\":\"Brant\", \"en\":\"Brant\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(410, '{\"fr\":\"Brantford\", \"en\":\"Brantford\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(411, '{\"fr\":\"Brockville\", \"en\":\"Brockville\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(412, '{\"fr\":\"Burlington\", \"en\":\"Burlington\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(413, '{\"fr\":\"Cambridge\", \"en\":\"Cambridge\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(414, '{\"fr\":\"Chatham-Kent\", \"en\":\"Chatham-Kent\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(415, '{\"fr\":\"Clarence-Rockland\", \"en\":\"Clarence-Rockland\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(416, '{\"fr\":\"Cornwall\", \"en\":\"Cornwall\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(417, '{\"fr\":\"Dryden\", \"en\":\"Dryden\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(418, '{\"fr\":\"Elliot Lake\", \"en\":\"Elliot Lake\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(419, '{\"fr\":\"Grand Sudbury\", \"en\":\"Grand Sudbury\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(420, '{\"fr\":\"Guelph\", \"en\":\"Guelph\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(421, '{\"fr\":\"Hamilton\", \"en\":\"Hamilton\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(422, '{\"fr\":\"Kawartha Lakes\", \"en\":\"Kawartha Lakes\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(423, '{\"fr\":\"Kenora\", \"en\":\"Kenora\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(424, '{\"fr\":\"Kingston\", \"en\":\"Kingston\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(425, '{\"fr\":\"Kitchener\", \"en\":\"Kitchener\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(426, '{\"fr\":\"London\", \"en\":\"London\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(427, '{\"fr\":\"Mississauga\", \"en\":\"Mississauga\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(428, '{\"fr\":\"Niagara Falls\", \"en\":\"Niagara Falls\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(429, '{\"fr\":\"Comté de Norfolk\", \"en\":\"Comté de Norfolk\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(430, '{\"fr\":\"North Bay\", \"en\":\"North Bay\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(431, '{\"fr\":\"Orillia\", \"en\":\"Orillia\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(432, '{\"fr\":\"Oshawa\", \"en\":\"Oshawa\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(433, '{\"fr\":\"Ottawa\", \"en\":\"Ottawa\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(434, '{\"fr\":\"Owen Sound\", \"en\":\"Owen Sound\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(435, '{\"fr\":\"Pembroke\", \"en\":\"Pembroke\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(436, '{\"fr\":\"Peterborough\", \"en\":\"Peterborough\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(437, '{\"fr\":\"Pickering\", \"en\":\"Pickering\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(438, '{\"fr\":\"Comté du Prince-Édouard\", \"en\":\"Comté du Prince-Édouard\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(439, '{\"fr\":\"Port Colborne\", \"en\":\"Port Colborne\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(440, '{\"fr\":\"Quinte West\", \"en\":\"Quinte West\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(441, '{\"fr\":\"Sarnia\", \"en\":\"Sarnia\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(442, '{\"fr\":\"Sault Ste. Marie\", \"en\":\"Sault Ste. Marie\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(443, '{\"fr\":\"St. Catharines\", \"en\":\"St. Catharines\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(444, '{\"fr\":\"St. Thomas\", \"en\":\"St. Thomas\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(445, '{\"fr\":\"Stratford\", \"en\":\"Stratford\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(446, '{\"fr\":\"Temiskaming Shores\", \"en\":\"Temiskaming Shores\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(447, '{\"fr\":\"Thorold\", \"en\":\"Thorold\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(448, '{\"fr\":\"Thunder Bay\", \"en\":\"Thunder Bay\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(449, '{\"fr\":\"Timmins\", \"en\":\"Timmins\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(450, '{\"fr\":\"Toronto\", \"en\":\"Toronto\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(451, '{\"fr\":\"Vaughan\", \"en\":\"Vaughan\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(452, '{\"fr\":\"Waterloo\", \"en\":\"Waterloo\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(453, '{\"fr\":\"Welland\", \"en\":\"Welland\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(454, '{\"fr\":\"Windsor\", \"en\":\"Windsor\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(455, '{\"fr\":\"Woodstock\", \"en\":\"Woodstock\"}', 2, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(456, '{\"fr\":\"Acton Vale\", \"en\":\"Acton Vale\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(457, '{\"fr\":\"Alma\", \"en\":\"Alma\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(458, '{\"fr\":\"Amos\", \"en\":\"Amos\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(459, '{\"fr\":\"Amqui\", \"en\":\"Amqui\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(460, '{\"fr\":\"Asbestos\", \"en\":\"Asbestos\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(461, '{\"fr\":\"Baie-Comeau\", \"en\":\"Baie-Comeau\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(462, '{\"fr\":\"Baie-Saint-Paul\", \"en\":\"Baie-Saint-Paul\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(463, '{\"fr\":\"Barkmere\", \"en\":\"Barkmere\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(464, '{\"fr\":\"Beaconsfield\", \"en\":\"Beaconsfield\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(465, '{\"fr\":\"Beauceville\", \"en\":\"Beauceville\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(466, '{\"fr\":\"Beauharnois\", \"en\":\"Beauharnois\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(467, '{\"fr\":\"Beaupré\", \"en\":\"Beaupré\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(468, '{\"fr\":\"Bécancour\", \"en\":\"Bécancour\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(469, '{\"fr\":\"Bedford\", \"en\":\"Bedford\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(470, '{\"fr\":\"Belleterre\", \"en\":\"Belleterre\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(471, '{\"fr\":\"Belœil\", \"en\":\"Belœil\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(472, '{\"fr\":\"Berthierville\", \"en\":\"Berthierville\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(473, '{\"fr\":\"Blainville\", \"en\":\"Blainville\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(474, '{\"fr\":\"Bois-des-Filion\", \"en\":\"Bois-des-Filion\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(475, '{\"fr\":\"Boisbriand\", \"en\":\"Boisbriand\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33');
INSERT INTO `villes` (`id`, `nom`, `province_id`, `createdAt`, `updatedAt`) VALUES
(476, '{\"fr\":\"Bonaventure\", \"en\":\"Bonaventure\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(477, '{\"fr\":\"Boucherville\", \"en\":\"Boucherville\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(478, '{\"fr\":\"Lac-Brome\", \"en\":\"Lac-Brome\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(479, '{\"fr\":\"Bromont\", \"en\":\"Bromont\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(480, '{\"fr\":\"Brossard\", \"en\":\"Brossard\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(481, '{\"fr\":\"Brownsburg-Chatham\", \"en\":\"Brownsburg-Chatham\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(482, '{\"fr\":\"Cabano\", \"en\":\"Cabano\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(483, '{\"fr\":\"Candiac\", \"en\":\"Candiac\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(484, '{\"fr\":\"Cap-Chat\", \"en\":\"Cap-Chat\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(485, '{\"fr\":\"Cap-Santé\", \"en\":\"Cap-Santé\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(486, '{\"fr\":\"Carignan\", \"en\":\"Carignan\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(487, '{\"fr\":\"Carleton-sur-Mer\", \"en\":\"Carleton-sur-Mer\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(488, '{\"fr\":\"Causapscal\", \"en\":\"Causapscal\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(489, '{\"fr\":\"Chambly\", \"en\":\"Chambly\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(490, '{\"fr\":\"Chandler\", \"en\":\"Chandler\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(491, '{\"fr\":\"Chapais\", \"en\":\"Chapais\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(492, '{\"fr\":\"Charlemagne\", \"en\":\"Charlemagne\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(493, '{\"fr\":\"ChateauguayChâteauguay\", \"en\":\"ChateauguayChâteauguay\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(494, '{\"fr\":\"Chateau-RicherChâteau-Richer\", \"en\":\"Chateau-RicherChâteau-Richer\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(495, '{\"fr\":\"Chibougamau\", \"en\":\"Chibougamau\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(496, '{\"fr\":\"Clermont\", \"en\":\"Clermont\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(497, '{\"fr\":\"Coaticook\", \"en\":\"Coaticook\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(498, '{\"fr\":\"Contrecœur\", \"en\":\"Contrecœur\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(499, '{\"fr\":\"Cookshire-Eaton\", \"en\":\"Cookshire-Eaton\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(500, '{\"fr\":\"Cote-Saint-LucCôte-Saint-Luc\", \"en\":\"Cote-Saint-LucCôte-Saint-Luc\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(501, '{\"fr\":\"Cowansville\", \"en\":\"Cowansville\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(502, '{\"fr\":\"Danville\", \"en\":\"Danville\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(503, '{\"fr\":\"Daveluyville\", \"en\":\"Daveluyville\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(504, '{\"fr\":\"DegelisDégelis\", \"en\":\"DegelisDégelis\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(505, '{\"fr\":\"Delson\", \"en\":\"Delson\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(506, '{\"fr\":\"Desbiens\", \"en\":\"Desbiens\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(507, '{\"fr\":\"Deux-Montagnes\", \"en\":\"Deux-Montagnes\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(508, '{\"fr\":\"Disraeli\", \"en\":\"Disraeli\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(509, '{\"fr\":\"Dolbeau-Mistassini\", \"en\":\"Dolbeau-Mistassini\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(510, '{\"fr\":\"Dollard-des-Ormeaux\", \"en\":\"Dollard-des-Ormeaux\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(511, '{\"fr\":\"Donnacona\", \"en\":\"Donnacona\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(512, '{\"fr\":\"Dorval\", \"en\":\"Dorval\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(513, '{\"fr\":\"Drummondville\", \"en\":\"Drummondville\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(514, '{\"fr\":\"Dunham\", \"en\":\"Dunham\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(515, '{\"fr\":\"Duparquet\", \"en\":\"Duparquet\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(516, '{\"fr\":\"East Angus\", \"en\":\"East Angus\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(517, '{\"fr\":\"Estérel\", \"en\":\"Estérel\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(518, '{\"fr\":\"Farnham\", \"en\":\"Farnham\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(519, '{\"fr\":\"Fermont\", \"en\":\"Fermont\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(520, '{\"fr\":\"Forestville\", \"en\":\"Forestville\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(521, '{\"fr\":\"Fossambault-sur-le-Lac\", \"en\":\"Fossambault-sur-le-Lac\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(522, '{\"fr\":\"Gaspé\", \"en\":\"Gaspé\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(523, '{\"fr\":\"Gatineau\", \"en\":\"Gatineau\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(524, '{\"fr\":\"Gracefield\", \"en\":\"Gracefield\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(525, '{\"fr\":\"Granby\", \"en\":\"Granby\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(526, '{\"fr\":\"Grande-Rivière\", \"en\":\"Grande-Rivière\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(527, '{\"fr\":\"Hampstead\", \"en\":\"Hampstead\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(528, '{\"fr\":\"Hudson\", \"en\":\"Hudson\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(529, '{\"fr\":\"Huntingdon\", \"en\":\"Huntingdon\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(530, '{\"fr\":\"Joliette\", \"en\":\"Joliette\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(531, '{\"fr\":\"Kingsey Falls\", \"en\":\"Kingsey Falls\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(532, '{\"fr\":\"Kirkland\", \"en\":\"Kirkland\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(533, '{\"fr\":\"Lac-Delage\", \"en\":\"Lac-Delage\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(534, '{\"fr\":\"Lac-Mégantic\", \"en\":\"Lac-Mégantic\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(535, '{\"fr\":\"Lac-Saint-Joseph\", \"en\":\"Lac-Saint-Joseph\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(536, '{\"fr\":\"Lac-Sergent\", \"en\":\"Lac-Sergent\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(537, '{\"fr\":\"Lachute\", \"en\":\"Lachute\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(538, '{\"fr\":\"Laval\", \"en\":\"Laval\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(539, '{\"fr\":\"Lavaltrie\", \"en\":\"Lavaltrie\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(540, '{\"fr\":\"Lebel-sur-Quévillon\", \"en\":\"Lebel-sur-Quévillon\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(541, '{\"fr\":\"LeryLéry\", \"en\":\"LeryLéry\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(542, '{\"fr\":\"LevisLévis\", \"en\":\"LevisLévis\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(543, '{\"fr\":\"Longueuil\", \"en\":\"Longueuil\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(544, '{\"fr\":\"Lorraine\", \"en\":\"Lorraine\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(545, '{\"fr\":\"Louiseville\", \"en\":\"Louiseville\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(546, '{\"fr\":\"Macamic\", \"en\":\"Macamic\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(547, '{\"fr\":\"Magog\", \"en\":\"Magog\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(548, '{\"fr\":\"Malartic\", \"en\":\"Malartic\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(549, '{\"fr\":\"MalbaieLa Malbaie\", \"en\":\"MalbaieLa Malbaie\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(550, '{\"fr\":\"Maniwaki\", \"en\":\"Maniwaki\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(551, '{\"fr\":\"Marieville\", \"en\":\"Marieville\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(552, '{\"fr\":\"Mascouche\", \"en\":\"Mascouche\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(553, '{\"fr\":\"Matagami\", \"en\":\"Matagami\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(554, '{\"fr\":\"Matane\", \"en\":\"Matane\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(555, '{\"fr\":\"Mercier\", \"en\":\"Mercier\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(556, '{\"fr\":\"MetabetchouanMétabetchouan–Lac-à-la-Croix\", \"en\":\"MetabetchouanMétabetchouan–Lac-à-la-Croix\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(557, '{\"fr\":\"MetisMétis-sur-Mer\", \"en\":\"MetisMétis-sur-Mer\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(558, '{\"fr\":\"Mirabel (Québec)\", \"en\":\"Mirabel (Québec)\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(559, '{\"fr\":\"Mont-Joli\", \"en\":\"Mont-Joli\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(560, '{\"fr\":\"Mont-Laurier\", \"en\":\"Mont-Laurier\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(561, '{\"fr\":\"Mont-Saint-Hilaire\", \"en\":\"Mont-Saint-Hilaire\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(562, '{\"fr\":\"Mont-Tremblant\", \"en\":\"Mont-Tremblant\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(563, '{\"fr\":\"Montmagny\", \"en\":\"Montmagny\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(564, '{\"fr\":\"Montréal\", \"en\":\"Montréal\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(565, '{\"fr\":\"Montréal-Est\", \"en\":\"Montréal-Est\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33'),
(566, '{\"fr\":\"Montréal-Ouest\", \"en\":\"Montréal-Ouest\"}', 1, '2024-06-26 12:33:38', '2024-06-25 13:38:33');

-- --------------------------------------------------------

--
-- Structure de la table `voitures`
--

CREATE TABLE `voitures` (
  `id` int(11) NOT NULL,
  `date` int(11) DEFAULT NULL,
  `description` longtext,
  `prix` double DEFAULT NULL,
  `commande_id` int(12) DEFAULT NULL,
  `modele_id` int(11) NOT NULL,
  `transmission_id` int(11) NOT NULL,
  `motopropulseur_id` int(11) NOT NULL,
  `carburant_id` int(11) NOT NULL,
  `corp_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `voitures`
--

INSERT INTO `voitures` (`id`, `date`, `description`, `prix`, `commande_id`, `modele_id`, `transmission_id`, `motopropulseur_id`, `carburant_id`, `corp_id`, `createdAt`, `updatedAt`) VALUES
(44, 1976, '{\"en\":\"rrrrrr\",\"fr\":\"ttttt\"}', 33333, 1, 1, 5, 3, 1, 1, '2024-07-09 17:46:34', '2024-07-09 17:46:34'),
(45, 2019, '{\"en\":\"adadsa\",\"fr\":\"tyrtyr\"}', 2222, NULL, 1, 2, 10, 2, 2, '2024-07-09 19:18:13', '2024-07-09 19:18:13'),
(46, 2002, '{\"en\":\"asf\",\"fr\":\"asdf\"}', 2222, NULL, 2, 6, 8, 2, 4, '2024-07-16 15:27:07', '2024-07-16 15:27:07'),
(47, 2022, '{\"en\":\"asdfasdf\",\"fr\":\"asdfasdf\"}', 2220, NULL, 1, 5, 1, 1, 1, '2024-07-16 15:33:34', '2024-07-16 15:33:34'),
(48, 2022, '{\"en\":\"asdfas\",\"fr\":\"asdf\"}', 30, NULL, 4, 5, 1, 1, 1, '2024-07-16 15:34:10', '2024-07-16 15:34:10'),
(49, 2022, '{\"en\":\"asdf\",\"fr\":\"asdf\"}', 444, NULL, 1, 1, 2, 7, 3, '2024-07-16 16:04:18', '2024-07-16 16:04:18');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `carburants`
--
ALTER TABLE `carburants`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `commandes`
--
ALTER TABLE `commandes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mode_paiement_id` (`mode_paiement_id`),
  ADD KEY `expdedition_id` (`expedition_id`),
  ADD KEY `utilisateur_id` (`utilisateur_id`),
  ADD KEY `statut_id` (`statut_id`);

--
-- Index pour la table `commande_has_taxes`
--
ALTER TABLE `commande_has_taxes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `taxe_id` (`taxe_id`),
  ADD KEY `commande_id` (`commande_id`);

--
-- Index pour la table `constructeurs`
--
ALTER TABLE `constructeurs`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `corps`
--
ALTER TABLE `corps`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `expeditions`
--
ALTER TABLE `expeditions`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `voiture_id` (`voiture_id`);

--
-- Index pour la table `journals`
--
ALTER TABLE `journals`
  ADD PRIMARY KEY (`id`),
  ADD KEY `utilisateur_id` (`utilisateur_id`);

--
-- Index pour la table `modeles`
--
ALTER TABLE `modeles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `constructeur_id` (`constructeur_id`);

--
-- Index pour la table `mode_paiements`
--
ALTER TABLE `mode_paiements`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `motopropulseurs`
--
ALTER TABLE `motopropulseurs`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `privileges`
--
ALTER TABLE `privileges`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `provinces`
--
ALTER TABLE `provinces`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `statuts`
--
ALTER TABLE `statuts`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `taxes`
--
ALTER TABLE `taxes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `province_id` (`province_id`);

--
-- Index pour la table `transmissions`
--
ALTER TABLE `transmissions`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `privilege_id` (`privilege_id`),
  ADD KEY `utilisateurs_ibfk_2` (`ville_id`);

--
-- Index pour la table `villes`
--
ALTER TABLE `villes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `province_id` (`province_id`);

--
-- Index pour la table `voitures`
--
ALTER TABLE `voitures`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `commande_id` (`commande_id`),
  ADD KEY `model_id` (`modele_id`),
  ADD KEY `transmission_id` (`transmission_id`),
  ADD KEY `motopropulseur_id` (`motopropulseur_id`),
  ADD KEY `carburant_id` (`carburant_id`),
  ADD KEY `corp_id` (`corp_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `carburants`
--
ALTER TABLE `carburants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `commandes`
--
ALTER TABLE `commandes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `commande_has_taxes`
--
ALTER TABLE `commande_has_taxes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `constructeurs`
--
ALTER TABLE `constructeurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `corps`
--
ALTER TABLE `corps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `expeditions`
--
ALTER TABLE `expeditions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT pour la table `journals`
--
ALTER TABLE `journals`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `modeles`
--
ALTER TABLE `modeles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `mode_paiements`
--
ALTER TABLE `mode_paiements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `motopropulseurs`
--
ALTER TABLE `motopropulseurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT pour la table `privileges`
--
ALTER TABLE `privileges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `provinces`
--
ALTER TABLE `provinces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `statuts`
--
ALTER TABLE `statuts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `taxes`
--
ALTER TABLE `taxes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `transmissions`
--
ALTER TABLE `transmissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `villes`
--
ALTER TABLE `villes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=567;

--
-- AUTO_INCREMENT pour la table `voitures`
--
ALTER TABLE `voitures`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commandes`
--
ALTER TABLE `commandes`
  ADD CONSTRAINT `commandes_ibfk_1` FOREIGN KEY (`mode_paiement_id`) REFERENCES `mode_paiements` (`id`),
  ADD CONSTRAINT `commandes_ibfk_2` FOREIGN KEY (`expedition_id`) REFERENCES `expeditions` (`id`),
  ADD CONSTRAINT `commandes_ibfk_3` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs` (`id`),
  ADD CONSTRAINT `commandes_ibfk_4` FOREIGN KEY (`statut_id`) REFERENCES `statuts` (`id`);

--
-- Contraintes pour la table `commande_has_taxes`
--
ALTER TABLE `commande_has_taxes`
  ADD CONSTRAINT `commande_has_taxes_ibfk_1` FOREIGN KEY (`taxe_id`) REFERENCES `taxes` (`id`),
  ADD CONSTRAINT `commande_has_taxes_ibfk_2` FOREIGN KEY (`commande_id`) REFERENCES `commandes` (`id`);

--
-- Contraintes pour la table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`voiture_id`) REFERENCES `voitures` (`id`);

--
-- Contraintes pour la table `journals`
--
ALTER TABLE `journals`
  ADD CONSTRAINT `journals_ibfk_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Contraintes pour la table `modeles`
--
ALTER TABLE `modeles`
  ADD CONSTRAINT `modeles_ibfk_1` FOREIGN KEY (`constructeur_id`) REFERENCES `constructeurs` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Contraintes pour la table `taxes`
--
ALTER TABLE `taxes`
  ADD CONSTRAINT `taxes_ibfk_1` FOREIGN KEY (`province_id`) REFERENCES `provinces` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Contraintes pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD CONSTRAINT `utilisateurs_ibfk_1` FOREIGN KEY (`privilege_id`) REFERENCES `privileges` (`id`),
  ADD CONSTRAINT `utilisateurs_ibfk_2` FOREIGN KEY (`ville_id`) REFERENCES `villes` (`id`);

--
-- Contraintes pour la table `villes`
--
ALTER TABLE `villes`
  ADD CONSTRAINT `villes_ibfk_1` FOREIGN KEY (`province_id`) REFERENCES `provinces` (`id`);

--
-- Contraintes pour la table `voitures`
--
ALTER TABLE `voitures`
  ADD CONSTRAINT `voitures_ibfk_1` FOREIGN KEY (`modele_id`) REFERENCES `modeles` (`id`),
  ADD CONSTRAINT `voitures_ibfk_2` FOREIGN KEY (`transmission_id`) REFERENCES `transmissions` (`id`),
  ADD CONSTRAINT `voitures_ibfk_3` FOREIGN KEY (`motopropulseur_id`) REFERENCES `motopropulseurs` (`id`),
  ADD CONSTRAINT `voitures_ibfk_4` FOREIGN KEY (`carburant_id`) REFERENCES `carburants` (`id`),
  ADD CONSTRAINT `voitures_ibfk_5` FOREIGN KEY (`corp_id`) REFERENCES `corps` (`id`),
  ADD CONSTRAINT `voitures_ibfk_6` FOREIGN KEY (`commande_id`) REFERENCES `commandes` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
