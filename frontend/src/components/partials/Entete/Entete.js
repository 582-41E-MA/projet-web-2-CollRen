import React from 'react';
import Navigation from '../Navigation/Navigation';

function Entete({ t}) { 
   

    return (
        <header className='flex items-baseline justify-around'>
            <h1>{t("titre")}</h1>
            <Navigation t={t}/>
            
        </header>
    );
}

export default Entete;