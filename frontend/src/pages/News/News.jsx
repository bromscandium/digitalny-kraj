import React, { useState } from "react";
import Banner from "../../components/Banner/Banner.jsx";
import newsData from "../../mock/News.js";
import "./News.scss";

const News = () => {
    const [startIndex, setStartIndex] = useState(0);
    const visibleCount = 3;

    const handlePrev = () => {
        setStartIndex((prev) =>
            prev === 0 ? newsData.length - visibleCount : prev - visibleCount
        );
    };

    const handleNext = () => {
        setStartIndex((prev) =>
            prev + visibleCount >= newsData.length ? 0 : prev + visibleCount
        );
    };

    const visibleNews = newsData.slice(startIndex, startIndex + visibleCount);

    return (
        <main className="news-page">
            <Banner id="noviny" />

            <section className="news-list">
                <div className="container">
                    <div className="news-carousel">
                        <button className="carousel-arrow left" onClick={handlePrev}>
                            &#10094;
                        </button>

                        <div className="news-grid">
                            {visibleNews.map((news) => (
                                <div className="news-card" key={news.id}>
                                    <div className="news-image">
                                        <img src={news.image} alt={news.title} />
                                    </div>
                                    <div className="news-content">
                                        <h3>{news.title}</h3>
                                        <p className="news-excerpt">{news.description}</p>
                                        <div className="news-meta">
                                            <p className="news-date">{news.date}</p>
                                            <div className="news-tags">
                                                {news.tags?.map((tag, index) => (
                                                    <span key={index} className="tag">{tag}</span>
                                                ))}
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            ))}
                        </div>

                        <button className="carousel-arrow right" onClick={handleNext}>
                            &#10095;
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default News;
