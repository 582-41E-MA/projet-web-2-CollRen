import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "../Accueil/Accueil";
import "./App.css";
import Entete from '../partials/Entete/Entete';
import { useTranslation } from 'react-i18next';
import Login from '../site/Login/Login';
import UserCreate from '../users/UserCreate/UserCreate';
import APropos from '../site/APropos/APropos';
import DashboardAdmin from '../dashboards/DashboardAdmin/DashboardAdmin';
import UserIndex from '../users/UserIndex/UserIndex';
import UserShow from '../users/UserShow/UserShow';
import PrivilegeCreate from '../dashboards/dashboardParts/PrivilegeCreate/PrivilegeCreate';
import PrivilegeIndex from '../dashboards/dashboardParts/PrivilegeIndex/PrivilegeIndex';
import Bouton from '../partialsFormulaire/Bouton/Bouton';
import PrivilegeEdit from '../dashboards/dashboardParts/PrivilegeEdit/PrivilegeEdit';
import { jwtDecode } from 'jwt-decode';
import DashboardClient from '../dashboards/DashboardClient/DashboardClient';
import PrivateRoute from '../dashboards/PrivateRoute/PrivateRoute';
import VoituresIndex from '../voitures/VoituresIndex/VoituresIndex';
import VoituresCreate from '../voitures/VoituresCreate/VoituresCreate';
import VoituresUpdate from '../voitures/VoituresUpdate/VoituresUpdate';
import ModeleIndex from '../voitures/ModeleIndex/ModeleIndex';
import ModeleUpdate from '../voitures/ModeleUpdate/ModeleUpdate';
import ModeleCreate from '../voitures/ModeleCreate/ModeleCreate';
import ConstructeurIndex from '../voitures/ConstructeurIndex/ConstructeurIndex';
import ConstructeurUpdate from '../voitures/ConstructeurUpdate/ConstructeurUpdate';
import ConstructeurCreate from '../voitures/ConstructeurCreate/ConstructeurCreate';
import CorpsIndex from '../voitures/CorpsIndex/CorpsIndex';
import CorpsCreate from '../voitures/CorpsCreate/CorpsCreate';
import CorpsUpdate from '../voitures/CorpsUpdate/CorpsUpdate';
import TransmissionCreate from '../voitures/TransmissionCreate/TransmissionCreate';
import TransmissionUpdate from '../voitures/TransmissionUpdate/TransmissionUpdate';
import TransmissionIndex from '../voitures/TransmissionIndex/TransmissionIndex';
import MotopropulseurIndex from '../voitures/MotopropulseurIndex/MotopropulseurIndex';
import MotopropulseurCreate from '../voitures/MotopropulseurCreate/MotopropulseurCreate';
import MotopropulseurUpdate from '../voitures/MotopropulseurUpdate/MotopropulseurUpdate';
import CarburantIndex from '../voitures/CarburantIndex/CarburantIndex';
import CarburantUpdate from '../voitures/CarburantUpdate/CarburantUpdate';
import CarburantCreate from '../voitures/CarburantCreate/CarburantCreate';
import Politique from '../site/Politique/Politique';
import Footer from '../partials/Footer/Footer';
import Contact from '../site/Contact/Contact';
import Catalogue from '../site/Catalogue/Catalogue';

export const AppContext = React.createContext();
const lngs = [
    { code: "en", native: "EN" },
    { code: "fr", native: "FR" },
];

