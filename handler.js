'use strict';
const { requestMassApiChurches, getChurchesFormatted } = require('./masstime_api');

async function main(event) {
  try {
    const lat = 40.419;
    const lng = -80.574;
    const { status, body: data } = await requestMassApiChurches(lat, lng);
    if (status === 200 && data && data.length) {
      const churchesFormatted = getChurchesFormatted(data);
      return {
        statusCode: status,
        body: JSON.stringify(churchesFormatted)
      }
    }

    return {
      statusCode: status,
      body: data
    };

  } catch (e) {
    console.log(e);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Hi, I'm a generic error. Please see the logs to see more details."
      })
    };
  }
}

module.exports.index = async event => {
  return await main(event);
};