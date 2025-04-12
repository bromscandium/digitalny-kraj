import React from 'react';

const Filters = ({ filters, handleFilterChange }) => {
    const filterIcons = {
        school: 'fas fa-school',
        police: 'fas fa-shield-alt',
        hospital: 'fas fa-hospital',
        post: 'fas fa-mail-bulk',
        restaurant: 'fas fa-utensils',
        urad: 'fas fa-landmark',
        interest: 'fas fa-map-marker-alt',
    };

    return (
        <div className="filters">
            {['school', 'police', 'hospital', 'post', 'restaurant', 'urad', 'interest'].map((filterType) => (
                <label key={filterType}>
                    <input
                        type="checkbox"
                        className="filter"
                        checked={filters[filterType]}
                        onChange={() => handleFilterChange(filterType)}
                    />
                    <div className="filter-label">
                        <div className="filter-icon">
                            <i className={filterIcons[filterType]}></i>
                        </div>
                        {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                    </div>
                </label>
            ))}
        </div>
    );
};

export default Filters;
