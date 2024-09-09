import {
    SET_LOADING_TRUE,
    SET_LOADING_FALSE,
} from '../../common/types'

export default (state, action) => {

    switch(action.type){
        
        case SET_LOADING_TRUE:{
            return{
                ...state,
                loading: true
            }
        }
        
        case SET_LOADING_FALSE:{
            return{
                ...state,
                loading: false
            }
        }
        
        default:
            return state

    }
}