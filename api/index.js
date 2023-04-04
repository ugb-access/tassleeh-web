

import { toast } from "react-toastify"
// import store from "../Store"

export const api = (path, body, method = "POST") => {
    const options = {
        method,
        headers: {
            'content-type': 'application/json',
            // Authorization: store.getState().token
        },
    }

    if (body) {
        options.body = JSON.stringify(body)
    }
    return fetch(path, options)
        .then(res => res.json())
        .then(json => {
            // console.log('-->', path, method, json.success ? "✅" : "❌",
            //     '\nbody:', body,
            //     '\nres:', json, '\n------------------\n',
            // )
            return json

        })
        .catch(err => {
            console.log('-->', path, method, "❌",
                '\nbody:', JSON.stringify(body), "\n", err.message)
            // alert(err.message)
            toast.error(err.message)

            return {
                success: false,
                message: err.message
            }
        })

}


export default api