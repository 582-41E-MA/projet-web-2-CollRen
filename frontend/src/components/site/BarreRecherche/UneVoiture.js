import { Link } from "react-router-dom";

function UneVoiture(props) {
    let t = props.t
    let voiture = props.voiture;
    let language = props.language;
    console.log(props.voiture.modele.constructeur.type[language]);


    return (

        <tr key={props?.id}>

            <td className="px-2 py-2 whitespace-nowrap text-white">{voiture?.date}</td>
            <td className="px-2 py-2 whitespace-nowrap text-white">{voiture.modele.constructeur?.type[language]}</td>
            <td className="px-2 py-2 whitespace-nowrap text-white">{voiture.modele?.type[language]}</td>
            <td className="px-2 py-2 whitespace-nowrap">
                <Link to={`/voitures/${voiture.id}`} className="gap-x-[1rem] bg-[#F96C25] hover:bg-[#868E9B] text-white font-bold py-2 px-4 rounded-full">
                    {t("btnChoisir")}
                </Link>

            </td>
        </tr>

    )

}

export default UneVoiture