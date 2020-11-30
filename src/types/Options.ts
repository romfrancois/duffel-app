export enum CabinClass {
    FIRST = 'first',
    BUSINESS = 'business',
    PREMIUM_ECO = 'premium_economy',
    ECONOMY = 'economy',
}

export type Options = {
    cabinClass: string;
    start: Date;
};
