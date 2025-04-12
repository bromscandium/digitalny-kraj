import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n.js';

const Header = () => {
    const { t } = useTranslation();
    const isLoggedIn = true; // заміни на реальний стан авторизації
    const [menuOpen, setMenuOpen] = useState(false);
    const [language, setLanguage] = useState(
        localStorage.getItem('i18nextLng')?.toUpperCase() || 'SK'
    );

    const handleLanguageChange = (e) => {
        const selectedLanguage = e.target.value;
        setLanguage(selectedLanguage);
        i18n.changeLanguage(selectedLanguage.toLowerCase());
        localStorage.setItem('i18nextLng', selectedLanguage.toLowerCase());
    };

    return (
        <header>
            <div className="container header-container">
                <div className="logo">
                    <div className="logo-text">
                        {t('logo-1')}<span>{t('logo-2')}</span>
                    </div>
                </div>

                <nav className="desktop-nav">
                    <ul>
                        <li><NavLink to="/" end>{t('footer-column-li-1')}</NavLink></li>
                        <li><NavLink to="/news">{t('desktop-nav-li-1-2')}</NavLink></li>
                        <li><NavLink to="/events">{t('desktop-nav-li-1-3')}</NavLink></li>
                        <li><NavLink to="/tourism">{t('desktop-nav-li-1-4')}</NavLink></li>
                        <li><NavLink to="/kontakty">{t('desktop-nav-li-1-5')}</NavLink></li>
                    </ul>
                </nav>

                <div className="auth-and-language">
                    <div className="auth-buttons desktop-auth">
                        {!isLoggedIn ? (
                            <NavLink to="/login" className="btn btn-register" style={{ textDecoration: 'none' }}>
                                {t('reg')}
                            </NavLink>
                        ) : (
                            <NavLink to="/profile" className="btn btn-primary">
                                {t('my-prof')}
                            </NavLink>
                        )}
                    </div>

                    <div className="language-dropdown">
                        <select value={language} onChange={handleLanguageChange}>
                            <option value="SK">SK</option>
                            <option value="PL">PL</option>
                            <option value="CZ">CZ</option>
                        </select>
                    </div>
                </div>

                <div className={`burger ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
                    <span />
                    <span />
                    <span />
                </div>

                <nav className={`sidebar ${menuOpen ? 'open' : ''}`}>
                    <div className="close-btn" onClick={() => setMenuOpen(false)}>&times;</div>
                    <ul>
                        <li><NavLink to="/" end>{t('footer-column-li-1')}</NavLink></li>
                        <li><NavLink to="/news">{t('desktop-nav-li-1-2')}</NavLink></li>
                        <li><NavLink to="/events">{t('desktop-nav-li-1-3')}</NavLink></li>
                        <li><NavLink to="/tourism">{t('desktop-nav-li-1-4')}</NavLink></li>
                        {!isLoggedIn ? (
                            <li><NavLink to="/login" className="mobile-auth">{t('login')}</NavLink></li>
                        ) : (
                            <li><NavLink to="/profile" className="mobile-auth">{t('my-prof')}</NavLink></li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