function App() {
    const { t, i18n } = useTranslation();
    const [user, setUser] = useState({ isLogged: false, usager: {} });

    useEffect(() => {
        const savedLanguage = sessionStorage.getItem('langueChoisie') || localStorage.getItem('langueChoisie');
        if (savedLanguage) {
            i18n.changeLanguage(savedLanguage);
        } else {
            const defaultLanguage = 'fr';
            i18n.changeLanguage(defaultLanguage);
            localStorage.setItem('langueChoisie', defaultLanguage);
            sessionStorage.setItem('langueChoisie', defaultLanguage);
        }

        const token = localStorage.getItem('user-token');
        if (token) {
            const decodedToken = jwtDecode(token);
            if (Date.now() < decodedToken.exp * 1000) {
                setUser({
                    isLogged: true,
                    usager: {
                        privilege_id: decodedToken.privilege_id,
                        id: decodedToken.id
                    }
                });
            } else {
                localStorage.removeItem('user-token');
            }
        }
    }, [i18n]);

    const handleTrans = (code) => {
        i18n.changeLanguage(code);
        localStorage.setItem('langueChoisie', code);
        sessionStorage.setItem('langueChoisie', code);
    };

    const btnTraduction = lngs.map((lng, i) => (
        <Bouton key={'langue_' + i} onClick={() => handleTrans(lng.code)}>{lng.native}</Bouton>
    ));

    async function login(e) {
        e.preventDefault();
        const form = e.target;

        const body = {
            nom_utilisateur: form.nomUtilisateur.value,
            mot_de_passe: form.mdp.value,
            withCredentials: true
        };

        const data = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        };

        const response = await fetch(`http://localhost:5000/api/utilisateurs/login`, data);

        if (response.ok) {
            const token = await response.json();

            const decodedToken = jwtDecode(token.token);
            const userData = {
                isLogged: true,
                usager: {
                    privilege_id: token.utilisateur.privilege_id,
                    id: decodedToken.id
                }
            };
            setUser(userData);
            localStorage.setItem("user-token", token.token);
            return { success: true, privId: token.utilisateur.privilege_id, userId: token.utilisateur.id };
        } else {
            localStorage.removeItem("user-token");
            return { success: false };
        }
    }

    function logout() {
        const userData = {
            isLogged: false,
            usager: {}
        };
        setUser(userData);
        localStorage.removeItem("user-token");
    }

    return (
        <AppContext.Provider value={{ user, logout }}>
            <Router>
                <div className='flex justify-end'>
                    {btnTraduction}
                </div>
                <Entete t={t} />
                <Routes>
                    <Route path='/' element={<Accueil t={t} />} />
                    <Route path='/apropos' element={<APropos t={t} />} />

                    <Route path='/admin' element={<PrivateRoute requiredPrivilege={[1, 2]} />}>
                        <Route path='/admin' element={<DashboardAdmin t={t} />} />
                    </Route>

                    <Route path='/model' element={<PrivateRoute requiredPrivilege={[1, 2]} />}>
                        <Route path='/model' element={<ModeleIndex t={t} />} />
                    </Route>
                    <Route path='/model-edit' element={<PrivateRoute requiredPrivilege={[1, 2]} />}>
                        <Route path='/model-edit/:id' element={<ModeleUpdate t={t} />} />
                    </Route>

                    <Route path='/model-create' element={<PrivateRoute requiredPrivilege={[1, 2]} />}>
                        <Route path='/model-create' element={<ModeleCreate t={t} />} />
                    </Route>
                    <Route path='/constructeur' element={<PrivateRoute requiredPrivilege={[1, 2]} />}>
                        <Route path='/constructeur' element={<ConstructeurIndex t={t} />} />
                    </Route>

                    <Route path='/constructeur-edit/:id' element={<PrivateRoute requiredPrivilege={[1, 2]} />}>
                        <Route path='/constructeur-edit/:id' element={<ConstructeurUpdate t={t} />} />
                    </Route>

                    <Route path='/constructeur-create' element={<PrivateRoute requiredPrivilege={[1, 2]} />}>
                        <Route path='/constructeur-create' element={<ConstructeurCreate t={t} />} />
                    </Route>

                    <Route path='/corps' element={<PrivateRoute requiredPrivilege={[1, 2]} />}>
                        <Route path='/corps' element={<CorpsIndex t={t} changeLanguage={handleTrans} />} />
                    </Route>

                    <Route path='/corps-create' element={<PrivateRoute requiredPrivilege={[1, 2]} />}>
                        <Route path='/corps-create' element={<CorpsCreate t={t} changeLanguage={handleTrans} />} />
                    </Route>

                    <Route path='/corps-update/:id' element={<PrivateRoute requiredPrivilege={[1, 2]} />}>
                        <Route path='/corps-update/:id' element={<CorpsUpdate t={t} />} />
                    </Route>

                    <Route path='/transmission' element={<PrivateRoute requiredPrivilege={[1, 2]} />}>
                        <Route path='/transmission' element={<TransmissionIndex t={t} changeLanguage={handleTrans} />} />
                    </Route>

                    <Route path='/transmission-create' element={<PrivateRoute requiredPrivilege={[1, 2]} />}>
                        <Route path='/transmission-create' element={<TransmissionCreate t={t} changeLanguage={handleTrans} />} />
                    </Route>

                    <Route path='/transmission-update/:id' element={<PrivateRoute requiredPrivilege={[1, 2]} />}>
                        <Route path='/transmission-update/:id' element={<TransmissionUpdate t={t} />} />
                    </Route>

                    <Route path='/fuel' element={<PrivateRoute requiredPrivilege={[1, 2]} />}>
                        <Route path='/fuel' element={<CarburantIndex t={t} changeLanguage={handleTrans} />} />
                    </Route>

                    <Route path='/fuel-create' element={<PrivateRoute requiredPrivilege={[1, 2]} />}>
                        <Route path='/fuel-create' element={<CarburantCreate t={t} changeLanguage={handleTrans} />} />
                    </Route>

                    <Route path='/fuel-update/:id' element={<PrivateRoute requiredPrivilege={[1, 2]} />}>
                        <Route path='/fuel-update/:id' element={<CarburantUpdate t={t} />} />
                    </Route>

                    <Route path='/fiscalite' element={<PrivateRoute requiredPrivilege={[1, 2]} />}>
                        <Route path='/fiscalite' element={<MotopropulseurIndex t={t} changeLanguage={handleTrans} />} />
                    </Route>

                    <Route path='/fiscalite-create' element={<PrivateRoute requiredPrivilege={[1, 2]} />}>
                        <Route path='/fiscalite-create' element={<MotopropulseurCreate t={t} changeLanguage={handleTrans} />} />
                    </Route>

                    <Route path='/fiscalite-update/:id' element={<PrivateRoute requiredPrivilege={[1, 2]} />}>
                        <Route path='/fiscalite-update/:id' element={<MotopropulseurUpdate t={t} />} />
                    </Route>

                    <Route path='/modele' element={<PrivateRoute requiredPrivilege={[1, 2]} />}>
                        <Route path='/modele' element={<ModeleIndex t={t} />} />
                    </Route>

                    <Route path='/modele-update/:id' element={<PrivateRoute requiredPrivilege={[1, 2]} />}>
                        <Route path='/modele-update/:id' element={<ModeleUpdate t={t} />} />
                    </Route>

                    <Route path='/modele-create' element={<PrivateRoute requiredPrivilege={[1, 2]} />}>
                        <Route path='/modele-create' element={<ModeleCreate t={t} />} />
                    </Route>

                    <Route path='/voiture' element={<PrivateRoute requiredPrivilege={[1, 2]} />}>
                        <Route path='/voiture' element={<VoituresIndex t={t} />} />
                    </Route>

                    <Route path='/voiture-create' element={<PrivateRoute requiredPrivilege={[1, 2]} />}>
                        <Route path='/voiture-create' element={<VoituresCreate t={t} />} />
                    </Route>

                    <Route path='/voiture-update/:id' element={<PrivateRoute requiredPrivilege={[1, 2]} />}>
                        <Route path='/voiture-update/:id' element={<VoituresUpdate t={t} />} />
                    </Route>

                    <Route path='/login' element={<Login t={t} login={login} />} />

                    <Route path='/create-user' element={<UserCreate t={t} />} />

                    <Route path='/users' element={<PrivateRoute requiredPrivilege={[1, 2]} />}>
                        <Route path='/users' element={<UserIndex t={t} />} />
                    </Route>

                    <Route path='/user-show/:id' element={<PrivateRoute requiredPrivilege={[1, 2]} />}>
                        <Route path='/user-show/:id' element={<UserShow t={t} />} />
                    </Route>

                    <Route path='/create-privilege' element={<PrivateRoute requiredPrivilege={[1, 2]} />}>
                        <Route path='/create-privilege' element={<PrivilegeCreate t={t} />} />
                    </Route>

                    <Route path='/privileges' element={<PrivateRoute requiredPrivilege={[1, 2]} />}>
                        <Route path='/privileges' element={<PrivilegeIndex t={t} />} />
                    </Route>

                    <Route path='/update-privilege/:id' element={<PrivateRoute requiredPrivilege={[1, 2]} />}>
                        <Route path='/update-privilege/:id' element={<PrivilegeEdit t={t} />} />
                    </Route>

                    <Route path='/dashboard' element={<PrivateRoute requiredPrivilege={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]} />}>
                        <Route path='/dashboard' element={<DashboardClient t={t} />} />
                    </Route>

                    <Route path='/user' element={<PrivateRoute requiredPrivilege={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]} />}>
                        <Route path='/user' element={<UserIndex t={t} />} />
                    </Route>

                    <Route path='/catalogue' element={<Catalogue t={t} />} />

                    <Route path='/policy' element={<PrivateRoute requiredPrivilege={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]} />}>
                        <Route path='/policy' element={<Politique t={t} />} />
                    </Route>

                    <Route path='/contact' element={<PrivateRoute requiredPrivilege={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]} />}>
                        <Route path='/contact' element={<Contact t={t} />} />
                    </Route>

                </Routes>
                <Footer t={t} />
            </Router>
        </AppContext.Provider>
    );
}

export default App;

