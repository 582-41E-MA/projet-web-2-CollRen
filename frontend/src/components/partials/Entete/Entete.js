import React from 'react';
import Navigation from '../Navigation/Navigation';

function Entete({ t}) { 
   

    return (
        <header>
            <Navigation t={t}/>
            <h1>{t("titre")}</h1>
        </header>
    );
}

export default Entete;