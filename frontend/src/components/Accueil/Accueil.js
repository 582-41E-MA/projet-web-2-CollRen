import "./Accueil.css";


function Accueil ({t}){

    return (
        
        <section className="px-3 py-5 bg-neutral-100 lg:py-10">
            <div className="grid lg:grid-cols-2 items-center justify-items-center gap-5">
                <div className="order-2 lg:order-1 flex flex-col justify-center items-center">
                    <p className="text-4xl font-bold md:text-7xl text-orange-600">{t("accueil.titre1")}</p>
                    <p className="text-4xl font-bold md:text-7xl">{t("accueil.titre2")}</p>
                    <p className="mt-2 text-sm md:text-lg">{t("accueil.titre3")}</p>
                    <button className="text-lg md:text-2xl bg-black text-white py-2 px-5 mt-10 hover:bg-zinc-800">{t("accueil.btnCta")}</button>
                </div>
                <div className="order-1 lg:order-2">
                    <img className="h-80 w-80 object-cover lg:w-[500px] lg:h-[500px]" src="https://hips.hearstapps.com/hmg-prod/images/dw-burnett-pcoty22-8260-1671143390.jpg?crop=0.668xw:1.00xh;0.184xw,0&resize=640:*" alt=""/>
                </div>
            </div>
        </section>
    )
}

export default Accueil;