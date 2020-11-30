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

exports.handler = async (params) => {
    const { query } = JSON.parse(params.body);
    const { offerCurrency, offerPrice, offerId, passengerId, info } = query;
    const { contact, dob, title, name, surname } = info;
    const { phone, email } = contact;

    const requestParam = {
        data: {
            passengers: [
                {
                    phone_number: phone,
                    email,
                    born_on: dob,
                    title,
                    gender: 'f',
                    family_name: surname,
                    given_name: name,
                    id: passengerId,
                },
            ],
            payments: [
                {
                    currency: offerCurrency,
                    amount: offerPrice,
                    type: 'balance',
                },
            ],
            selected_offers: [offerId],
        },
    };

    const response = await fetch(`https://api.duffel.com/air/orders`, {
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
