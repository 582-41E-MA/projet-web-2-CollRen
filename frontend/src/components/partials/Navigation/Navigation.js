function Navigation ({t}) {

    return (
        <nav className="font-sen text-gray-800 dark:text-white uppercase text-lg lg:flex items-center hidden">
        <a href="/" className="py-2 px-6 flex">
            Home
        </a>
        <a href="#" className="py-2 px-6 flex">
           {t("navItem.catalogue")}
        </a>
        <a href="#" className="py-2 px-6 flex">
        {t("navItem.apropos")}
        </a>
        <a href="#" className="py-2 px-6 flex">
            Contact
        </a>
        <a href="#" className="py-2 px-6 flex">
            Carrer
        </a>
    </nav>
    )
}

export default Navigation;