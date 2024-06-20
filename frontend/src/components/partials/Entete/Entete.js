import React from 'react';
import "./Entete.css";

function Entete({ t }) {
   

    return (
        <header>
            <h1>{t('title')}</h1>
        </header>
    );
}

export default Entete;