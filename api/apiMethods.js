import { PATHS } from "./path";
import api from "./";

export function getRecipientsMethod(id) {
	return api(PATHS.GET_RECIPIENTS + id, null, "GET");
}
export function addRecipientMethod(payload) {
	return api(PATHS.ADD_RECIPIENTS, payload);
}
export function readRecipientMethod(cid, uid) {
	return api(PATHS.READ_MESSAGES + cid + "/" + uid, null, "PUT");
}
