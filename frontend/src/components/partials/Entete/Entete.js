import React from 'react';
import "./Entete.css";
import Navigation from '../Navigation/Navigation';

function Entete({ t}) { 
   

    return (
        <header>
            <Navigation t={t}/>
            <h1>{t("titre")}</h1>
            <Nav/>
        </header>
    );
}

export default Entete;