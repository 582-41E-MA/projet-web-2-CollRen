import React from 'react';
import Nav from '../Nav/Nav';
import { Link } from 'react-router-dom';
import "./Footer.css";


function Footer({ t }) {
    return (
        <footer className=' bg-bleuFonce flex flex-wrap items-center justify-around' >
            <div>
                <Link to="/">
                    <img src='/imgs/bazou_logo.png' alt='logo Beaux Bazou' className='w-[15rem] rounded-[10rem]' />
                </Link>
            </div>
            <div className='flex flex-wrap'>
                <div className='font-titre'>
                    <a href="#" className="py-2 px-6 flex color-red text-lg text-titre">{t("navItem.home")}
                    </a>
                    <a href="#" className="py-2 px-6 flex color-red text-lg">
                        {t("navItem.catalogue")}</a>
                    <a href="/apropos" className="py-2 px-6 flex text-lg">
                        {t("navItem.apropos")}
                    </a>
                    <a href="#" className="py-2 px-6 flex text-lg"> Contact</a>
                </div>
                <div className='font-titre'>
                    <a href="/politique" className="py-2 px-6 flex text-lg">{t("privacy_policy")}
                    </a>
                    <a href="#" className="py-2 px-6 flex text-lg">{t("find_vehicle")}</a>
                    <a href="#" className="py-2 px-6 flex color-red text-lg">+1 888 888 8888</a>
                    <a href="/apropos" className="py-2 px-6 flex text-lg">contact@beauxbazous.ca</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
