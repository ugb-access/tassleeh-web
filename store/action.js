import { LOGOUT, SET_ACCOUNTS, SET_RECIPIENTS, SET_USER } from "./actionTypes";



const setUsers = (payload) => ({
    type: SET_USER,
    payload,
});

const logout = () => ({
    type: LOGOUT,

});

const setAccounts = (payload) => ({
    type: SET_ACCOUNTS,
    payload,
});
const setRecipients = payload => ({ type: SET_RECIPIENTS, payload, });


export default {
    setUsers,
    logout,
    setAccounts,
    setRecipients
};