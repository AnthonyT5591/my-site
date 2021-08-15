import privateData from '../private/secret.json'

export default async function ApiRequest(url, requestType) {
    let requestKey;
    let requestTokenType;

    let defaultEndpoint = privateData.Redirect_Endpoint;
    switch (requestType) {
        case 'RIOT': requestKey = privateData.Riot.Key; requestTokenType = privateData.Riot.TokenType; break;
        case 'VITALS': requestKey = ''; requestTokenType = ''; defaultEndpoint = privateData.Vitals_Endpoint; break;
    }
    let result = await fetch(privateData.Proxy_Url + defaultEndpoint,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': privateData.Proxy_Key,
                'url': url,
                'key': requestKey,
                'tokentype': requestTokenType
            }
        })
        .then(res => res.json())
        .then(res => {
            return JSON.parse(res);
        })

    return result;
}