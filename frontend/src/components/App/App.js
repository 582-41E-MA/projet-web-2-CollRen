import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "../Accueil/Accueil";
import "./App.css";
import Entete from '../partials/Entete/Entete';
import { useTranslation } from 'react-i18next';

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
        return <button key={'langue_' + i} onClick={() => handleTrans(code)}>{native}</button>;
    });

    return (
        <Router>
            {boutonTraduction}
            <Entete t={t} />
            <Routes>
                <Route path='/' element={<Accueil />} />
            </Routes>
        </Router>
    );
}

export default App;
