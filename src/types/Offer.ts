/* eslint-disable camelcase */

export type Owner = {
    iata_code: string;
    id: string;
    name: string;
};

export type Aircraft = {
    iata_code: string;
    id: string;
    name: string;
};

export type MarketingCarrier = {
    iata_code: string;
    id: string;
    name: string;
};

export type OperatingCarrier = {
    iata_code: string;
    id: string;
    name: string;
};

export type Baggage = {
    quantity: number;
    type: string;
};

export type Passenger = {
    cabin_class: string;
    passenger_id: string;
    baggages: Array<Baggage>;
};

export type Destination = {
    iata_code: string;
};

export type Origin = {
    iata_code: string;
};

export type Segment = {
    aircraft: Aircraft;
    arriving_at: string;
    departing_at: string;
    destination: Destination;
    destination_terminal: string;
    distance: number;
    duration: string;
    id: string;
    marketing_carrier: MarketingCarrier;
    marketing_carrier_flight_number: string;
    operating_carrier: OperatingCarrier;
    operating_carrier_flight_number: string;
    origin: Origin;
    origin_terminal: string;
    passengers: Array<Passenger>;
};

export type Slice = {
    duration: string;
    segments: Array<Segment>;
    fare_brand_name: string;
};

export type Offer = {
    base_amount: number;
    base_currency: string;
    id: string;
    tax_amount: number;
    tax_currency: number;
    total_amount: number;
    total_currency: string;
    total_emissions_kg: number;
    owner: Owner;
    slices: Array<Slice>;
};
