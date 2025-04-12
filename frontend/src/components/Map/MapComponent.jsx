import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import './MapComponent.scss';
import Filters from "./Filter.jsx";

const MapComponent = () => {
    const [filters, setFilters] = useState({
        school: true,
        police: true,
        hospital: true,
        post: true,
        restaurant: true,
        urad: true,
        interest: true,
    });

    const handleFilterChange = (type) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [type]: !prevFilters[type]
        }));
    };


    useEffect(() => {
        const map = L.map('map').setView([49.495, 18.809], 11);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        const markersCluster = L.markerClusterGroup();
        map.addLayer(markersCluster);

        const icons = {
            school: L.divIcon({ className: 'school-icon custom-icon', html: '<i class="fas fa-school"></i>', iconSize: [32, 32], iconAnchor: [16, 16] }),
            police: L.divIcon({ className: 'police-icon custom-icon', html: '<i class="fas fa-shield-alt"></i>', iconSize: [32, 32], iconAnchor: [16, 16] }),
            hospital: L.divIcon({ className: 'hospital-icon custom-icon', html: '<i class="fas fa-hospital"></i>', iconSize: [32, 32], iconAnchor: [16, 16] }),
            post: L.divIcon({ className: 'post-icon custom-icon', html: '<i class="fas fa-mail-bulk"></i>', iconSize: [32, 32], iconAnchor: [16, 16] }),
            restaurant: L.divIcon({ className: 'restaurant-icon custom-icon', html: '<i class="fas fa-utensils"></i>', iconSize: [32, 32], iconAnchor: [16, 16] }),
            urad: L.divIcon({ className: 'urad-icon custom-icon', html: '<i class="fas fa-landmark"></i>', iconSize: [32, 32], iconAnchor: [16, 16] }),
            interest: L.divIcon({ className: 'interest-icon custom-icon', html: '<i class="fas fa-map-marker-alt"></i>', iconSize: [32, 32], iconAnchor: [16, 16] })
        };

        const osmTags = {
            school: 'amenity=school',
            police: 'amenity=police',
            hospital: 'amenity=hospital || healthcare=clinic || amenity=clinic',
            post: 'amenity=post_office',
            restaurant: 'amenity=restaurant || amenity=cafe || amenity=fast_food',
            urad: 'office=government || amenity=townhall'
        };

        let allPlaces = [];

        const interestPoints = [
            // Čierne
            { name: 'Trojmedzie - bod, kde sa stretávajú hranice troch štátov', type: 'interest', latlng: [49.520427030261764, 18.851484871998036], address: 'Čierne, Slovensko' },
            { name: 'Šance - Valy - spoločné historické dedičstvo', type: 'interest', latlng: [49.48404380911368, 18.76326039475218], address: 'Čierne, Slovensko' },
            { name: 'Zágrunie - turistická a cyklistická lokalita', type: 'interest', latlng: [49.495231985534666, 18.83618786675386], address: 'Čierne, Slovensko' },
            { name: 'Prameň Zimná voda', type: 'interest', latlng: [48.82980340349171, 17.94147932911483], address: 'Čierne, Slovensko' },
            { name: 'Kostol Jána Pavla II.', type: 'interest', latlng: [49.512715220499, 18.850635940621405], address: 'Čierne, Slovensko' },
            { name: 'Kostol Ignáca z Loyoly', type: 'interest', latlng: [49.49523925412144, 18.821427578420987], address: 'Čierne, Slovensko' },
            { name: 'Hrobka Moravských', type: 'interest', latlng: [49.495, 18.831], address: 'Čierne, Slovensko' },
            { name: 'Pamätník padlých I. a II. svetovej vojny', type: 'interest', latlng: [49.492828917340454, 18.81445283789215], address: 'Čierne, Slovensko' },

            // Skalité
            { name: 'Kostol sv. Jána Krstiteľa', type: 'interest', latlng: [49.50350781869169, 18.894504845658993], address: 'Skalité, Slovensko' },
            { name: 'Kaplnka Povýšenia sv. kríža na Kudlove', type: 'interest', latlng: [49.49982691816591, 18.93672117134441], address: 'Skalité, Slovensko' },
            { name: 'Trojak – Kykuľa', type: 'interest', latlng: [49.51304647317049, 18.949607805265444], address: 'Skalité, Slovensko' },
            { name: 'Lavička zaľúbených', type: 'interest', latlng: [49.51285385573827, 18.94814810082029], address: 'Skalité, Slovensko' },
            { name: 'Projekt troch Krížov – "Skalitské kríže"', type: 'interest', latlng: [49.50640761060227, 18.92924406672858], address: 'Skalité, Slovensko' },
            { name: 'Oddychová zóna a bunker z II. sv. vojny', type: 'interest', latlng: [49.412074478691714, 18.693993348540307], address: 'Skalité, Slovensko' },
            { name: 'Kalvária Sedembolestnej Panny Márie', type: 'interest', latlng: [49.47766023553945, 18.80687157819823], address: 'Skalité, Slovensko' },
            { name: 'Pamätník padlým v 1. sv. vojne', type: 'interest', latlng: [49.49835492026352, 18.915733637944836], address: 'Skalité, Slovensko' },
            { name: 'Pamätník vojakom Červenej armády', type: 'interest', latlng: [49.20139469996061, 18.870406617194547], address: 'Skalité, Slovensko' },

            // Svrčinovec
            { name: 'Svrčinovská lavička pri starom buku', type: 'interest', latlng: [49.51511721795332, 18.94809084906659], address: 'Svrčinovec, Slovensko' },
            { name: 'Studená voda, časť Zátky', type: 'interest', latlng: [49.479, 18.803], address: 'Svrčinovec, Slovensko' },
            { name: 'Vojenské bunkre Tobruk', type: 'interest', latlng: [49.395586859136685, 18.855917439246014], address: 'Svrčinovec, Slovensko' },
            { name: 'Krížová cesta zo Svrčinovca na Závršie', type: 'interest', latlng: [49.48321781527934, 18.79253244473673], address: 'Svrčinovec, Slovensko' },
            { name: 'Kaplnka Sedembolestnej Panny Márie', type: 'interest', latlng: [49.48077277551256, 18.79351117333705], address: 'Svrčinovec, Slovensko' },
            { name: 'Kostol Ružencovej Panny Márie', type: 'interest', latlng: [49.4845342519003, 18.79339483084244], address: 'Svrčinovec, Slovensko' },
            { name: 'Pamätný dom, škola na kopaniciach Za vrchami', type: 'interest', latlng: [49.42446322292812, 18.690028879612903], address: 'Svrčinovec, Slovensko' }
        ];

        async function loadPlaces(type) {
            if (type === 'interest') {
                return interestPoints;
            }

            const overpassUrl = 'https://overpass-api.de/api/interpreter';
            const bbox = '49.47,18.78,49.51,18.9';
            const filters = osmTags[type].split('||').map(f => f.trim());
            const filterQuery = filters.map(f => `node[${f}](${bbox});way[${f}](${bbox});relation[${f}](${bbox});`).join('');

            const query = `[out:json];(${filterQuery});out center;`;

            try {
                const response = await fetch(`${overpassUrl}?data=${encodeURIComponent(query)}`);
                const data = await response.json();
                return data.elements.map(item => {
                    const lat = item.lat || item.center?.lat;
                    const lon = item.lon || item.center?.lon;
                    if (!lat || !lon) return null;
                    return {
                        type,
                        name: item.tags?.name || `${type} (без назви)`,
                        address: item.tags?.['addr:street'] || 'Невідома адреса',
                        latlng: [lat, lon]
                    };
                }).filter(Boolean);
            } catch (error) {
                console.error(`Помилка при завантаженні ${type}:`, error);
                return [];
            }
        }

        function addMarkers(places) {
            markersCluster.clearLayers();
            places.forEach(place => {
                if (filters[place.type]) {
                    const marker = L.marker(place.latlng, { icon: icons[place.type] })
                        .bindPopup(`
                            <div class="popup-content">
                                <div class="popup-title">${place.name}</div>
                                <div class="popup-type">${place.type === 'interest' ? 'Зважимість' : place.type.charAt(0).toUpperCase() + place.type.slice(1)}</div>
                                <div class="popup-address">${place.address}</div>
                            </div>
                        `);
                    markersCluster.addLayer(marker);
                }
            });
        }

        async function loadAllPlaces() {
            const placeTypes = Object.keys(osmTags);
            placeTypes.push('interest'); // Додаємо інтереси до типів
            allPlaces = (await Promise.all(placeTypes.map(loadPlaces))).flat();
            addMarkers(allPlaces);
        }

        loadAllPlaces();

        return () => {
            if (map && map.remove) map.remove();
        };
    }, [filters]);

    return (
        <div className="map-wrapper">
            <div className="map-container-wrapper">
                <Filters filters={filters} handleFilterChange={handleFilterChange} />
                <div id="map" className="map-container" />
            </div>
        </div>
    );
};

export default MapComponent;
