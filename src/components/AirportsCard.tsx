/* eslint-disable camelcase */
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeEurope, faPlaneArrival, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons';
import { DuffelContext } from '../App';
import OptionsCard from './OptionsCard';

type Airport = {
    city: string;
    city_name: string;
    iata_code: string;
    iata_country_code: string;
    icao_code: string;
    id: string;
    latitude: number;
    longitude: number;
    name: string;
    time_zone: string;
};

type Departure = Partial<Airport>;
type Arrival = Partial<Airport>;

type Airports = {
    departure: Departure;
    arrival: Arrival;
};

const airportsCardIS: Airports = {
    departure: {} as Departure,
    arrival: {} as Arrival,
};

async function fetchData(url: string) {
    const response = await fetch(url);

    const json = await response.json();

    return json;
}

type subComponentProp = {
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    onBlur: () => void;
    initialValue: string;
    data: Array<Airport>;
};

const DepartureComponent = ({ onChange, onBlur, initialValue, data }: subComponentProp) => {
    return (
        <div className="departure">
            <FontAwesomeIcon className="faStyle fa-2x" icon={faPlaneDeparture} />
            <span>Choose a departure airport</span>
            <select
                id="departure"
                name="departure"
                placeholder="Departure"
                className="input-med"
                onChange={onChange}
                onBlur={onBlur}
                value={initialValue}
            >
                <option value="NONE">Airports</option>
                {data.map((airport) => (
                    <option key={airport.id} value={airport.iata_code}>
                        {airport.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

const ArrivalComponent = ({ onChange, onBlur, initialValue, data }: subComponentProp) => {
    return (
        <div className="arrival">
            <FontAwesomeIcon className="faStyle fa-2x" icon={faPlaneArrival} />
            <span>Choose a destination airport</span>
            <select
                id="arrival"
                name="arrival"
                placeholder="Arrival"
                className="input-med"
                onChange={onChange}
                onBlur={onBlur}
                value={initialValue}
            >
                <option value="NONE">Airports</option>
                {data.map((airport) => (
                    <option key={airport.id} value={airport.iata_code}>
                        {airport.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

const AirportsCard = (): JSX.Element => {
    const { dispatch } = useContext(DuffelContext);

    const {
        state: { airports },
    } = useContext(DuffelContext);

    const [listOfairports, setListOfAirports] = useState([]);

    const [airportsCard, setAirportsCard] = useState(airports || airportsCardIS);

    const getAirports = async (url: string) => {
        const airports = await fetchData(url);
        setListOfAirports(airports);
    };

    useEffect(() => {
        const URL = `/.netlify/functions/airports`;
        getAirports(URL);
    }, []);

    const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const { name, value } = e.target;

        switch (name) {
            case 'departure':
                setAirportsCard({ ...airportsCard, departure: value });
                break;
            case 'arrival':
                setAirportsCard({ ...airportsCard, arrival: value });
                break;
            default:
                break;
        }
    };

    const handleOnBlur = (): void => {
        dispatch({ type: 'setAirports', value: airportsCard });
    };

    return (
        <>
            <div className="airportsCard">
                <header>
                    <FontAwesomeIcon className="faStyle fa-3x" icon={faGlobeEurope} />
                    <span>Information</span>
                </header>
                <div className="airports">
                    <DepartureComponent
                        onChange={handleOnChange}
                        onBlur={handleOnBlur}
                        initialValue={airportsCard.departure}
                        data={listOfairports}
                    />
                    <ArrivalComponent
                        onChange={handleOnChange}
                        onBlur={handleOnBlur}
                        initialValue={airportsCard.arrival}
                        data={listOfairports}
                    />
                </div>
                <OptionsCard />
            </div>
        </>
    );
};

export default AirportsCard;
