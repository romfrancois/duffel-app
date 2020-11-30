import React, { useReducer, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRoute } from '@fortawesome/free-solid-svg-icons';
import AirportsCard from './components/AirportsCard';
import { DuffelApp } from './types/DuffelApp';
import { Airports } from './types/Airports';
import { Info } from './types/Info';
import { Options } from './types/Options';
import InfoCard from './components/InfoCard';
import OfferComponent from './components/Offer';
import { Offer } from './types/Offer';

async function fetchData(url: string, param = {}) {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ query: param }),
    });
    const res = await response.json();

    return res.data;
}

type Action =
    | { type: 'setInfo'; value: Info }
    | { type: 'setAirports'; value: Airports }
    | { type: 'setOptions'; value: Options };

type contextProp = {
    dispatch: React.Dispatch<Action>;
    state: DuffelApp;
};

export const DuffelContext = React.createContext({} as contextProp);

function duffelReducer(state: DuffelApp, action: Action) {
    switch (action.type) {
        case 'setInfo':
            return {
                ...state,
                info: action.value,
            };
        case 'setAirports':
            return {
                ...state,
                airports: action.value,
            };
        case 'setOptions':
            return {
                ...state,
                options: action.value,
            };
        default:
            return state;
    }
}

const duffelIS: DuffelApp = {
    info: {} as Info,
    airports: {} as Airports,
    options: {} as Options,
};

const App = (): JSX.Element => {
    const [duffelAppState, dispatch] = useReducer(duffelReducer, duffelIS);

    const [offers, setOffers] = useState([]);

    const getOffers = async (url: string, param = {}) => {
        const res = await fetchData(url, param);
        setOffers(res.offers);
    };

    const handleOnClick = () => {
        console.log('Crunching data!');

        const SEARCHAPI = `/.netlify/functions/search`;

        const params = {
            from: duffelAppState.airports.departure,
            to: duffelAppState.airports.arrival,
            departureDate: duffelAppState.options.start,
            cabinClass: duffelAppState.options.cabinClass,
        };

        getOffers(`${SEARCHAPI}`, params);
    };

    return (
        <>
            <div className="container">
                <DuffelContext.Provider value={{ state: duffelAppState, dispatch }}>
                    <InfoCard />
                    <AirportsCard />
                </DuffelContext.Provider>
            </div>

            <button type="submit" onClick={handleOnClick}>
                <FontAwesomeIcon className="faStyle fa-3x" icon={faRoute} />

                <span>Submit data</span>
            </button>

            <div className="offers-container">
                <DuffelContext.Provider value={{ state: duffelAppState, dispatch }}>
                    {offers?.map((offers: Offer) => (
                        <OfferComponent key={offers.id} {...offers} />
                    ))}
                </DuffelContext.Provider>
            </div>
        </>
    );
};

export default App;
