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

    return (
        <Router>
            <div className='flex justify-end'> 
                {lngs.map((lng, i) => (
                    <Bouton key={'langue_' + i} onClick={() => handleTrans(lng.code)}>{lng.native}</Bouton>
                ))}
            </div>
            <Entete t={t} />
            <Routes>
                <Route path='/' element={<Accueil t={t} />} />
                <Route path='/apropos' element={<APropos t={t} />} />
                <Route path='/admin' element={<DashboardAdmin t={t} />} />
                <Route path='/login' element={<Login t={t} />} />
                <Route path='/usercreate' element={<UserCreate t={t} />} />
                <Route path='/user' element={<UserIndex t={t} />} />
                <Route path="/user/:id" element={<UserShow t={t} />} />
                <Route path="/privilege-create" element={<PrivilegeCreate t={t} />} />
                <Route path="/privileges" element={<PrivilegeIndex t={t} changeLanguage={handleTrans} />} />
            </Routes>
        </Router>
    );
}

export default App;
