import axios from "axios";
export default function global(state = {weatherinfo:{}}, action) {
    const {payload,type}=action;
    switch (type) {
        case 'ADD_TODO':
            const {count}=payload;
            return {...state,count};
        case 'ADD_Weather':
            const {weatherinfo}=payload;
            return {...state,weatherinfo};
        default:
            return state
    }
}

export  function getWeather() {
    return (dispatch) => {
        axios({
            method: "get",
            url: "/getWeather",
            dataType: "json",
        }).then((res)=>{
            dispatch({
                type:"ADD_Weather",
                payload:{
                      ...res.data,
                }
            })
        })

    };
}

