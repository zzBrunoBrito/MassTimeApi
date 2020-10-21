function getQueryParams(event) {
    const querystr = event.queryStringParameters;
    if (querystr) {
        const { lat, long:lng } = querystr;
        return {lat, lng}
    }
    return { lat:'', lng: '' }
}

function makeResponse(body, headers, status) {
    return {
        statusCode: status,
        body: JSON.stringify(body),
        headers: headers
    }
}


module.exports = {
    getQueryParams,
    makeResponse
}