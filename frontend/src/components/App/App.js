import React, { useEffect, useState } from 'react';
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

export const AppContext = React.createContext();

const lngs = [
    { code: "en", native: "English" },
    { code: "fr", native: "French" },
];

function App() {
    const { t, i18n } = useTranslation();
   
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

    const btnTraduction =  lngs.map((lng, i) => ( <Bouton key={'langue_' + i} onClick={() => handleTrans(lng.code)}>{lng.native}</Bouton> ))


    //functions pour gérer le login
 
    const [user, setUser] = useState({isLogged: false, usager:{}})
  
    useEffect(()=>{
      const estValide = jetonValide();
      const userData ={
        islogged:estValide,
        usager:{}
      }
      setUser(userData);
    },[])
  
    async function login(e){
      e.preventDefault();
      const form = e.target;
  
      console.log(form.nomUtilisateur.value);



      const body = {
        nom_utilisateur: form.nomUtilisateur.value,
        mot_de_passe:form.mdp.value,
      }
  
      const data = {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(body)
      }
  
      const reponse = await fetch(`http://localhost:5000/api/utilisateurs/login`, data);
      const token = await reponse.json();
      
      if(reponse.status === 200) {
        const userData = {
          isLogged: true,
          usager:{}
        }
        setUser(userData);
        localStorage.setItem("user-token", token.accessToken);
        return { success: true, userId: token.id };
      } else{
        localStorage.removeItem("user-token");
        return false
      }
    }
  
    function jetonValide(){
        try {
          const token = localStorage.getItem("user-token"); 
          const decode = jwtDecode(token);
          if(token && Date.now() < decode.exp * 1000){
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
  
    function logout(){
      const userData = {
        isLogged: false,
        usager:{}
      }
      setUser(userData);
      localStorage.removeItem("user-token");
    }


    return (
        <Router>
            <div className='flex justify-end'> 
                {btnTraduction}
            </div>

            <Entete t={t} />
            <Routes>
                <Route path='/' element={<Accueil t={t} />} />
                <Route path='/apropos' element={<APropos t={t} />} />
                <Route path='/admin' element={<DashboardAdmin t={t} />} />
                <Route path='/client/:id' element={<DashboardClient t={t} />} />
                <Route path='/login' element={<Login t={t}  user={user.usager} handleLogin={login} handleLogout={logout}/>} />
                <Route path='/usercreate' element={<UserCreate t={t} />} />
                <Route path='/user' element={<UserIndex t={t} />} />
                <Route path="/user/:id" element={<UserShow t={t} />} />
                <Route path="/privilege-create" element={<PrivilegeCreate t={t} />} />
                <Route path="/privileges" element={<PrivilegeIndex t={t} changeLanguage={handleTrans} />} />
                <Route path="/privilege-edit/:id" element={<PrivilegeEdit t={t} changeLanguage={handleTrans} />} />
            </Routes>
        </Router>
    );
}

export default App;
