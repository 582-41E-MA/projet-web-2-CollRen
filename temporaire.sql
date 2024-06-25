-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : sam. 22 juin 2024 à 15:18
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
-- Base de données : `vehiculeOccasion`
--

-- --------------------------------------------------------

--
-- Structure de la table `carburants`
--

CREATE TABLE `carburants` (
  `id` int(11) NOT NULL,
  `type` longtext,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `carburants`
--

INSERT INTO `carburants` (`id`, `type`, `createdAt`, `updatedAt`) VALUES
(1, '{\"en\":\"Gaz\", \"fr\":\"Essence\"}', '2024-06-22 15:11:36', '2024-06-22 15:11:36'),
(2, '{\"en\":\"Electicity\", \"fr\":\"Electricité\"}', '2024-06-22 15:11:55', '2024-06-22 15:11:55'),
(3, '{\"en\":\"Diesel\", \"fr\":\"Diesel\"}', '2024-06-22 15:12:17', '2024-06-22 15:12:17');

-- --------------------------------------------------------

--
-- Structure de la table `commandes`
--

CREATE TABLE `commandes` (
  `id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `prix` double DEFAULT NULL,
  `mode_paiement_id` int(11) DEFAULT NULL,
  `expdedition_id` int(11) DEFAULT NULL,
  `utilisateur_id` int(11) DEFAULT NULL,
  `statut_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `constructeurs`
--

CREATE TABLE `constructeurs` (
  `id` int(11) NOT NULL,
  `type` longtext,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `constructeurs`
--

INSERT INTO `constructeurs` (`id`, `type`, `createdAt`, `updatedAt`) VALUES
(1, '{\"en\":\"Chevrolet\", \"fr\":\"Chevrolet\"}', '2024-06-22 15:15:24', '2024-06-22 15:15:24');

-- --------------------------------------------------------

--
-- Structure de la table `corps`
--

CREATE TABLE `corps` (
  `id` int(11) NOT NULL,
  `type` longtext,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `corps`
--

INSERT INTO `corps` (`id`, `type`, `createdAt`, `updatedAt`) VALUES
(1, '{\"en\":\"4 Wheel Drive\", \"fr\":\"4 Roues Motrices\"}', '2024-06-22 15:13:05', '2024-06-22 15:13:05'),
(2, '{\"en\":\"Standard\", \"fr\":\"Standard\"}', '2024-06-22 15:13:35', '2024-06-22 15:13:35');

-- --------------------------------------------------------

--
-- Structure de la table `expeditions`
--

CREATE TABLE `expeditions` (
  `id` int(11) NOT NULL,
  `type` longtext,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `expeditions`
--

INSERT INTO `expeditions` (`id`, `type`, `createdAt`, `updatedAt`) VALUES
(1, '{\"en\":\"In Strore\", \"fr\":\"Ramassage\"}', '2024-06-22 15:14:07', '2024-06-22 15:14:07');

-- --------------------------------------------------------

--
-- Structure de la table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `est_principale` tinyint(4) DEFAULT NULL,
  `chemin` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `models`
--

CREATE TABLE `models` (
  `id` int(11) NOT NULL,
  `type` longtext,
  `constructeur_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `models`
--

INSERT INTO `models` (`id`, `type`, `constructeur_id`, `createdAt`, `updatedAt`) VALUES
(1, '{\"en\":\"Sylverado\", \"fr\":\"Sylverado\"}', 1, '2024-06-22 15:15:41', '2024-06-22 15:15:41');

-- --------------------------------------------------------

--
-- Structure de la table `mode_paiements`
--

CREATE TABLE `mode_paiements` (
  `id` int(11) NOT NULL,
  `type` longtext,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `mode_paiements`
--

INSERT INTO `mode_paiements` (`id`, `type`, `createdAt`, `updatedAt`) VALUES
(1, '{\"en\":\"Visa\", \"fr\":\"Visa\"}', '2024-06-22 15:10:11', '2024-06-22 15:10:11');

-- --------------------------------------------------------

--
-- Structure de la table `motopropulseurs`
--

CREATE TABLE `motopropulseurs` (
  `id` int(11) NOT NULL,
  `type` longtext,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `motopropulseurs`
--

INSERT INTO `motopropulseurs` (`id`, `type`, `createdAt`, `updatedAt`) VALUES
(1, '{\"en\":\"Traction\", \"fr\":\"Traction\"}', '2024-06-22 15:16:14', '2024-06-22 15:16:14');

-- --------------------------------------------------------

--
-- Structure de la table `privileges`
--

CREATE TABLE `privileges` (
  `id` int(11) NOT NULL,
  `type` longtext,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `privileges`
--

INSERT INTO `privileges` (`id`, `type`, `createdAt`, `updatedAt`) VALUES
(1, '{\"en\":\"Manager\", \"fr\":\"Administrateur\"}', '2024-06-22 15:16:33', '2024-06-22 15:16:33'),
(2, '{\"en\":\"Client\", \"fr\":\"Client\"}', '2024-06-22 15:16:58', '2024-06-22 15:16:58'),
(3, '{\"en\":\"Employee\", \"fr\":\"Employer\"}', '2024-06-22 15:17:10', '2024-06-22 15:17:10');

-- --------------------------------------------------------

--
-- Structure de la table `provinces`
--

CREATE TABLE `provinces` (
  `id` int(11) NOT NULL,
  `nom` longtext,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `provinces`
--

INSERT INTO `provinces` (`nom`) VALUES
('{\"fr\":\"Québec\", \"en\":\"Quebec\"'),
('{\"en\":\"Ontario\", \"fr\":\"Ontario\"}'),
('{\"fr\":\"Alberta\", \"en\":\"Alberta\"}'),
('{\"fr\":\"Colombie-Britannique\", \"en\":\"Colombie-Britannique\"}'),
('{\"fr\":\"Île-du-Prince-Édouard\", \"en\":\"Île-du-Prince-Édouard\"}'),
('{\"fr\":\"Manitoba\", \"en\":\"Manitoba\"}'),
('{\"fr\":\"Nouveau-Brunswick\", \"en\":\"Nouveau-Brunswick\"}'),
('{\"fr\":\"Nouvelle-Écosse\", \"en\":\"Nouvelle-Écosse\"}'),
('{\"fr\":\"Nunavut\", \"en\":\"Nunavut\"}'),
('{\"fr\":\"Saskatchewan\", \"en\":\"Saskatchewan\"}'),
('{\"fr\":\"Terre-Neuve-et-Labrador\", \"en\":\"Terre-Neuve-et-Labrador\"}'),
('{\"fr\":\"Territoires du Nord-Ouest\", \"en\":\"Territoires du Nord-Ouest\"}'),
('{\"fr\":\"Yukon\", \"en\":\"Yukon\"}');

-- --------------------------------------------------------

--
-- Structure de la table `statuts`
--

CREATE TABLE `statuts` (
  `id` int(11) NOT NULL,
  `type` longtext,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `transmissions`
--

CREATE TABLE `transmissions` (
  `id` int(11) NOT NULL,
  `type` longtext,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

CREATE TABLE `utilisateurs` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `anniversaire` datetime DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `code_postal` varchar(255) DEFAULT NULL,
  `telephone` int(11) DEFAULT NULL,
  `cellulaire` int(11) DEFAULT NULL,
  `courriel` varchar(255) DEFAULT NULL,
  `nom_utilisateur` varchar(255) DEFAULT NULL,
  `mot_de_passe` varchar(255) DEFAULT NULL,
  `privilege_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `villes`
--

CREATE TABLE `villes` (
  `id` int(11) NOT NULL,
  `nom` longtext,
  `province_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `villes`
--

INSERT INTO `villes` (`nom`, `province_id`) VALUES
('{\"fr\":\"Abbotsford\", \"en\":\"Abbotsford\"}', 4),
('{\"fr\":\"Armstrong\", \"en\":\"Armstrong\"}', 4),
('{\"fr\":\"Burnaby\", \"en\":\"Burnaby\"}', 4),
('{\"fr\":\"Campbell River\", \"en\":\"Campbell River\"}', 4),
('{\"fr\":\"Castlegar\", \"en\":\"Castlegar\"}', 4),
('{\"fr\":\"Chilliwack\", \"en\":\"Chilliwack\"}', 4),
('{\"fr\":\"Cloverdale\", \"en\":\"Cloverdale\"}', 4),
('{\"fr\":\"Colwood\", \"en\":\"Colwood\"}', 4),
('{\"fr\":\"Coquitlam\", \"en\":\"Coquitlam\"}', 4),
('{\"fr\":\"Courtenay\", \"en\":\"Courtenay\"}', 4),
('{\"fr\":\"Cranbrook\", \"en\":\"Cranbrook\"}', 4),
('{\"fr\":\"Dawson Creek\", \"en\":\"Dawson Creek\"}', 4),
('{\"fr\":\"Duncan\", \"en\":\"Duncan\"}', 4),
('{\"fr\":\"Enderby\", \"en\":\"Enderby\"}', 4),
('{\"fr\":\"Fernie\", \"en\":\"Fernie\"}', 4),
('{\"fr\":\"Fort St. John\", \"en\":\"Fort St. John\"}', 4),
('{\"fr\":\"Grand Forks\", \"en\":\"Grand Forks\"}', 4),
('{\"fr\":\"Greenwood\", \"en\":\"Greenwood\"}', 4),
('{\"fr\":\"Kamloops\", \"en\":\"Kamloops\"}', 4),
('{\"fr\":\"Kelowna\", \"en\":\"Kelowna\"}', 4),
('{\"fr\":\"Kimberley\", \"en\":\"Kimberley\"}', 4),
('{\"fr\":\"Kitimat\", \"en\":\"Kitimat\"}', 4),
('{\"fr\":\"Langford\", \"en\":\"Langford\"}', 4),
('{\"fr\":\"Langley\", \"en\":\"Langley\"}', 4),
('{\"fr\":\"Merritt\", \"en\":\"Merritt\"}', 4),
('{\"fr\":\"Mission\", \"en\":\"Mission\"}', 4),
('{\"fr\":\"Nanaimo\", \"en\":\"Nanaimo\"}', 4),
('{\"fr\":\"Nelson\", \"en\":\"Nelson\"}', 4),
('{\"fr\":\"New Westminster\", \"en\":\"New Westminster\"}', 4),
('{\"fr\":\"North Vancouver\", \"en\":\"North Vancouver\"}', 4),
('{\"fr\":\"Parksville\", \"en\":\"Parksville\"}', 4),
('{\"fr\":\"Penticton\", \"en\":\"Penticton\"}', 4),
('{\"fr\":\"Pitt Meadows\", \"en\":\"Pitt Meadows\"}', 4),
('{\"fr\":\"Port Alberni\", \"en\":\"Port Alberni\"}', 4),
('{\"fr\":\"Port Coquitlam\", \"en\":\"Port Coquitlam\"}', 4),
('{\"fr\":\"Port Moody\", \"en\":\"Port Moody\"}', 4),
('{\"fr\":\"Powell River\", \"en\":\"Powell River\"}', 4),
('{\"fr\":\"Prince George\", \"en\":\"Prince George\"}', 4),
('{\"fr\":\"Prince Rupert\", \"en\":\"Prince Rupert\"}', 4),
('{\"fr\":\"Quesnel\", \"en\":\"Quesnel\"}', 4),
('{\"fr\":\"Revelstoke\", \"en\":\"Revelstoke\"}', 4),
('{\"fr\":\"Richmond\", \"en\":\"Richmond\"}', 4),
('{\"fr\":\"Rossland\", \"en\":\"Rossland\"}', 4),
('{\"fr\":\"Salmon Arm\", \"en\":\"Salmon Arm\"}', 4),
('{\"fr\":\"Surrey\", \"en\":\"Surrey\"}', 4),
('{\"fr\":\"Terrace\", \"en\":\"Terrace\"}', 4),
('{\"fr\":\"Trail\", \"en\":\"Trail\"}', 4),
('{\"fr\":\"Vancouver\", \"en\":\"Vancouver\"}', 4),
('{\"fr\":\"Vernon\", \"en\":\"Vernon\"}', 4),
('{\"fr\":\"Victoria\", \"en\":\"Victoria\"}', 4),
('{\"fr\":\"White Rock\", \"en\":\"White Rock\"}', 4),
('{\"fr\":\"Williams Lake\", \"en\":\"Williams Lake\"}', 4),
('{\"fr\":\"Brandon\", \"en\":\"Brandon\"}', 6),
('{\"fr\":\"Dauphin\", \"en\":\"Dauphin\"}', 6),
('{\"fr\":\"Flin Flon\", \"en\":\"Flin Flon\"}', 6),
('{\"fr\":\"Portage la Prairie\", \"en\":\"Portage la Prairie\"}', 6),
('{\"fr\":\"Selkirk\", \"en\":\"Selkirk\"}', 6),
('{\"fr\":\"Steinbach\", \"en\":\"Steinbach\"}', 6),
('{\"fr\":\"Thompson\", \"en\":\"Thompson\"}', 6),
('{\"fr\":\"Winkler\", \"en\":\"Winkler\"}', 6),
('{\"fr\":\"Winnipeg\", \"en\":\"Winnipeg\"}', 6),
('{\"fr\":\"Bathurst\", \"en\":\"Bathurst\"}', 7),
('{\"fr\":\"Campbellton\", \"en\":\"Campbellton\"}', 7),
('{\"fr\":\"Dieppe\", \"en\":\"Dieppe\"}', 7),
('{\"fr\":\"Edmundston\", \"en\":\"Edmundston\"}', 7),
('{\"fr\":\"Elsipogtog\", \"en\":\"Elsipogtog\"}', 7),
('{\"fr\":\"Fredericton\", \"en\":\"Fredericton\"}', 7),
('{\"fr\":\"Miramichi\", \"en\":\"Miramichi\"}', 7),
('{\"fr\":\"Moncton\", \"en\":\"Moncton\"}', 7),
('{\"fr\":\"Saint-Jean\", \"en\":\"Saint-Jean\"}', 7),
('{\"fr\":\"Barrie\", \"en\":\"Barrie\"}', 2),
('{\"fr\":\"Belleville\", \"en\":\"Belleville\"}', 2),
('{\"fr\":\"Brampton\", \"en\":\"Brampton\"}', 2),
('{\"fr\":\"Brant\", \"en\":\"Brant\"}', 2),
('{\"fr\":\"Brantford\", \"en\":\"Brantford\"}', 2),
('{\"fr\":\"Brockville\", \"en\":\"Brockville\"}', 2),
('{\"fr\":\"Burlington\", \"en\":\"Burlington\"}', 2),
('{\"fr\":\"Cambridge\", \"en\":\"Cambridge\"}', 2),
('{\"fr\":\"Chatham-Kent\", \"en\":\"Chatham-Kent\"}', 2),
('{\"fr\":\"Clarence-Rockland\", \"en\":\"Clarence-Rockland\"}', 2),
('{\"fr\":\"Cornwall\", \"en\":\"Cornwall\"}', 2),
('{\"fr\":\"Dryden\", \"en\":\"Dryden\"}', 2),
('{\"fr\":\"Elliot Lake\", \"en\":\"Elliot Lake\"}', 2),
('{\"fr\":\"Grand Sudbury\", \"en\":\"Grand Sudbury\"}', 2),
('{\"fr\":\"Guelph\", \"en\":\"Guelph\"}', 2),
('{\"fr\":\"Hamilton\", \"en\":\"Hamilton\"}', 2),
('{\"fr\":\"Kawartha Lakes\", \"en\":\"Kawartha Lakes\"}', 2),
('{\"fr\":\"Kenora\", \"en\":\"Kenora\"}', 2),
('{\"fr\":\"Kingston\", \"en\":\"Kingston\"}', 2),
('{\"fr\":\"Kitchener\", \"en\":\"Kitchener\"}', 2),
('{\"fr\":\"London\", \"en\":\"London\"}', 2),
('{\"fr\":\"Mississauga\", \"en\":\"Mississauga\"}', 2),
('{\"fr\":\"Niagara Falls\", \"en\":\"Niagara Falls\"}', 2),
('{\"fr\":\"Comté de Norfolk\", \"en\":\"Comté de Norfolk\"}', 2),
('{\"fr\":\"North Bay\", \"en\":\"North Bay\"}', 2),
('{\"fr\":\"Orillia\", \"en\":\"Orillia\"}', 2),
('{\"fr\":\"Oshawa\", \"en\":\"Oshawa\"}', 2),
('{\"fr\":\"Ottawa\", \"en\":\"Ottawa\"}', 2),
('{\"fr\":\"Owen Sound\", \"en\":\"Owen Sound\"}', 2),
('{\"fr\":\"Pembroke\", \"en\":\"Pembroke\"}', 2),
('{\"fr\":\"Peterborough\", \"en\":\"Peterborough\"}', 2),
('{\"fr\":\"Pickering\", \"en\":\"Pickering\"}', 2),
('{\"fr\":\"Comté du Prince-Édouard\", \"en\":\"Comté du Prince-Édouard\"}', 2),
('{\"fr\":\"Port Colborne\", \"en\":\"Port Colborne\"}', 2),
('{\"fr\":\"Quinte West\", \"en\":\"Quinte West\"}', 2),
('{\"fr\":\"Sarnia\", \"en\":\"Sarnia\"}', 2),
('{\"fr\":\"Sault Ste. Marie\", \"en\":\"Sault Ste. Marie\"}', 2),
('{\"fr\":\"St. Catharines\", \"en\":\"St. Catharines\"}', 2),
('{\"fr\":\"St. Thomas\", \"en\":\"St. Thomas\"}', 2),
('{\"fr\":\"Stratford\", \"en\":\"Stratford\"}', 2),
('{\"fr\":\"Temiskaming Shores\", \"en\":\"Temiskaming Shores\"}', 2),
('{\"fr\":\"Thorold\", \"en\":\"Thorold\"}', 2),
('{\"fr\":\"Thunder Bay\", \"en\":\"Thunder Bay\"}', 2),
('{\"fr\":\"Timmins\", \"en\":\"Timmins\"}', 2),
('{\"fr\":\"Toronto\", \"en\":\"Toronto\"}', 2),
('{\"fr\":\"Vaughan\", \"en\":\"Vaughan\"}', 2),
('{\"fr\":\"Waterloo\", \"en\":\"Waterloo\"}', 2),
('{\"fr\":\"Welland\", \"en\":\"Welland\"}', 2),
('{\"fr\":\"Windsor\", \"en\":\"Windsor\"}', 2),
('{\"fr\":\"Woodstock\", \"en\":\"Woodstock\"}', 2),
('{\"fr\":\"Acton Vale\", \"en\":\"Acton Vale\"}', 1),
('{\"fr\":\"Alma\", \"en\":\"Alma\"}', 1),
('{\"fr\":\"Amos\", \"en\":\"Amos\"}', 1),
('{\"fr\":\"Amqui\", \"en\":\"Amqui\"}', 1),
('{\"fr\":\"Asbestos\", \"en\":\"Asbestos\"}', 1),
('{\"fr\":\"Baie-Comeau\", \"en\":\"Baie-Comeau\"}', 1),
('{\"fr\":\"Baie-Saint-Paul\", \"en\":\"Baie-Saint-Paul\"}', 1),
('{\"fr\":\"Barkmere\", \"en\":\"Barkmere\"}', 1),
('{\"fr\":\"Beaconsfield\", \"en\":\"Beaconsfield\"}', 1),
('{\"fr\":\"Beauceville\", \"en\":\"Beauceville\"}', 1),
('{\"fr\":\"Beauharnois\", \"en\":\"Beauharnois\"}', 1),
('{\"fr\":\"Beaupré\", \"en\":\"Beaupré\"}', 1),
('{\"fr\":\"Bécancour\", \"en\":\"Bécancour\"}', 1),
('{\"fr\":\"Bedford\", \"en\":\"Bedford\"}', 1),
('{\"fr\":\"Belleterre\", \"en\":\"Belleterre\"}', 1),
('{\"fr\":\"Belœil\", \"en\":\"Belœil\"}', 1),
('{\"fr\":\"Berthierville\", \"en\":\"Berthierville\"}', 1),
('{\"fr\":\"Blainville\", \"en\":\"Blainville\"}', 1),
('{\"fr\":\"Bois-des-Filion\", \"en\":\"Bois-des-Filion\"}', 1),
('{\"fr\":\"Boisbriand\", \"en\":\"Boisbriand\"}', 1),
('{\"fr\":\"Bonaventure\", \"en\":\"Bonaventure\"}', 1),
('{\"fr\":\"Boucherville\", \"en\":\"Boucherville\"}', 1),
('{\"fr\":\"Lac-Brome\", \"en\":\"Lac-Brome\"}', 1),
('{\"fr\":\"Bromont\", \"en\":\"Bromont\"}', 1),
('{\"fr\":\"Brossard\", \"en\":\"Brossard\"}', 1),
('{\"fr\":\"Brownsburg-Chatham\", \"en\":\"Brownsburg-Chatham\"}', 1),
('{\"fr\":\"Cabano\", \"en\":\"Cabano\"}', 1),
('{\"fr\":\"Candiac\", \"en\":\"Candiac\"}', 1),
('{\"fr\":\"Cap-Chat\", \"en\":\"Cap-Chat\"}', 1),
('{\"fr\":\"Cap-Santé\", \"en\":\"Cap-Santé\"}', 1),
('{\"fr\":\"Carignan\", \"en\":\"Carignan\"}', 1),
('{\"fr\":\"Carleton-sur-Mer\", \"en\":\"Carleton-sur-Mer\"}', 1),
('{\"fr\":\"Causapscal\", \"en\":\"Causapscal\"}', 1),
('{\"fr\":\"Chambly\", \"en\":\"Chambly\"}', 1),
('{\"fr\":\"Chandler\", \"en\":\"Chandler\"}', 1),
('{\"fr\":\"Chapais\", \"en\":\"Chapais\"}', 1),
('{\"fr\":\"Charlemagne\", \"en\":\"Charlemagne\"}', 1),
('{\"fr\":\"ChateauguayChâteauguay\", \"en\":\"ChateauguayChâteauguay\"}', 1),
('{\"fr\":\"Chateau-RicherChâteau-Richer\", \"en\":\"Chateau-RicherChâteau-Richer\"}', 1),
('{\"fr\":\"Chibougamau\", \"en\":\"Chibougamau\"}', 1),
('{\"fr\":\"Clermont\", \"en\":\"Clermont\"}', 1),
('{\"fr\":\"Coaticook\", \"en\":\"Coaticook\"}', 1),
('{\"fr\":\"Contrecœur\", \"en\":\"Contrecœur\"}', 1),
('{\"fr\":\"Cookshire-Eaton\", \"en\":\"Cookshire-Eaton\"}', 1),
('{\"fr\":\"Cote-Saint-LucCôte-Saint-Luc\", \"en\":\"Cote-Saint-LucCôte-Saint-Luc\"}', 1),
('{\"fr\":\"Cowansville\", \"en\":\"Cowansville\"}', 1),
('{\"fr\":\"Danville\", \"en\":\"Danville\"}', 1),
('{\"fr\":\"Daveluyville\", \"en\":\"Daveluyville\"}', 1),
('{\"fr\":\"DegelisDégelis\", \"en\":\"DegelisDégelis\"}', 1),
('{\"fr\":\"Delson\", \"en\":\"Delson\"}', 1),
('{\"fr\":\"Desbiens\", \"en\":\"Desbiens\"}', 1),
('{\"fr\":\"Deux-Montagnes\", \"en\":\"Deux-Montagnes\"}', 1),
('{\"fr\":\"Disraeli\", \"en\":\"Disraeli\"}', 1),
('{\"fr\":\"Dolbeau-Mistassini\", \"en\":\"Dolbeau-Mistassini\"}', 1),
('{\"fr\":\"Dollard-des-Ormeaux\", \"en\":\"Dollard-des-Ormeaux\"}', 1),
('{\"fr\":\"Donnacona\", \"en\":\"Donnacona\"}', 1),
('{\"fr\":\"Dorval\", \"en\":\"Dorval\"}', 1),
('{\"fr\":\"Drummondville\", \"en\":\"Drummondville\"}', 1),
('{\"fr\":\"Dunham\", \"en\":\"Dunham\"}', 1),
('{\"fr\":\"Duparquet\", \"en\":\"Duparquet\"}', 1),
('{\"fr\":\"East Angus\", \"en\":\"East Angus\"}', 1),
('{\"fr\":\"Estérel\", \"en\":\"Estérel\"}', 1),
('{\"fr\":\"Farnham\", \"en\":\"Farnham\"}', 1),
('{\"fr\":\"Fermont\", \"en\":\"Fermont\"}', 1),
('{\"fr\":\"Forestville\", \"en\":\"Forestville\"}', 1),
('{\"fr\":\"Fossambault-sur-le-Lac\", \"en\":\"Fossambault-sur-le-Lac\"}', 1),
('{\"fr\":\"Gaspé\", \"en\":\"Gaspé\"}', 1),
('{\"fr\":\"Gatineau\", \"en\":\"Gatineau\"}', 1),
('{\"fr\":\"Gracefield\", \"en\":\"Gracefield\"}', 1),
('{\"fr\":\"Granby\", \"en\":\"Granby\"}', 1),
('{\"fr\":\"Grande-Rivière\", \"en\":\"Grande-Rivière\"}', 1),
('{\"fr\":\"Hampstead\", \"en\":\"Hampstead\"}', 1),
('{\"fr\":\"Hudson\", \"en\":\"Hudson\"}', 1),
('{\"fr\":\"Huntingdon\", \"en\":\"Huntingdon\"}', 1),
('{\"fr\":\"Joliette\", \"en\":\"Joliette\"}', 1),
('{\"fr\":\"Kingsey Falls\", \"en\":\"Kingsey Falls\"}', 1),
('{\"fr\":\"Kirkland\", \"en\":\"Kirkland\"}', 1),
('{\"fr\":\"Lac-Delage\", \"en\":\"Lac-Delage\"}', 1),
('{\"fr\":\"Lac-Mégantic\", \"en\":\"Lac-Mégantic\"}', 1),
('{\"fr\":\"Lac-Saint-Joseph\", \"en\":\"Lac-Saint-Joseph\"}', 1),
('{\"fr\":\"Lac-Sergent\", \"en\":\"Lac-Sergent\"}', 1),
('{\"fr\":\"Lachute\", \"en\":\"Lachute\"}', 1),
('{\"fr\":\"Laval\", \"en\":\"Laval\"}', 1),
('{\"fr\":\"Lavaltrie\", \"en\":\"Lavaltrie\"}', 1),
('{\"fr\":\"Lebel-sur-Quévillon\", \"en\":\"Lebel-sur-Quévillon\"}', 1),
('{\"fr\":\"LeryLéry\", \"en\":\"LeryLéry\"}', 1),
('{\"fr\":\"LevisLévis\", \"en\":\"LevisLévis\"}', 1),
('{\"fr\":\"Longueuil\", \"en\":\"Longueuil\"}', 1),
('{\"fr\":\"Lorraine\", \"en\":\"Lorraine\"}', 1),
('{\"fr\":\"Louiseville\", \"en\":\"Louiseville\"}', 1),
('{\"fr\":\"Macamic\", \"en\":\"Macamic\"}', 1),
('{\"fr\":\"Magog\", \"en\":\"Magog\"}', 1),
('{\"fr\":\"Malartic\", \"en\":\"Malartic\"}', 1),
('{\"fr\":\"MalbaieLa Malbaie\", \"en\":\"MalbaieLa Malbaie\"}', 1),
('{\"fr\":\"Maniwaki\", \"en\":\"Maniwaki\"}', 1),
('{\"fr\":\"Marieville\", \"en\":\"Marieville\"}', 1),
('{\"fr\":\"Mascouche\", \"en\":\"Mascouche\"}', 1),
('{\"fr\":\"Matagami\", \"en\":\"Matagami\"}', 1),
('{\"fr\":\"Matane\", \"en\":\"Matane\"}', 1),
('{\"fr\":\"Mercier\", \"en\":\"Mercier\"}', 1),
('{\"fr\":\"MetabetchouanMétabetchouan–Lac-à-la-Croix\", \"en\":\"MetabetchouanMétabetchouan–Lac-à-la-Croix\"}', 1),
('{\"fr\":\"MetisMétis-sur-Mer\", \"en\":\"MetisMétis-sur-Mer\"}', 1),
('{\"fr\":\"Mirabel (Québec)\", \"en\":\"Mirabel (Québec)\"}', 1),
('{\"fr\":\"Mont-Joli\", \"en\":\"Mont-Joli\"}', 1),
('{\"fr\":\"Mont-Laurier\", \"en\":\"Mont-Laurier\"}', 1),
('{\"fr\":\"Mont-Saint-Hilaire\", \"en\":\"Mont-Saint-Hilaire\"}', 1),
('{\"fr\":\"Mont-Tremblant\", \"en\":\"Mont-Tremblant\"}', 1),
('{\"fr\":\"Montmagny\", \"en\":\"Montmagny\"}', 1),
('{\"fr\":\"Montréal\", \"en\":\"Montréal\"}', 1),
('{\"fr\":\"Montréal-Est\", \"en\":\"Montréal-Est\"}', 1),
('{\"fr\":\"Montréal-Ouest\", \"en\":\"Montréal-Ouest\"}', 1),
('{\"fr\":\"Mont-Royal\", \"en\":\"Mont-Royal\"}', 1),
('{\"fr\":\"Murdochville\", \"en\":\"Murdochville\"}', 1),
('{\"fr\":\"Neuville\", \"en\":\"Neuville\"}', 1),
('{\"fr\":\"New Richmond\", \"en\":\"New Richmond\"}', 1),
('{\"fr\":\"Nicolet\", \"en\":\"Nicolet\"}', 1),
('{\"fr\":\"Normandin\", \"en\":\"Normandin\"}', 1),
('{\"fr\":\"Notre-Dame-des-Prairies\", \"en\":\"Notre-Dame-des-Prairies\"}', 1),
('{\"fr\":\"Notre-Dame-du-Lac\", \"en\":\"Notre-Dame-du-Lac\"}', 1),
('{\"fr\":\"Otterburn Park\", \"en\":\"Otterburn Park\"}', 1),
('{\"fr\":\"Paspébiac\", \"en\":\"Paspébiac\"}', 1),
('{\"fr\":\"Percé\", \"en\":\"Percé\"}', 1),
('{\"fr\":\"Pincourt\", \"en\":\"Pincourt\"}', 1),
('{\"fr\":\"Plessisville\", \"en\":\"Plessisville\"}', 1),
('{\"fr\":\"PocatiereLa Pocatière\", \"en\":\"PocatiereLa Pocatière\"}', 1),
('{\"fr\":\"PohenegamookPohénégamook\", \"en\":\"PohenegamookPohénégamook\"}', 1),
('{\"fr\":\"Pointe-Claire\", \"en\":\"Pointe-Claire\"}', 1),
('{\"fr\":\"Pont-Rouge\", \"en\":\"Pont-Rouge\"}', 1),
('{\"fr\":\"Port-Cartier\", \"en\":\"Port-Cartier\"}', 1),
('{\"fr\":\"Portneuf\", \"en\":\"Portneuf\"}', 1),
('{\"fr\":\"PrairieLa Prairie\", \"en\":\"PrairieLa Prairie\"}', 1),
('{\"fr\":\"Princeville\", \"en\":\"Princeville\"}', 1),
('{\"fr\":\"Prévost\", \"en\":\"Prévost\"}', 1),
('{\"fr\":\"Québec\", \"en\":\"Québec\"}', 1),
('{\"fr\":\"Repentigny\", \"en\":\"Repentigny\"}', 1),
('{\"fr\":\"Richelieu\", \"en\":\"Richelieu\"}', 1),
('{\"fr\":\"Richmond\", \"en\":\"Richmond\"}', 1),
('{\"fr\":\"Rimouski\", \"en\":\"Rimouski\"}', 1),
('{\"fr\":\"Rivière-du-Loup\", \"en\":\"Rivière-du-Loup\"}', 1),
('{\"fr\":\"Rivière-Rouge\", \"en\":\"Rivière-Rouge\"}', 1),
('{\"fr\":\"Roberval\", \"en\":\"Roberval\"}', 1),
('{\"fr\":\"Rosemère\", \"en\":\"Rosemère\"}', 1),
('{\"fr\":\"Rouyn-Noranda\", \"en\":\"Rouyn-Noranda\"}', 1),
('{\"fr\":\"Saguenay\", \"en\":\"Saguenay\"}', 1),
('{\"fr\":\"Sainte-Adèle\", \"en\":\"Sainte-Adèle\"}', 1),
('{\"fr\":\"Sainte-Agathe-des-Monts\", \"en\":\"Sainte-Agathe-des-Monts\"}', 1),
('{\"fr\":\"Sainte-Anne-de-Beaupré\", \"en\":\"Sainte-Anne-de-Beaupré\"}', 1),
('{\"fr\":\"Sainte-Anne-de-Bellevue\", \"en\":\"Sainte-Anne-de-Bellevue\"}', 1),
('{\"fr\":\"Sainte-Anne-des-Monts\", \"en\":\"Sainte-Anne-des-Monts\"}', 1),
('{\"fr\":\"Sainte-Anne-des-Plaines\", \"en\":\"Sainte-Anne-des-Plaines\"}', 1),
('{\"fr\":\"Saint-Augustin-de-Desmaures\", \"en\":\"Saint-Augustin-de-Desmaures\"}', 1),
('{\"fr\":\"Saint-Basile\", \"en\":\"Saint-Basile\"}', 1),
('{\"fr\":\"Saint-Basile-le-Grand\", \"en\":\"Saint-Basile-le-Grand\"}', 1),
('{\"fr\":\"Saint-Bruno-de-Montarville\", \"en\":\"Saint-Bruno-de-Montarville\"}', 1),
('{\"fr\":\"Sainte-Catherine\", \"en\":\"Sainte-Catherine\"}', 1),
('{\"fr\":\"Sainte-Catherine-de-la-Jacques-Cartier\", \"en\":\"Sainte-Catherine-de-la-Jacques-Cartier\"}', 1),
('{\"fr\":\"Saint-Césaire\", \"en\":\"Saint-Césaire\"}', 1),
('{\"fr\":\"Saint-Constant\", \"en\":\"Saint-Constant\"}', 1),
('{\"fr\":\"Saint-Eustache\", \"en\":\"Saint-Eustache\"}', 1),
('{\"fr\":\"Saint-Félicien\", \"en\":\"Saint-Félicien\"}', 1),
('{\"fr\":\"Saint-Gabriel\", \"en\":\"Saint-Gabriel\"}', 1),
('{\"fr\":\"Saint-Georges\", \"en\":\"Saint-Georges\"}', 1),
('{\"fr\":\"Saint-Hyacinthe\", \"en\":\"Saint-Hyacinthe\"}', 1),
('{\"fr\":\"Saint-Jean-sur-Richelieu\", \"en\":\"Saint-Jean-sur-Richelieu\"}', 1),
('{\"fr\":\"Saint-Jérôme\", \"en\":\"Saint-Jérôme\"}', 1),
('{\"fr\":\"Saint-Joseph-de-Beauce\", \"en\":\"Saint-Joseph-de-Beauce\"}', 1),
('{\"fr\":\"Saint-Joseph-de-Sorel\", \"en\":\"Saint-Joseph-de-Sorel\"}', 1),
('{\"fr\":\"Sainte-Julie\", \"en\":\"Sainte-Julie\"}', 1),
('{\"fr\":\"Saint-Lambert\", \"en\":\"Saint-Lambert\"}', 1),
('{\"fr\":\"Saint-Lazare\", \"en\":\"Saint-Lazare\"}', 1),
('{\"fr\":\"Saint-Lin-Laurentides\", \"en\":\"Saint-Lin-Laurentides\"}', 1),
('{\"fr\":\"Saint-Marc-des-Carrières\", \"en\":\"Saint-Marc-des-Carrières\"}', 1),
('{\"fr\":\"Sainte-Marguerite-du-Lac-Masson\", \"en\":\"Sainte-Marguerite-du-Lac-Masson\"}', 1),
('{\"fr\":\"Sainte-Marie\", \"en\":\"Sainte-Marie\"}', 1),
('{\"fr\":\"Sainte-Marthe-sur-le-Lac\", \"en\":\"Sainte-Marthe-sur-le-Lac\"}', 1),
('{\"fr\":\"Saint-Ours\", \"en\":\"Saint-Ours\"}', 1),
('{\"fr\":\"Saint-Pamphile\", \"en\":\"Saint-Pamphile\"}', 1),
('{\"fr\":\"Saint-Pascal\", \"en\":\"Saint-Pascal\"}', 1),
('{\"fr\":\"Saint-Pie\", \"en\":\"Saint-Pie\"}', 1),
('{\"fr\":\"Saint-Raymond\", \"en\":\"Saint-Raymond\"}', 1),
('{\"fr\":\"Saint-Rémi\", \"en\":\"Saint-Rémi\"}', 1),
('{\"fr\":\"Saint-Sauveur\", \"en\":\"Saint-Sauveur\"}', 1),
('{\"fr\":\"Sainte-Thérèse\", \"en\":\"Sainte-Thérèse\"}', 1),
('{\"fr\":\"Saint-Tite\", \"en\":\"Saint-Tite\"}', 1),
('{\"fr\":\"Salaberry-de-Valleyfield\", \"en\":\"Salaberry-de-Valleyfield\"}', 1),
('{\"fr\":\"SarreLa Sarre\", \"en\":\"SarreLa Sarre\"}', 1),
('{\"fr\":\"Schefferville\", \"en\":\"Schefferville\"}', 1),
('{\"fr\":\"Scotstown\", \"en\":\"Scotstown\"}', 1),
('{\"fr\":\"Senneterre\", \"en\":\"Senneterre\"}', 1),
('{\"fr\":\"Sept-Îles\", \"en\":\"Sept-Îles\"}', 1),
('{\"fr\":\"Shawinigan\", \"en\":\"Shawinigan\"}', 1),
('{\"fr\":\"Sherbrooke\", \"en\":\"Sherbrooke\"}', 1),
('{\"fr\":\"Sorel-Tracy\", \"en\":\"Sorel-Tracy\"}', 1),
('{\"fr\":\"Stanstead\", \"en\":\"Stanstead\"}', 1),
('{\"fr\":\"Sutton\", \"en\":\"Sutton\"}', 1),
('{\"fr\":\"Témiscaming\", \"en\":\"Témiscaming\"}', 1),
('{\"fr\":\"Terrebonne\", \"en\":\"Terrebonne\"}', 1),
('{\"fr\":\"Thetford Mines\", \"en\":\"Thetford Mines\"}', 1),
('{\"fr\":\"Thurso\", \"en\":\"Thurso\"}', 1),
('{\"fr\":\"Trois-Pistoles\", \"en\":\"Trois-Pistoles\"}', 1),
('{\"fr\":\"Trois-Rivières\", \"en\":\"Trois-Rivières\"}', 1),
('{\"fr\":\"TuqueLa Tuque\", \"en\":\"TuqueLa Tuque\"}', 1),
('{\"fr\":\"Valcourt\", \"en\":\"Valcourt\"}', 1),
('{\"fr\":\"Varennes\", \"en\":\"Varennes\"}', 1),
('{\"fr\":\"Vaudreuil-Dorion\", \"en\":\"Vaudreuil-Dorion\"}', 1),
('{\"fr\":\"Victoriaville\", \"en\":\"Victoriaville\"}', 1),
('{\"fr\":\"Ville-Marie\", \"en\":\"Ville-Marie\"}', 1),
('{\"fr\":\"Warwick\", \"en\":\"Warwick\"}', 1),
('{\"fr\":\"Waterloo\", \"en\":\"Waterloo\"}', 1),
('{\"fr\":\"Waterville\", \"en\":\"Waterville\"}', 1),
('{\"fr\":\"Westmount\", \"en\":\"Westmount\"}', 1),
('{\"fr\":\"Windsor\", \"en\":\"Windsor\"}', 1),
('{\"fr\":\"Corner Brook\", \"en\":\"Corner Brook\"}', 11),
('{\"fr\":\"Mount Pearl\", \"en\":\"Mount Pearl\"}', 11),
('{\"fr\":\"Saint-Jean\", \"en\":\"Saint-Jean\"}', 11);

-- --------------------------------------------------------

--
-- Structure de la table `voitures`
--

CREATE TABLE `voitures` (
  `id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `description` longtext,
  `prix` double DEFAULT NULL,
  `model_id` int(11) NOT NULL,
  `transmission_id` int(11) NOT NULL,
  `motopropulseur_id` int(11) NOT NULL,
  `carburant_id` int(11) NOT NULL,
  `corp_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
  ADD KEY `expdedition_id` (`expdedition_id`),
  ADD KEY `utilisateur_id` (`utilisateur_id`),
  ADD KEY `statut_id` (`statut_id`);

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
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `models`
--
ALTER TABLE `models`
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
-- Index pour la table `transmissions`
--
ALTER TABLE `transmissions`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `privilege_id` (`privilege_id`);

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
  ADD KEY `model_id` (`model_id`),
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `commandes`
--
ALTER TABLE `commandes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `constructeurs`
--
ALTER TABLE `constructeurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `corps`
--
ALTER TABLE `corps`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `expeditions`
--
ALTER TABLE `expeditions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `models`
--
ALTER TABLE `models`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `mode_paiements`
--
ALTER TABLE `mode_paiements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `motopropulseurs`
--
ALTER TABLE `motopropulseurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `privileges`
--
ALTER TABLE `privileges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `provinces`
--
ALTER TABLE `provinces`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `statuts`
--
ALTER TABLE `statuts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `transmissions`
--
ALTER TABLE `transmissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `villes`
--
ALTER TABLE `villes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `voitures`
--
ALTER TABLE `voitures`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `commandes`
--
ALTER TABLE `commandes`
  ADD CONSTRAINT `commandes_ibfk_1` FOREIGN KEY (`mode_paiement_id`) REFERENCES `mode_paiements` (`id`),
  ADD CONSTRAINT `commandes_ibfk_2` FOREIGN KEY (`expdedition_id`) REFERENCES `expeditions` (`id`),
  ADD CONSTRAINT `commandes_ibfk_3` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs` (`id`),
  ADD CONSTRAINT `commandes_ibfk_4` FOREIGN KEY (`statut_id`) REFERENCES `statuts` (`id`);

--
-- Contraintes pour la table `models`
--
ALTER TABLE `models`
  ADD CONSTRAINT `models_ibfk_1` FOREIGN KEY (`constructeur_id`) REFERENCES `constructeurs` (`id`);

--
-- Contraintes pour la table `utilisateurs`
--
ALTER TABLE `utilisateurs`
  ADD CONSTRAINT `utilisateurs_ibfk_1` FOREIGN KEY (`privilege_id`) REFERENCES `privileges` (`id`);

--
-- Contraintes pour la table `villes`
--
ALTER TABLE `villes`
  ADD CONSTRAINT `villes_ibfk_1` FOREIGN KEY (`province_id`) REFERENCES `provinces` (`id`);

--
-- Contraintes pour la table `voitures`
--
ALTER TABLE `voitures`
  ADD CONSTRAINT `voitures_ibfk_1` FOREIGN KEY (`model_id`) REFERENCES `models` (`id`),
  ADD CONSTRAINT `voitures_ibfk_2` FOREIGN KEY (`transmission_id`) REFERENCES `transmissions` (`id`),
  ADD CONSTRAINT `voitures_ibfk_3` FOREIGN KEY (`motopropulseur_id`) REFERENCES `motopropulseurs` (`id`),
  ADD CONSTRAINT `voitures_ibfk_4` FOREIGN KEY (`carburant_id`) REFERENCES `carburants` (`id`),
  ADD CONSTRAINT `voitures_ibfk_5` FOREIGN KEY (`corp_id`) REFERENCES `corps` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
