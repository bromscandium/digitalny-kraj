import Banner from "../components/Banner/Banner.jsx";
import React from "react";
import MapComponent from "../components/Map/MapComponent.jsx";
import PlaceInfo from "../components/PlaceInfo/PlaceInfo.jsx";

function Tourism() {
    return (
        <main>
            <Banner id="turizm" />
            <PlaceInfo />
            <MapComponent />
        </main>
    );
}

export default Tourism;
