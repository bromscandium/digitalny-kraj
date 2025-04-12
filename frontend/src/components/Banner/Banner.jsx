import React from "react"
import bannerData from "../../mock/Banner.js"
import "./Banner.scss"
import { useTranslation } from "react-i18next";
import i18n from '../../i18n.js'

const Banner = ({ id }) => {
    //hook for access for translate
    const { t, i18n } = useTranslation();

    const banner = bannerData.find((item) => item.id === id)

    if (banner.id === 'home'){
        banner.title = t("banner-title-1")
        banner.description = t("banner-description-1")
    }
    if (banner.id === 'kontakty'){
        banner.title = t("banner-title-2")
        banner.description = t("banner-description-2")
    }
    if (banner.id === 'turizm'){
        banner.title = t("banner-title-3")
        banner.description = t("banner-description-3")
    }
    if (banner.id === 'noviny'){
        banner.title = t("banner-title-4")
        banner.description = t("banner-description-4")
    }
    if (banner.id === 'podujatia'){
        banner.title = t("banner-title-5")
        banner.description = t("banner-description-5")
    }

    if (!banner) return null

    return (
        <section className="banner" style={banner.image ? { backgroundImage: `url(${banner.image})` } : {}}>
            <div className="container">
                <h1>{banner.title}</h1>
                <p>{banner.description}</p>
            </div>
        </section>
    )
}

export default Banner
