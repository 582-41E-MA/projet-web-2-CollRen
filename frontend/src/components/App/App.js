import React, { useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
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
import {jwtDecode} from 'jwt-decode';
import DashboardClient from '../dashboards/DashboardClient/DashboardClient';
import PrivateRoute from '../dashboards/PrivateRoute/PrivateRoute';
import VoituresIndex from '../voitures/VoituresIndex/VoituresIndex';
import ModeleIndex from '../voitures/ModeleIndex/ModeleIndex';
import ModeleUpdate from '../voitures/ModeleUpdate/ModeleUpdate';
import ModeleCreate from '../voitures/ModeleCreate/ModeleCreate';
import ConstructeurIndex from '../voitures/ConstructeurIndex/ConstructeurIndex';
import ConstructeurUpdate from '../voitures/ConstructeurUpdate/ConstructeurUpdate';
import ConstructeurCreate from '../voitures/ContructteurCreate/ConstructeurCreate';
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

    // Functions to handle login


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
        <AppContext.Provider value={{user, logout}}>
            <Router>
                <div className='flex justify-end'>
                    {btnTraduction}
                </div>
                <Entete t={t} />
                <Routes>
                    <Route path='/' element={<Accueil t={t} />} />
                    <Route path='/apropos' element={<APropos t={t} />} />

                    <Route path='/admin' element={<PrivateRoute requiredPrivilege={[1,2]} />}>
                        <Route path='/admin' element={<DashboardAdmin t={t} />} />
                    </Route>

                    <Route path='/model' element={<PrivateRoute requiredPrivilege={[1,2]} />}>
                        <Route path='/model' element={<ModeleIndex t={t}  />} />
                    </Route>
                    <Route path='/model-edit' element={<PrivateRoute requiredPrivilege={[1,2]} />}>
                        <Route path='/model-edit/:id' element={<ModeleUpdate t={t}   />} />
                    </Route>

                    <Route path='/model-create' element={<PrivateRoute requiredPrivilege={[1,2]} />}>
                        <Route path='/model-create' element={<ModeleCreate t={t}  />} />
                    </Route>
                    <Route path='/constructeur' element={<PrivateRoute requiredPrivilege={[1,2]} />}>
                        <Route path='/constructeur' element={<ConstructeurIndex t={t}   />} />
                    </Route>

                    <Route path='/constructeur-edit/:id' element={<PrivateRoute requiredPrivilege={[1,2]} />}>
                        <Route path='/constructeur-edit/:id' element={<ConstructeurUpdate t={t}   />} />
                    </Route>

                    <Route path='/constructeur-create' element={<PrivateRoute requiredPrivilege={[1,2]} />}>
                        <Route path='/constructeur-create' element={<ConstructeurCreate t={t}   />} />
                    </Route>

                    <Route path='/corps' element={<PrivateRoute requiredPrivilege={[1,2]} />}>
                        <Route path='/corps' element={<CorpsIndex t={t}  changeLanguage={handleTrans}  />} />
                    </Route>

                    <Route path='/corps-create' element={<PrivateRoute requiredPrivilege={[1,2]} />}>
                        <Route path='/corps-create' element={<CorpsCreate t={t}  changeLanguage={handleTrans}  />} />
                    </Route>

                    <Route path='/corps-update/:id' element={<PrivateRoute requiredPrivilege={[1,2]} />}>
                        <Route path='/corps-update/:id' element={<CorpsUpdate t={t} />} />
                    </Route>
    
                    <Route path='/transmission' element={<PrivateRoute requiredPrivilege={[1,2]} />}>
                        <Route path='/transmission' element={<TransmissionIndex t={t} changeLanguage={handleTrans} />} />
                    </Route>

                    <Route path='/transmission-create' element={<PrivateRoute requiredPrivilege={[1,2]} />}>
                        <Route path='/transmission-create' element={<TransmissionCreate t={t}  changeLanguage={handleTrans}  />} />
                    </Route>

                    <Route path='/transmission-update/:id' element={<PrivateRoute requiredPrivilege={[1,2]} />}>
                        <Route path='/transmission-update/:id' element={<TransmissionUpdate t={t} />} />
                    </Route>

                    <Route path='/motopropulseur' element={<PrivateRoute requiredPrivilege={[1,2]} />}>
                        <Route path='/motopropulseur' element={<MotopropulseurIndex t={t} changeLanguage={handleTrans} />} />
                    </Route>

                    <Route path='/motopropulseur-create' element={<PrivateRoute requiredPrivilege={[1,2]} />}>
                        <Route path='/motopropulseur-create' element={<MotopropulseurCreate t={t}  changeLanguage={handleTrans}  />} />
                    </Route>

                    <Route path='/motopropulseur-update/:id' element={<PrivateRoute requiredPrivilege={[1,2]} />}>
                        <Route path='/motopropulseur-update/:id' element={<MotopropulseurUpdate t={t} />} />
                    </Route>

                    <Route path='/carburant' element={<PrivateRoute requiredPrivilege={[1,2]} />}>
                        <Route path='/carburant' element={<CarburantIndex t={t} changeLanguage={handleTrans} />} />
                    </Route>

                    <Route path='/carburant-create' element={<PrivateRoute requiredPrivilege={[1,2]} />}>
                        <Route path='/carburant-create' element={<CarburantCreate t={t}  changeLanguage={handleTrans}  />} />
                    </Route>

                    <Route path='/carburant-update/:id' element={<PrivateRoute requiredPrivilege={[1,2]} />}>
                        <Route path='/carburant-update/:id' element={<CarburantUpdate t={t} />} />
                    </Route>


                    <Route path='/client' element={<PrivateRoute requiredPrivilege={[1,2,3]} />}>
                      <Route index element={<DashboardClient t={t} />} />
                    </Route>

                    <Route path='/user' element={<PrivateRoute requiredPrivilege={[1,2]} />}>
                      <Route path='/user' element={<UserIndex t={t} />} />
                    </Route>

                    <Route path='/user/:id' element={<PrivateRoute requiredPrivilege={[1,2]} />}>
                      <Route path="/user/:id" element={<UserShow t={t} />} />
                    </Route>

                    
                    <Route path='/login' element={<Login t={t} user={user} handleLogin={login} handleLogout={logout} />} />
                    <Route path='/usercreate' element={<UserCreate t={t} />} />

                    <Route path="/privilege-create" element={<PrivilegeCreate t={t} />} />
                    <Route path="/privileges" element={<PrivilegeIndex t={t} changeLanguage={handleTrans} />} />
                    <Route path="/privilege-edit/:id" element={<PrivilegeEdit t={t} changeLanguage={handleTrans} />} />

                    <Route path='/voitures' element={<VoituresIndex t={t} />} />
                    <Route path='/politique' element={<Politique t={t} />} />
                    <Route path='/contact' element={<Contact t={t} />} />
                </Routes>
                    <Footer t={t}/>
            </Router>
        </AppContext.Provider>
    );
}

export default App;
