export default function global(state = {}, action) {
    const {payload,type}=action;
    switch (type) {
        case 'ADD_TODO':
            const {count}=payload;
            return {...state,count};
        default:
            return state
    }
}