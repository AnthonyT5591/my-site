// import privateData from '../private/secret.json'
// import Amplify, { API } from 'aws-amplify';

import { API } from 'aws-amplify';



export default async function ApiRequest(url, requestType) {
    // let requestKey;
    // let requestTokenType;

    // let defaultEndpoint = privateData.Redirect_Endpoint;
    // switch (requestType) {
    //     case 'RIOT': requestKey = privateData.Riot.Key; requestTokenType = privateData.Riot.TokenType; break;
    //     case 'VITALS': requestKey = ''; requestTokenType = ''; defaultEndpoint = privateData.Vitals_Endpoint; break;
    // }
    // Amplify.configure({
    //     // OPTIONAL - if your API requires authentication 
    //     Auth: {},
    //     API: {
    //         endpoints: [
    //             {
    //                 name: "myAPI",
    //                 endpoint: privateData.API_Url
    //             },
    //         ]
    //     }
    // });
    const result = await API.post('myAPI', '/sendRequest', {
        body: {
            outUrl: 'https://cors-anywhere.herokuapp.com/https://jsonplaceholder.typicode.com/posts',
            // key: requestKey,
            // tokenType: requestTokenType
        }
    })
    return result;
}