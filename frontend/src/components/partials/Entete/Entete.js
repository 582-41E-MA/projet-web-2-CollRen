import { Translation } from 'react-i18next';
import "./Entete.css";


function Entete (){
   

    return (
        <header>
            <h1>Entete</h1>
            <Translation>
      {
        (t, { i18n }) => <p>{t('test2')}</p>
      }
    </Translation>
           
        </header>
        
    )
}

export default Entete;