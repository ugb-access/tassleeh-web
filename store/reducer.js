import React from "react";
import { LOGOUT, SET_ACCOUNTS, SET_RECIPIENTS, SET_USER } from "./actionTypes";


const initialState = {
    user: null,
    logged: false,
    accounts: [],
    recipients: [],
};

export default (state = initialState, action) => {

    const { type, payload } = action

    switch (type) {

        case SET_USER: {
            return {
                ...state,
                user: payload,
                logged: true
            };

        }
        case LOGOUT: {
            return {
                ...state,
                user: null,
                logged: false
            };

        }
        case SET_ACCOUNTS: {
            return {
                ...state,
                accounts: payload
            };

        }
        case SET_RECIPIENTS: {
            return {
                ...state,
                recipients: payload
            };

        }




        default:
            return state;
    }
};