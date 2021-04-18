import api from '../../../service/axios';
import { APIFunctionType, APIKey } from '../../../configuration/market.config';

export function findEndpoint(keyword, onSuccess, onError) {
    api.get(`query?function=${APIFunctionType.SYMBOL_SEARCH}&keywords=${keyword}&apikey=${APIKey}`)
        .then(response => {
            onSuccess && onSuccess(modifyData(response.data))
        })
        .catch(error => {
            onError && onError(error)
        })
}

function modifyData({ bestMatches }) {
    return bestMatches.map(object => {
        let newObject = {};
        Object.entries(object).forEach(item => {
            const name = item[0].split(" ")[1];
            const value = item[1];
            newObject[name] = value;
        });
        return newObject;
    })
}
