/* eslint-disable camelcase */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetch = require('node-fetch');

const headers = {
    'Accept-Encoding': 'gzip',
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Duffel-Version': 'beta',
    Authorization: `Bearer ${process.env.DUFFEL_TOKEN}`,
};

/**
 * Given params passed from the UI, get all available offers between 2 airports.
 */
exports.handler = async (params) => {
    const { query } = JSON.parse(params.body);
    const { from, to, departureDate, cabinClass } = query;

    const requestParam = {
        data: {
            passengers: [
                {
                    type: 'adult',
                },
            ],
            slices: [
                {
                    origin: from,
                    destination: to,
                    departure_date: departureDate,
                },
            ],
            cabin_class: cabinClass,
        },
    };

    const response = await fetch(`https://api.duffel.com/air/offer_requests`, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestParam),
    })
        .then((results) => results.json())
        // eslint-disable-next-line no-console
        .catch((error) => console.error(error));

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(response),
    };
};
