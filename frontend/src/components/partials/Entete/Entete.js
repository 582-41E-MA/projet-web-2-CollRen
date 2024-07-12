import React from 'react';
import Nav from '../Nav/Nav';
import { Link } from 'react-router-dom';

function Entete({ t}) { 
   

    return (

        <header className='bg-bleuFonce flex items-center gap-[rem] justify-around  '>
           <div>
               <Link to="/">
               <div>
                    <img 
                        src='\imgs\bazou_logo.png' 
                        alt='logo Beaux Bazou' 
                        className='w-[15rem] sm:w-[10rem] rounded-[10rem]' 
                    />
                </div>
                </Link>
           </div>
            <div className='flex'>
                <Nav t={t}/>
            </div>


        </header>
    );
}

export default Entete;