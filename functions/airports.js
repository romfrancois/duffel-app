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
 * Recursive function to retrieve all airports from the server.
 * May take up to 5s to load approx 9k airports!
 */
function getAirports(url = 'https://api.duffel.com/air/airports?limit=200', airports = []) {
    return new Promise((resolve, reject) =>
        fetch(url, {
            method: 'GET',
            headers,
        })
            .then((response) => {
                if (response.status !== 200) {
                    throw new Error(`${response.status}: ${response.statusText}`);
                }
                response
                    .json()
                    .then((res) => {
                        const list = airports.concat(res.data);

                        if (res.meta.after) {
                            const urlNext = `${url}&after=${res.meta.after}`;
                            getAirports(urlNext, list).then(resolve).catch(reject);
                        } else {
                            resolve(airports);
                        }
                    })
                    .catch(reject);
            })
            .catch(reject),
    );
}

exports.handler = async () => {
    const response = await getAirports()
        .then((results) => results)
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
