import request,{ get } from "@utils/request";

console.log(request)
export function getWeather(params) {
    return get('getWeather', params);
}