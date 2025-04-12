import React from 'react';
import './Kontakty.scss';
import Banner from '../../components/Banner/Banner.jsx';
import { useTranslation } from "react-i18next";
import i18n from '../../i18n.js'

//це все дуже потужно, але мені массив потрібен в компоненті, адже тільки в тій області видимості діє перекладач

const Contacts = () => {
    //hook for access for translate
    const { t, i18n } = useTranslation();

    const contactDepartments = [
        {
            title: t("contact-1-title"),
            name: 'Mgr. Martina Kučerová',
            phone: '+421 43 123 4567',
            email: 'sekretariat@obecierne.sk',
        },
        {
            title: t("contact-2-title"),
            phone: '+421 41 2205',
            email: 'evidencia@obecierne.sk',
        },
        {
            title: t("contact-3-title"),
            phone: '+421 41 2206',
            email: 'matrika@obecierne.sk',
        },
        {
            title: t("contact-4-title"),
            phone: '+421 41 2207',
            email: 'stavebny@obecierne.sk',
        },
        {
            title: t("contact-5-title"),
            phone: '+421 41 2208',
            email: 'enviro@obecierne.sk',
        },
        {
            title: t("contact-6-title"),
            phone: '+421 41 2209',
            email: 'majetok@obecierne.sk',
        },
    ];

    //це все дуже добре, а треба прописати звичайний ретурн компоненту
    return (
        <section className="contacts">
            <div className="banner-wrapper">
                <Banner id="kontakty"/>
            </div>

            <div className="container">
                <div className="office-hours-container">
                    <h2>{t("office-hours-container-h2-1")}</h2>
                    <div className="office-hours-grid">
                        <div className="office-block">
                            <h3>{t("office-block-h3-1")}</h3>
                            <ul>
                                <li><strong>{t("pon")}:</strong> 7:30–11:30 / 12:00–15:00</li>
                                <li><strong>{t("utor")}:</strong> 7:30–11:30 / 12:00–15:00</li>
                                <li><strong>{t("str")}:</strong> 7:30–11:30 / 12:00–15:00</li>
                                <li><strong>{t("stvr")}:</strong> {t("closed")}</li>
                                <li><strong>{t("pia")}:</strong> 7:30–11:30 / 12:00–15:00</li>
                            </ul>
                        </div>

                        <div className="office-block">
                            <h3>{t("office-block-h3-2")}</h3>
                            <ul>
                                <li><strong>{t("pon")}:</strong> {t("closed1")}</li>
                                <li><strong>{t("utor")}:</strong> {t("closed1")} <br/><em>{t("obecny")}</em></li>
                                <li><strong>{t("str")}:</strong> 7:30–11:30 / 12:00–17:00</li>
                                <li><strong>{t("stvr")}:</strong> {t("studijka-pidary")}</li>
                                <li><strong>{t("pia")}:</strong> 7:30–11:30 / 12:00–17:00</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="contact-section general-contacts">
                    <h2>{t("ob-contact")}</h2>
                    {contactDepartments.map((dept, i) => (
                        <div className="contact-department" key={i}>
                            <h3>{dept.title}</h3>
                            <p>
                                {dept.name && (<>{dept.name}<br/></>)}
                                Tel.: <a href={`tel:${dept.phone.replace(/\s/g, '')}`}>{dept.phone}</a><br/>
                                E-mail: <a href={`mailto:${dept.email}`}>{dept.email}</a>
                            </p>
                        </div>
                    ))}
                </div>

                <div className="contact-form-extended">
                    <h2>{t("contact-form-extended-h2-1")}</h2>
                    <p>{t("contact-form-extended-p-1")}</p>
                    <form>
                        {[
                            {id: 'meno', label: t("name-sub"), required: true},
                            {id: 'adresa', label: t("address"), required: true},
                            {id: 'telefon', label: t("telef"), type: 'tel'},
                            {id: 'email', label: 'E-mail', type: 'email', required: true},
                            {id: 'predmet', label: t("subject"), required: true},
                        ].map(({id, label, type = 'text', required}) => (
                            <div className="form-group" key={id}>
                                <label htmlFor={id}>{label}{required && <span className="required">*</span>}</label>
                                <input type={type} id={id} name={id} placeholder={`Zadajte ${label.toLowerCase()}`}
                                       required={required}/>
                            </div>
                        ))}

                        <div className="form-row">
                            {[{id: 'obec', label: `${t("ob")} / ${t("city")}`}, {id: 'psc', label: 'PSČ'}].map(({id, label}) => (
                                <div className="form-group half-width" key={id}>
                                    <label htmlFor={id}>{label}<span className="required">*</span></label>
                                    <input type="text" id={id} name={id} placeholder={`${t("enter")} ${label.toLowerCase()}`}
                                           required/>
                                </div>
                            ))}
                        </div>

                        <div className="form-group">
                            <label htmlFor="obsah">{t("size")}<span className="required">*</span></label>
                            <textarea id="obsah" name="obsah" rows="4" required placeholder={t("send-mess")}/>
                        </div>

                        <div className="form-group checkbox-group">
                            <input type="checkbox" id="copyToEmail" name="copyToEmail"/>
                            <label htmlFor="copyToEmail">{t("copyToEmail")}</label>
                        </div>

                        <button type="submit" className="button">{t("submit")}</button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Contacts;