import React from 'react';

function APropos({ t }) {
    return (
        <section className="bg-white mb-24">
            <img className="w-full h-96 object-cover mx-auto" src="/imgs/voiture-lumiere.jpg" alt=""/>
            <div className="container px-4 mx-auto">
                <div className="flex flex-wrap -mx-4">
                    <div className="w-full px-4 mb-14">
                        <div className="flex flex-wrap justify-between items-center">
                            <div className="w-full mb-10 lg:mb-0">
                                <h3 className="font-titre my-12 text-center mb-4 text-4xl md:text-4xl text-coolGray-900 font-bold tracking-tighter">{t("apropos.titre")}</h3>
                                <p className="text-center mb-12 text-lg md:text-xl leading-8 text-coolGray-500 font-semibold">{t("apropos.soustitre")}</p>
                                <div className="flex flex-col md:flex-row">
                                    <div className='font-paragraphe text-lg mb-6 md:mb-0 md:mr-6'>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                    </div>
                                    <div className='font-paragraphe text-lg'>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 px-4 mb-5 lg:mb-0">
                        <h4 className="font-titre text-left mb-4 text-3xl md:text-3xl text-coolGray-900 font-bold">What is Lorem Ipsum?</h4>
                        <p className="font-paragraphe mb-6 text-lg leading-7 text-coolGray-500">{t("apropos.p1")}</p>
                        <p className="font-paragraphe mb-6 text-lg leading-7 text-coolGray-500">{t("apropos.p2")}</p>
                        <p className="font-paragraphe mb-6 text-lg leading-7 text-coolGray-500">{t("apropos.p3")}</p>
                        <p className="font-paragraphe mb-6 text-lg leading-7 text-coolGray-500">{t("apropos.p4")}</p>
                        <p className="font-paragraphe mb-6 text-lg leading-7 text-coolGray-500">{t("apropos.p5")}</p>
                    </div>
                    <div className="w-full lg:w-1/2 px-4">
                        <div className="border-4 border-orange border-opacity-45 rounded-3xl overflow-hidden mb-6 lg:mb-0">
                            <img className="w-full" src="/imgs/Transparence.jpg" alt=""/>
                        </div>
                    </div>
                    <div className="mt-12 w-full lg:w-1/2 px-4">
                        <img className="border-4 border-orange border-opacity-45 rounded-3xl overflow-hidden" src="/imgs/garantie.jpg" alt=""/>
                    </div>
                    <div className="mt-12 w-full lg:w-1/2 px-4 mb-5 lg:mb-0">
                        <h4 className="font-titre text-left mb-4 text-3xl md:text-3xl text-coolGray-900 font-bold">What is Lorem Ipsum?</h4>
                        <p className="font-paragraphe mb-6 text-lg leading-7 text-coolGray-500">{t("apropos.p1")}</p>
                        <p className="font-paragraphe mb-6 text-lg leading-7 text-coolGray-500">{t("apropos.p2")}</p>
                        <p className="font-paragraphe mb-6 text-lg leading-7 text-coolGray-500">{t("apropos.p3")}</p>
                        <p className="font-paragraphe mb-6 text-lg leading-7 text-coolGray-500">{t("apropos.p4")}</p>
                        <p className="font-paragraphe mb-6 text-lg leading-7 text-coolGray-500">{t("apropos.p5")}</p>
                    </div>
                </div>
                <div className="max-w-2xl mx-auto mt-12">
                    <h4 className="font-titre my-12 text-center mb-4 text-4xl md:text-4xl text-coolGray-900 font-bold">Pour nous retrouver</h4>
                    <div className="flex justify-center">
                        <iframe
                            className='rounded-3xl shadow-2xl w-full md:w-auto'
                            title="Google Maps"
                            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11175.893468333243!2d-73.5532995!3d45.5508613!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc91bf5bacbeffd%3A0x68ff300997eff5c!2sColl%C3%A8ge%20de%20Maisonneuve!5e0!3m2!1sfr!2sca!4v1720073635193!5m2!1sfr!2sca"
                            width="600"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default APropos;
