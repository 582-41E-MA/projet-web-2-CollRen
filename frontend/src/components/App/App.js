import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "../Accueil/Accueil";
import "./App.css";
import Entete from '../partials/Entete/Entete';
import { useTranslation } from 'react-i18next';
import Login from '../site/Login/Login';
import UserCreate from '../users/UserCreate/UserCreate';
import APropos from '../site/APropos/APropos';

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
    

    const boutonTraduction = lngs.map((lng, i) => {
        const { code, native } = lng;
        return <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex-end m-3" key={'langue_' + i} onClick={() => handleTrans(code)}>{native}</button>;
    });

    return (
        <Router>
            {boutonTraduction}
            <Entete t={t} />
            <Routes>
                <Route path='/' element={<Accueil t={t} />} />
                <Route path='/apropos' element={<APropos t={t} />} />

                <Route path='/login' element={<Login t={t} />} />
                <Route path='/usercreate' element={<UserCreate t={t} />} />

            </Routes>
        </Router>
    );
}

export default App;
