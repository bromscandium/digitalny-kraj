import React, { useState } from "react";
import Banner from "../../components/Banner/Banner.jsx";
import eventsData from "../../mock/Events.js";
import "./Events.scss";

const Events = () => {
    const [startIndex, setStartIndex] = useState(0);
    const visibleCount = 3;

    const handlePrev = () => {
        setStartIndex((prev) =>
            prev === 0 ? eventsData.length - visibleCount : prev - visibleCount
        );
    };

    const handleNext = () => {
        setStartIndex((prev) =>
            prev + visibleCount >= eventsData.length ? 0 : prev + visibleCount
        );
    };

    const visibleEvents = eventsData.slice(startIndex, startIndex + visibleCount);

    return (
        <main className="events-page">
            <Banner id="podujatia" />

            <section className="events-list">
                <div className="container">
                    <div className="events-carousel">
                        <button className="carousel-arrow left" onClick={handlePrev}>
                            &#10094;
                        </button>

                        <div className="events-grid">
                            {visibleEvents.map((event) => (
                                <div className="event-card" key={event.id}>
                                    <div className="event-image">
                                        <img src={event.image} alt={event.title} />
                                    </div>
                                    <div className="event-content">
                                        <h3>{event.title}</h3>
                                        <p className="event-excerpt">{event.description}</p>
                                        <p className="event-date">{event.date}</p>
                                        <div className="event-tags">
                                            {event.tags.map((tag, index) => (
                                                <span key={index} className="tag">{tag}</span>
                                            ))}
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

export default Events;
