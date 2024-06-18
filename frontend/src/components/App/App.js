import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Accueil from "../Accueil/Accueil";
import "./App.css";
import Entete from '../Entete/Entete';


function App() {

    return (
        <Router>
           <Entete/>
            <Routes>
                <Route path='/' element={<Accueil/>}/>
            </Routes>
        </Router>
    )
}

export default App;