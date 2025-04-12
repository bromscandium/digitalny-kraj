import React from "react";
import "./Services.scss";
import { useTranslation } from "react-i18next";
import i18n from '../../i18n.js'


const Services = () => {
    //hook for access for translate
    const { t, i18n } = useTranslation();

    const services = [
        { icon: "fas fa-calendar-check", label: t("service-1") },
        { icon: "fas fa-home", label: t("service-2") },
        { icon: "fas fa-file-signature", label: t("service-3")},
        { icon: "fas fa-id-card", label: t("service-4") },
        { icon: "fas fa-store", label: t("service-5") },
        { icon: "fas fa-receipt", label: t("service-6") },
        { icon: "fas fa-map-marked-alt", label: t("service-7") },
        { icon: "fas fa-ticket-alt", label: t("service-8") },
    ];

    const handleClick = (label) => {
        alert(`${t("alert-serv")}: ${label}`);
    };

    return (
        <section className="services">
            <div className="container">
                <div className="section-title">
                    <h2>{t("service-section-title-h2-1")}</h2>
                    <p>{t("service-section-title-p-1")}</p>
                </div>

                <div className="services-grid">
                    {services.map((item, idx) => (
                        <div
                            key={idx}
                            className="service-icon-card"
                            onClick={() => handleClick(item.label)}
                        >
                            <div className="icon-wrapper">
                                <i className={item.icon}></i>
                            </div>
                            <p>{item.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
