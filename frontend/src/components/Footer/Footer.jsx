import React, {useState} from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import './Footer.scss'
import { useTranslation } from "react-i18next";
import i18n from '../../i18n.js'

const Footer = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    //hook for access for translate
    const { t, i18n } = useTranslation();

    const navigate = useNavigate()

    const handleProfileClick = (e) => {
        e.preventDefault()
        if (isLoggedIn) {
            navigate('/profile')
        } else {
            navigate('/login')
        }
    }

    return (
        <footer>
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-column">
                        <h3>{t("footer-column-h3-1")}</h3>
                        <p>
                            {t("footer-column-p-1-1")}<br/>{t("footer-column-p-1-2")}
                        </p>
                    </div>

                    <div className="footer-column">
                        <h3>{t("footer-column-h3-2")}</h3>
                        <ul>
                            <li><NavLink to="/" end>{t("footer-column-li-1")}</NavLink></li>
                            <li><NavLink to="/tourism">{t("footer-column-li-2")}</NavLink></li>
                            <li><NavLink to="/home">{t("footer-column-li-3")}</NavLink></li>
                            <li><NavLink to="/tourism">{t("footer-column-li-4")}</NavLink></li>
                            <li><NavLink to="/kontakty">{t("footer-column-li-5")}</NavLink></li>
                        </ul>
                    </div>

                    <div className="footer-column">
                        <h3>{t("footer-column-h3-3")}</h3>
                        <ul>
                            <li>
                                <a href="#" onClick={handleProfileClick}>{t("footer-column-li-2-1")}</a>
                            </li>
                            <li>
                                <a href="#" onClick={handleProfileClick}>{t("footer-column-li-2-2")}</a>
                            </li>
                            <li>
                                <a href="#" onClick={handleProfileClick}>{t("footer-column-li-2-3")}</a>
                            </li>
                            <li>
                                <a href="#" onClick={handleProfileClick}>{t("footer-column-li-2-4")}</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>
                        &copy; 2025 {t("footer-column-h3-1")}. {t("footer-bottom-p")}.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
