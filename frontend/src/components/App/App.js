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

    const boutonTraduction= lngs.map((lng, i) => {
      const { code, native } = lng;
      return <button key={'langue_'+ i} onClick={() => handleTrans(code)}>{native}</button>;
    })

    return (
        <Router>
          {boutonTraduction}
           <Entete t={t}/>
           
            <Routes>
                <Route path='/' element={<Accueil/>}/>
            </Routes>
        </Router>
    )
}

export default App;