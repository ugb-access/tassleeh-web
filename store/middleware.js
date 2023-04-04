import store from "."
import { getRecipientsMethod, readRecipientMethod } from "../api/apiMethods"
import actions from "./action"


const _getRecipients = () => async (dispatch) => {

    const { _id } = store.getState().user
    return getRecipientsMethod(_id).then(res => {
        if (res?.success) {
            dispatch(actions.setRecipients(res.result))
            // getData(res.result, dispatch)
        }
        return true

    })

}
const _readMessages = (cid) => async (dispatch) => {

    const { _id } = store.getState().user
    return readRecipientMethod(cid, _id).then(res => {
        if (res?.success) {
            dispatch(_getRecipients())
            // getData(res.result, dispatch)
        }
        return true

    })

}

const getData = (recipients, dispatch) => {
    const { user, } = store.getState()

    // if (user && recipients) {
    //     let unread = 0

    //     for (let i = 0; i < recipients.temp.length; i++) {
    //         let lastMessages = recipients.newar[i]
    //         unread += getUnReadCount(lastMessages, user._id);
    //     }

    //     dispatch({ type: ACTION_TYPES.SET_UNREAD, payload: unread })
    // }

}

const middleware = {
    _getRecipients,
    _readMessages
}

export default middleware