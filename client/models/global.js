import { getWeather } from "@services/global";
export default {
    namespace: 'global',
    state: {

    },
    effects:{
        *getWeather({ payload}, {call, put}) {
            const response = yield call(getWeather, { ...payload });
            return response;
        },
    },
    reducers: {
    
    },
}