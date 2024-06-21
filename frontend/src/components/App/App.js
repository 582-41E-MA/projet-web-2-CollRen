import React from 'react';
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
    //pour possibiliter le site en deux langues
    const { t, i18n } = useTranslation();

    const handleTrans = (code) => {
      i18n.changeLanguage(code);
    };

    return (
        <Router>
             {lngs.map((lng, i) => {
        const { code, native } = lng;
        return <button onClick={() => handleTrans(code)}>{native}</button>;
      })}
           <Entete/>
           
           <div style={{padding: '50px'}}>
      <h1>{t("test")}</h1>

      {lngs.map((lng, i) => {
        const { code, native } = lng;
        return <button onClick={() => handleTrans(code)}>{native}</button>;
      })}

    </div>
            <Routes>
                <Route path='/' element={<Accueil/>}/>
            </Routes>
        </Router>
    )
}

export default App;