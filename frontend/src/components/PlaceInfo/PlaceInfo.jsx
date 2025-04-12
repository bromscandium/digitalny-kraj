import React from 'react';
import './PlaceInfo.scss';
import placeDescriptions from '../../mock/Places.js';
import { useTranslation } from "react-i18next";
import i18n from '../../i18n.js'

const PlaceInfo = () => {
    //сука апять переписувати
    //hook for access for translate
    const { t, i18n } = useTranslation();

    placeDescriptions.cierne.name = t("place-name1")
    placeDescriptions.cierne.description = t("place-description1")
    placeDescriptions.cierne.places[0] = t("place-1-place1")
    placeDescriptions.cierne.places[1] = t("place-1-place2")
    placeDescriptions.cierne.places[2] = t("place-1-place3")
    placeDescriptions.cierne.places[3] = t("place-1-place4")
    placeDescriptions.cierne.places[4] = t("place-1-place5")
    placeDescriptions.cierne.places[5] = t("place-1-place6")
    placeDescriptions.cierne.places[6] = t("place-1-place7")
    placeDescriptions.cierne.places[7] = t("place-1-place8")

    placeDescriptions.skalite.name = t("place-name2")
    placeDescriptions.skalite.description = t("place-description2")
    placeDescriptions.skalite.places[0] = t("place-2-place1")
    placeDescriptions.skalite.places[1] = t("place-2-place2")
    placeDescriptions.skalite.places[2] = t("place-2-place3")
    placeDescriptions.skalite.places[3] = t("place-2-place4")
    placeDescriptions.skalite.places[4] = t("place-2-place5")
    placeDescriptions.skalite.places[5] = t("place-2-place6")
    placeDescriptions.skalite.places[6] = t("place-2-place7")
    placeDescriptions.skalite.places[7] = t("place-2-place8")
    placeDescriptions.skalite.places[8] = t("place-2-place9")

    placeDescriptions.svrcinovec.name = t("place-name3")
    placeDescriptions.svrcinovec.description = t("place-description3")
    placeDescriptions.svrcinovec.places[0] = t("place-3-place1")
    placeDescriptions.svrcinovec.places[1] = t("place-3-place2")
    placeDescriptions.svrcinovec.places[2] = t("place-3-place3")
    placeDescriptions.svrcinovec.places[3] = t("place-3-place4")
    placeDescriptions.svrcinovec.places[4] = t("place-3-place5")
    placeDescriptions.svrcinovec.places[5] = t("place-3-place6")
    placeDescriptions.svrcinovec.places[6] = t("place-3-place7")


    return (
        <section className="place-info-wrapper">
            {Object.values(placeDescriptions).map((place) => (
                <div key={place.name} className="place-card">
                    <h2 className="place-title">{place.name}</h2>
                    <p className="place-description">{place.description}</p>
                    <ul className="place-list">
                        {place.places.map((item, index) => (
                            <li key={index} className="place-list-item">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </section>
    );
};

export default PlaceInfo;