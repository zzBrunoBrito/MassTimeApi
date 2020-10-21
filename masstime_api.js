const axios = require('axios');

function filterByService(worship_times, target) {
    return worship_times.filter(worship_time => {
        if (typeof worship_time.service_typename === 'string') {
            return worship_time.service_typename.trim().toUpperCase() === target
        }
    })
}

function getChurchesFormatted(churches) {
    return churches.map(church => {
        if (church && church.church_worship_times.length) {
            const worship_times = church.church_worship_times;
            const confessions = filterByService(worship_times, 'CONFESSIONS');
            const adorations = filterByService(worship_times, 'ADORATIONS');
            const masses = [...filterByService(worship_times, 'WEEKEND'), ...filterByService(worship_times, 'WEEK DAYS'), ];
            return { ...church, church_worship_times: { confessions, adorations, masses } };
        }
        return church;
    });
}

function handleMassApiExceptions(e) {
    if (e.response) {
        return {
            status: e.response.status,
            body: e.response.data,
            headers: e.response.headers
        }
    }

    if (e.request) {
        return {
            status: 400,
            body: 'No response from the server.'
        }
    }


}

async function requestMassApiChurches(lat, lng) {
    try {
        const response = await axios.get(`https://apiv4.updateparishdata.org/Churchs/?lat=${lat}&long=${lng}&pg=1`);
        if (response.data) {
            return { status: response.status, body: response.data, headers: response.headers };
        }
        return { status: response.status, body: {}, headers: response.headers };
    }catch (e) {
        return handleMassApiExceptions(e);
    }
}


module.exports = {
    requestMassApiChurches,
    getChurchesFormatted
}