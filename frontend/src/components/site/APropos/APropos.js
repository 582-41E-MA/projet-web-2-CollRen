function APropos({t}){

    return (

        <section className="py-20 xl:pt-24 xl:pb-28 bg-white" >
        <div className="container px-4 mx-auto">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4 mb-14">
              <div className="flex flex-wrap justify-between items-center">
                <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
                
                  <h3 className="mb-4 text-3xl md:text-4xl text-coolGray-900 font-bold tracking-tighter">{t("apropos.titre")}</h3>
                  <p className="text-lg md:text-xl leading-8 text-coolGray-500 font-semibold">{t("apropos.soustitre")}</p>
                </div>
                
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4 mb-5 lg:mb-0">
              <p className="mb-6 text-lg leading-7 text-coolGray-500">{t("apropos.p1")}</p>
              <p className="mb-6 text-lg leading-7 text-coolGray-500">{t("apropos.p2")}</p>
              <p className="mb-6 text-lg leading-7 text-coolGray-500">{t("apropos.p3")}</p>
              <p className="mb-6 text-lg leading-7 text-coolGray-500">{t("apropos.p4")}</p>
              <p className="mb-6 text-lg leading-7 text-coolGray-500">{t("apropos.p5")}</p>
            
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <img className="w-full" src="https://istoedinheiro.com.br/wp-content/uploads/sites/17/2021/09/carros-marcelo-camargo-e1632743497972.jpg" alt=""/>
            </div>
          </div>
        </div>
      </section>
    )
}

export default APropos;