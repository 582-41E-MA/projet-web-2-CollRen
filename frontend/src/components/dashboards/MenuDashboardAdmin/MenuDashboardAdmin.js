import { Link } from "react-router-dom";

function MenuDashboardAdmin ({t}) {



    return (
        <ul className="flex flex-col gap-2  mx-[4rem] mt-24">

        <li>
            <details className="group">
    
                <summary
                    className="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">
    
                    <span className="flex gap-2">

                        <span>
                            ADMIN
                        </span>
                    </span>
                    <svg className="w-5 h-5 text-gray-500 transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg"
                        width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd"
                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                        </path>
                    </svg>
                </summary>
    
                <article className="px-4 pb-4">
    
                    <ul className="flex flex-col gap-4 pl-2 mt-4">
    
                        <li className="flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                                stroke="currentColor" className="w-6 h-6">
                                <path  
                                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z">
                                </path>
                            </svg>
                            <Link to="/user">
                                {t("MenuDashboardAdmin.itemUser")}
                            </Link>
                        </li>

                        <li className="flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                                stroke="currentColor" className="w-6 h-6">
                                <path  
                                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z">
                                </path>
                            </svg>
                            <Link to="#">
                                {t("MenuDashboardAdmin.itemProduct")}
                            </Link>
                        </li>
    
    
                        <li className="flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                                stroke="currentColor" className="w-6 h-6">
                                <path  
                                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z">
                                </path>
                            </svg>
    
                            <Link to="#">
                                Voitures
                            </Link>
                        </li>
    
    
                        <li className="flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                                stroke="currentColor" className="w-6 h-6">
                                <path 
                                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z">
                                </path>
                            </svg>
    
    
                            <Link to="#">
                                Your contribution
                            </Link>
                        </li>
    
    
                        <li className="flex gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
                                stroke="currentColor" className="w-6 h-6">
                                <path  
                                    d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z">
                                </path>
                                <path   d="M15 12a3 3 0 11-6 0 3 3 0 016 0z">
                                </path>
                            </svg>
    
    
                            <Link to="#">
                                Settings
                            </Link>
                        </li>
    
    
                        <form action="http://127.0.0.1:8000/auth/logout" method="POST">
                            <input type="hidden" name="_token" value="ymEkCLBFpgkdaSbidUArRsdHbER5DkT6ByS3eJYb"/>
                            <button type="submit" className="text-red-500 text-sm px-2 py-1 hover:bg-red-200 rounded-md">
                                Log Out
                            </button>
                        </form>
    
                    </ul>
    
                </article>
    
            </details>
        </li>
    
        <li>
            <details className="group">
    
                <summary
                    className="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">
    
                    <span className="flex gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" className="w-6 h-6">
                            <path 
                                d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
    
                        <span>
                            Voitures
                        </span>
                    </span>
                    <svg className="w-5 h-5 text-gray-500 transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg"
                        width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path 
                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                        </path>
                    </svg>
                </summary>
    
                <article className="px-4 pb-4">
                    <ul className="flex flex-col gap-1 pl-2">
                        <li><Link to="">Ajouter une voiture</Link></li>
                        <li><Link to="">Carburant</Link></li>
                        <li><Link to="/constructeur">Constructeur</Link></li>
                        <li><Link to="">Corps</Link></li>
                        <li><Link to="/model">Modèle</Link></li>
                        <li><Link to="">Motopropulseur</Link></li>
                        <li><Link to="">Transmission</Link></li>
                    </ul>
                </article>
    
            </details>
        </li>
    
        <li>
            <details className="group">
    
                <summary
                    className="flex items-center justify-between gap-2 p-2 font-medium marker:content-none hover:cursor-pointer">
    
                    <span className="flex gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" className="w-6 h-6">
                            <path
                                d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                        </svg>
                        <span>
                            Popular courses
                        </span>
                    </span>
                    <svg className="w-5 h-5 text-gray-500 transition group-open:rotate-90" xmlns="http://www.w3.org/2000/svg"
                        width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path 
                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z">
                        </path>
                    </svg>
    
    
                </summary>
    
                <article className="px-4 pb-4">
                    <ul className="flex flex-col gap-1 pl-2">
                        <li><Link to="">Course title</Link></li>
                        <li><Link to="">Course title</Link></li>
                        <li><Link to="">Course title</Link></li>
                    </ul>
                </article>
    
            </details>
        </li>
    
    </ul>

    )
}

export default MenuDashboardAdmin;