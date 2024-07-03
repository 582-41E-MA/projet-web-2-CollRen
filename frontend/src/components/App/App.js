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

export const AppContext = React.createContext();

const lngs = [
    { code: "en", native: "English" },
    { code: "fr", native: "French" },
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
    useEffect(() => {
        const estValide = jetonValide();
        const userData = {
            isLogged: estValide,
            usager: {}
        };
        setUser(userData);
    }, []);

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

    function jetonValide() {
        try {
            const token = localStorage.getItem("user-token");
            const decode = jwtDecode(token);
            if (token && Date.now() < decode.exp * 1000) {
                return true;
            } else {
                localStorage.removeItem("user-token");
                return false;
            }
        } catch (erreur) {
            localStorage.removeItem("user-token");
            return false;
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
                        <Route path='/model-create' element={<ModeleCreate t={t}   />} />
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

                </Routes>
            </Router>
        </AppContext.Provider>
    );
}

export default App;
