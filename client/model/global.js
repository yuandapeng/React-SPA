import axios from "axios";
export default function global(state = {result:[]}, action) {
    const {payload,type}=action;
    switch (type) {
        case 'SAVE_USER_LIST':
            return {...state,...payload};
        default:
            return state
    }
}

export const getBlog =()=>{
    return (dispatch)=>{
        axios({
            method: "get",
            url: "/getBlob",
            dataType: "json",
        }).then((res)=>{
            dispatch({
                type:"SAVE_USER_LIST",
                payload:res.data
            });
        })
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

