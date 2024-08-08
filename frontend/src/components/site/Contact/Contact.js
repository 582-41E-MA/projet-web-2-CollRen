import React from 'react';
import "./Contact.css";
import ChampText from '../../partialsFormulaire/ChampText/ChampText';
import Bouton from '../../partialsFormulaire/Bouton/Bouton';
import ChampTextArea from '../../partialsFormulaire/ChampTextArea/ChampTextArea';

function Contact({ t }) {
    return (
        <main className="main-background ">
            <div className="form-container ">
                <h1 className="text-4xl  font-titre font-bold">{t("contact.title")}</h1>
                <p className='mb-[1rem]'>{t("contact.text")}</p>
                <form  className="form-inner">                
                    <ChampText type="text" name="nomUtilisateur" placeholder={t("contact.nom")} />
                    <ChampText type="email" name="email" placeholder="E-mail" />
                    <ChampTextArea  placeholder={t("contact.message")}/>
                                
                   
                    <div className="flex justify-center">
                        <Bouton type="submit" className="orange-button font-soustitre">{t("contact.envoyer")}</Bouton>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Contact;
