import privateData from '../private/secret.json'

export default function ApiRequest(url) {
    fetch(privateData.Proxy_Url,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': privateData.Proxy_Key,
                'url': url,
                'key': privateData.Riot.Key,
                'tokentype': privateData.Riot.TokenType
            }
        })
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result);
            },
            (error) => {
                console.log(error);
            }
        )
}