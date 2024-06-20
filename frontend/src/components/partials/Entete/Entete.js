import React from 'react';
import "./Entete.css";

function Entete({ t}) {
   

    return (
        <header>
            <h1>{t("titre")}</h1>
        </header>
    );
}

export default Entete;