'use strict';
const { requestMassApiChurches, getChurchesFormatted } = require('./masstime_api');
const { getQueryParams, makeResponse } = require('./helper');

async function main(event) {
  try {
    const { lat, lng } = getQueryParams(event);
    const { status, body: data, headers } = await requestMassApiChurches(lat, lng);

    if (status === 200 && data && data.length) {
      const churchesFormatted = getChurchesFormatted(data);
      return makeResponse(churchesFormatted, headers, status)
    }

    return makeResponse(data, headers, status)

  } catch (e) {
    console.log(e);
    return makeResponse(
        {
          message: "Hi, I'm a generic error. Please see the logs to see more details."
        },
        {},
        400)
  }
}

module.exports.index = async event => {
  return await main(event);
};

// (async () => {
//   const event = {
//     queryStringParameters: {
//       lat: 40.419,
//       lng: -80.574
//     }
//   };
//
//   console.log(await main(event));
// })();