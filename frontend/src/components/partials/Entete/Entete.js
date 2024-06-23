import React from 'react';
import Nav from '../Nav/Nav';
import { Link } from 'react-router-dom';

function Entete({ t}) { 
   

    return (
        <header className='flex items-center gap-[rem] justify-center my-4'>
           <Link to="/">
                <div>
                    <img src='\imgs\bazou_logo.png' alt='logo Beaux Bazou' className='w-[15rem] rounded-[10rem]'/>
                </div>
            </Link>
            <Nav t={t}/>
            
        </header>
    );
}

export default Entete;