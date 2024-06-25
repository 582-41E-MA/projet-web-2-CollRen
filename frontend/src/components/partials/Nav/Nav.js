function Nav({t}) {

    return (
        <nav className= " flex font-sen text-gray-800">
        <a href="/" className="py-2 px-6 flex3 text-lg">
        {t("navItem.home")}
        </a>
        <a href="#" className="py-2 px-6 flex color-red text-lg">
           {t("navItem.catalogue")}
        </a>
        <a href="/apropos" className="py-2 px-6 flex text-lg">
        {t("navItem.apropos")}
        </a>
        <a href="#" className="py-2 px-6 flex text-lg">
            Contact
        </a>

        <a href="/usercreate" className="py-2 px-6 flex text-lg">
        {t("navItem.signup")}
        </a>

        <a href="/login" className="py-2 px-6 flex text-lg">
            Login
        </a>
    </nav>
    )
}

export default Nav;