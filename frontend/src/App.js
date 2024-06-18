import React from 'react';
import {Routes, Route} from 'react-router-dom';


import Accueil from '../Accueil/Accueil';

import './App.css';

function App() {
  return (
   <Routes>
    <Route path="/" element={<Accueil />} />

   </Routes>
  );
}

export default App;
