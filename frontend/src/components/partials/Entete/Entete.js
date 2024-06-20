import React from 'react';
import Nav from '../Nav/Nav';

function Entete({t}) {
   

    return (
        <header>

            <h1>{t("titre")}</h1>
            <Nav/>
        </header>
    );
}

export default Entete;