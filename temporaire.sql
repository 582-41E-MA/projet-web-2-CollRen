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

INSERT INTO `provinces` (`id`, `nom`, `createdAt`, `updatedAt`) VALUES
(1, '{\"fr\":\"Québec\", \"en\":\"Quebec\"', '2024-06-20 20:17:00', '2024-06-20 20:17:00'),
(2, '{\"en\":\"Ontario\", \"fr\":\"Ontario\"}', '2024-06-20 20:18:19', '2024-06-20 20:18:19');

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

INSERT INTO `villes` (`id`, `nom`, `province_id`, `createdAt`, `updatedAt`) VALUES
(1, '{\"en\":\"Sherbrooke\", \"fr\":\"Sherbrooke\"}', 1, '2024-06-20 20:20:46', '2024-06-20 20:20:46'),
(2, '{\"fr\":\"Chicoutimi\", \"en\": \"Chicoutimi\"}', 1, '2024-06-21 16:55:35', '2024-06-21 16:55:35');

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
