// songs under 4 minutes
// by genre
// songs w/w/o features
import React from "react";
import App from "./App.jsx";

const Filter = ({onSort, topTracksSort, setFilters, withFeatures, withoutFeatures}) => {

    return (
        <div className="filter-container">
            <button 
                className='alphabet-filter-btn'
                onClick={onSort}>
                Songs in Alphabetical Order
            </button>
            <button className="top5-btn" onClick={topTracksSort}>Top 5 Songs</button>
            <button className="underfourmin-btn" onClick={setFilters}>Songs Under 4 Minutes</button>
            <button className="features-btn" onClick={withFeatures}>Songs With Features</button>
            <button className="wofeatures-btn" onClick={withoutFeatures}>Songs Without Features</button>
            <button className="reset-btn" onClick={() => onSort()}>Reset Filters</button>
        </div>

    )
}

export default Filter;