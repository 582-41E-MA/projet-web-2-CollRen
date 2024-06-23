function Navigation ({t}) {

    return (
        <nav className= " flex font-sen text-gray-800">
        <a href="/" className="py-2 px-6 flex3">
        {t("navItem.home")}
        </a>
        <a href="#" className="py-2 px-6 flex color-red">
           {t("navItem.catalogue")}
        </a>
        <a href="#" className="py-2 px-6 flex">
        {t("navItem.apropos")}
        </a>
        <a href="#" className="py-2 px-6 flex">
            Contact
        </a>

        <a href="/usercreate" className="py-2 px-6 flex">
        {t("navItem.signup")}
        </a>

        <a href="/login" className="py-2 px-6 flex">
            Login
        </a>
    </nav>
    )
}

export default Navigation;