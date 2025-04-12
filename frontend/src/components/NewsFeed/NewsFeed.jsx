import React from "react";
import "./NewsFeed.scss";
import eventData from "../../mock/Events.js";
import newsData from "../../mock/News.js";
import { useTranslation } from "react-i18next";
import i18n from '../../i18n.js'

const NewsFeed = () => {
    //hook for access for translate
    const { t, i18n } = useTranslation();

    for (let i = 0; i < newsData.length; i++) {
        if (i === 0) {
            newsData[i].title = t("news-title-1")
            newsData[i].description = t("news-description-1")
            newsData[i].tags[0] = t("news-1-tag1")
            newsData[i].tags[1] = t("news-1-tag2")
            newsData[i].tags[2] = t("news-1-tag3")
        }
        if (i === 1) {
            newsData[i].title = t("news-title-2")
            newsData[i].description = t("news-description-2")
            newsData[i].tags[0] = t("news-2-tag1")
            newsData[i].tags[1] = t("news-2-tag2")
            newsData[i].tags[2] = t("news-2-tag3")
        }
        if (i === 2) {
            newsData[i].title = t("news-title-3")
            newsData[i].description = t("news-description-3")
            newsData[i].tags[0] = t("news-3-tag1")
            newsData[i].tags[1] = t("news-3-tag2")
            newsData[i].tags[2] = t("news-3-tag3")
        }
        if (i === 3) {
            newsData[i].title = t("news-title-4")
            newsData[i].description = t("news-description-4")
            newsData[i].tags[0] = t("news-4-tag1")
            newsData[i].tags[1] = t("news-4-tag2")
            newsData[i].tags[2] = t("news-4-tag3")
        }
    }

    for (let i = 0; i < eventData.length; i++) {
        if (i === 0) {
            eventData[i].title = t("events-title-1")
            eventData[i].description = t("events-description-1")
            eventData[i].tags[0] = t("events-1-tag1")
            eventData[i].tags[1] = t("events-1-tag2")
            eventData[i].tags[2] = t("events-1-tag3")
        }
        if (i === 1) {
            eventData[i].title = t("events-title-2")
            eventData[i].description = t("events-description-2")
            eventData[i].tags[0] = t("events-2-tag1")
            eventData[i].tags[1] = t("events-2-tag2")
            eventData[i].tags[2] = t("events-2-tag3")
        }
        if (i === 2) {
            eventData[i].title = t("events-title-3")
            eventData[i].description = t("events-description-3")
            eventData[i].tags[0] = t("events-3-tag1")
            eventData[i].tags[1] = t("events-3-tag2")
            eventData[i].tags[2] = t("events-3-tag3")
        }
        if (i === 3) {
            eventData[i].title = t("events-title-4")
            eventData[i].description = t("events-description-4")
            eventData[i].tags[0] = t("events-4-tag1")
            eventData[i].tags[1] = t("events-4-tag2")
            eventData[i].tags[2] = t("events-4-tag3")
        }
    }

    const combinedNews = [
        ...newsData.map(item => ({ ...item, type: "news" })),
        ...eventData.map(item => ({ ...item, type: "event" }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <section className="news-feed">
            <div className="container">
                <div className="section-title">
                    <h2>{t("section-title-h2-1")}</h2>
                    <p>{t("section-title-p-1")}</p>
                </div>
                <div className="news-grid">
                    {combinedNews.slice(0, 6).map((item) => (
                        <div className="news-card" key={item.id}>
                            <div className="news-image">
                                <img src={item.image} alt={item.title} />
                            </div>
                            <div className="news-content">
                                <span className="news-type">
                                    {item.type === "event" ? t("news-type-1") : t("news-type-2")}
                                </span>
                                <h3>{item.title}</h3>
                                <p className="news-description">{item.description}</p>
                                <div className="news-bottom">
                                    <span className="news-date">{item.date}</span>
                                    <div className="news-tags">
                                        {item.tags?.map((tag, i) => (
                                            <span key={i} className="tag">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default NewsFeed;
