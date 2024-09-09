import React, { createContext, useEffect, useReducer } from 'react'

import GlobalReducer from './globalReducer'

import {
    SET_LOADING_TRUE,
    SET_LOADING_FALSE,
} from '../../common/types'


export const globalInitialState = {
    loading: false,
}

export const GlobalContext = createContext(null)

export const GlobalProvider = ({ children }) => {

    const [globalState, dispatch] = useReducer(
        GlobalReducer,
        globalInitialState,
    )

    const setLoadingTrue = () => {
        dispatch({
            type: SET_LOADING_TRUE,
        })
    }
    const setLoadingFalse = async () => {
        dispatch({
            type: SET_LOADING_FALSE
        })
    }

    return (
        <GlobalContext.Provider
            value={{
                globalState,
                setLoadingTrue,
                setLoadingFalse,
            }}>
            {children}
        </GlobalContext.Provider>
    )

}
