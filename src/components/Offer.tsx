/* eslint-disable camelcase */
import React, { useContext } from 'react';
import { DuffelContext } from '../App';
import { Offer } from '../types/Offer';

export enum Currency {
    GBP = '£',
    USD = '$',
    EUR = '€',
}

const IMGPATH = (iataCode: string) => `https://www.gstatic.com/flights/airline_logos/70px/${iataCode}.png`;

async function fetchData(url: string, param = {}) {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ query: param }),
    });
    const res = await response.json();

    console.log('order: ', res);

    return res.data;
}

const currencyConverter = (currency: string) => {
    return Currency[currency as keyof typeof Currency];
};

type subComponentProp = {
    fullDate: string;
};

const DepartureArrivalComponent = ({ fullDate }: subComponentProp): JSX.Element => {
    const [date, time] = fullDate.split('T');

    return (
        <div className="deparr">
            <div className="time">{time.substring(0, 5)}</div>
            <div className="date">{date}</div>
        </div>
    );
};

const OfferComponent = ({
    id,
    owner,
    total_amount,
    total_currency,
    slices,
    tax_amount,
    total_emissions_kg,
}: Partial<Offer>): JSX.Element => {
    const { dispatch } = useContext(DuffelContext);

    const {
        state: { info },
    } = useContext(DuffelContext);

    const firstSlice = slices![0];
    const { duration, fare_brand_name, segments } = firstSlice;
    const segment = segments[0];
    const {
        departing_at,
        arriving_at,
        distance,
        aircraft,
        origin,
        destination,
        origin_terminal,
        destination_terminal,
        passengers,
    } = segment;

    const iata_code_origin = origin.iata_code;
    const iata_code_destination = destination.iata_code;

    const currencySign = currencyConverter(total_currency!);
    const totalAmount =
        currencySign === Currency.GBP ? `${currencySign} ${total_amount}` : `${total_amount} ${currencySign}`;

    // eslint-disable-next-line no-nested-ternary
    const flightDuration = /PT(\d+)H(\d+)?M?/.test(duration)
        ? RegExp.$2
            ? `${RegExp.$1}h${RegExp.$2}mn`
            : `${RegExp.$1}h`
        : 'N/A';

    const { passenger_id } = passengers![0];

    const setOrder = async (url: string, param = {}) => {
        const res = await fetchData(url, param);
        console.log('order: ', res);
    };

    const handleOnClick = () => {
        const ORDERAPI = `/.netlify/functions/orders`;

        const params = {
            offerCurrency: total_currency,
            offerPrice: total_amount,
            offerId: id,
            passengerId: passenger_id,
            info,
        };

        setOrder(`${ORDERAPI}`, params);
    };

    return (
        <div className="offers">
            <div className="top">
                <div className="left">
                    <img src={owner ? IMGPATH(owner?.iata_code) : ''} alt={owner?.name} />
                </div>

                <div className="offers-info">
                    <div className="price">{totalAmount}</div>
                    <div className="duration">{flightDuration}</div>
                    <div className="cabinClass">{fare_brand_name}</div>
                </div>
            </div>

            <div className="middle">
                <DepartureArrivalComponent fullDate={departing_at} />
                <div className="distance">
                    <div className="distance">{distance ? `${Math.round(distance)}km` : 'Distance not available'}</div>
                </div>
                <DepartureArrivalComponent fullDate={arriving_at} />
            </div>

            <div className="offers-overview">
                <h2>Overview</h2>
                <div className="topOverview">
                    <div className="left">
                        <div>{iata_code_origin}</div>
                        <div>Terminal {origin_terminal}</div>
                    </div>
                    <div className="right">
                        <div>{iata_code_destination}</div>
                        <div>Terminal {destination_terminal}</div>
                    </div>
                </div>
                <div className="middleOverview">
                    <div className="aircraft">{aircraft.name}</div>
                    <div className="aircraft">Total Emissions: {total_emissions_kg}kg</div>
                </div>
                <div className="bottomOverview">
                    <div className="left">
                        <div className="">Full price: {total_amount}</div>
                        <div className="">Taxes: {tax_amount}</div>
                    </div>

                    <div className="right">
                        <button type="submit" onClick={handleOnClick}>
                            <div>Book it</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OfferComponent;
