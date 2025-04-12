import { useState } from 'react';
import LoginForm from '../../components/Login/LoginForm';
import RegistrationForm from '../../components/Login/RegistrationForm';
import { useTranslation } from 'react-i18next';
import './Login.scss';

function Login() {
    const [isRegistering, setIsRegistering] = useState(false);
    const { t, i18n } = useTranslation();

    const [language, setLanguage] = useState(i18n.language.toUpperCase());

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng.toLowerCase());
        setLanguage(lng.toUpperCase());
    };

    const handleDropdownChange = (e) => {
        const selected = e.target.value;
        changeLanguage(selected);
    };

    return (
        <div className="auth-page">
            <div className="auth-box">
                <div className="auth-header">
                    <h1>{isRegistering ? t('Register') : t('Login')}</h1>

                    <div className="language-dropdown">
                        <select value={language} onChange={handleDropdownChange}>
                            <option value="SK">SK</option>
                            <option value="CZ">CZ</option>
                            <option value="PL">PL</option>
                        </select>
                    </div>
                </div>

                {isRegistering ? <RegistrationForm /> : <LoginForm />}

                <div className="toggle">
                    <p>
                        {isRegistering
                            ? t('Already have an account?')
                            : t("Don't have an account?")}{' '}
                        <span onClick={() => setIsRegistering(!isRegistering)}>
              {isRegistering ? t('Login') : t('Register')}
            </span>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
