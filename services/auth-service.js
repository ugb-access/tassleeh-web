import axios from "axios";
import { apiUrl } from "../config";

export function loginUser(data) {
	return axios({
		method: "POST",
		url: `${apiUrl}user/login`,
		data,
		headers: {
			accept: "application/json",
		},
	});
}
export function signupUserCheck(data) {
	return axios({
		method: "POST",
		url: `${apiUrl}user/check`,
		data,
	});
}
export function signupUser(data) {
	return axios({
		method: "POST",
		url: `${apiUrl}user/signup`,
		data,
	});
}
export function forgotPassUser(data) {
	return axios({
		method: "GET",
		url: `${apiUrl}user/reset-pass-otp/${data}`,
		data,
	});
}
export function resetPassword(email, data) {
	return axios({
		method: "PUT",
		url: `${apiUrl}user/reset/password/${email}`,
		data,
	});
}
export function postJobUser(data) {
	return axios({
		method: "POST",
		url: `${apiUrl}job/add`,
		data,
	});
}
export function editProfile(data) {
	return axios({
		method: "PUT",
		url: `${apiUrl}user/edit/${data._id}`,
		data,
	});
}
export function getJobData(data) {
	return axios({
		method: "GET",
		url: `${apiUrl}job/get/by/owner/${data}`,
	});
}
export function deleteJob(itemId) {
	return axios({
		method: "DELETE",
		url: `${apiUrl}job/delete/${itemId}`,
	});
}
export function editJob(data) {
	return axios({
		method: "PUT",
		url: `${apiUrl}job/edit/${data._id}`,
		data,
	});
}
export function getJobApplications(data) {
	return axios({
		method: "GET",
		url: `${apiUrl}jobApplication/get/by/id/${data}`,
	});
}
export function getJobApplicationsBusiness(data) {
	return axios({
		method: "GET",
		url: `${apiUrl}jobApplication/get/by/business/${data}`,
	});
}

export function getJobsByLatLng(data) {
	return axios({
		method: "POST",
		url: `${apiUrl}job/get/by/lat/long/web`,
		data,
	});
}
export function userApplyJob(data) {
	return axios({
		method: "POST",
		url: `${apiUrl}jobApplication/add`,
		data,
	});
}
export function verificationEmail(data) {
	return axios({
		method: "GET",
		url: `${apiUrl}user/send-ottp/${data}`,
	});
}
export function userNewsLetter(data) {
	return axios({
		method: "POST",
		url: `${apiUrl}newsLetter/add`,
		data,
	});
}
export function userMakeCv(data) {
	return axios({
		method: "POST",
		url: `${apiUrl}cv/add`,
		data,
	});
}
export function jobEdit(data) {
	const payload = {
		...data,
		_id: data.onlyStatus ? undefined : data._id,
		onlyStatus: undefined,
	};
	return axios({
		method: "PUT",
		url: `${apiUrl}jobApplication/edit/${data._id}`,
		data: payload,
	});
}
export function getAllBlogs() {
	return axios({
		method: "GET",
		url: `${apiUrl}blog/get/`,
	});
}
export function blogGetByID(data) {
	return axios({
		method: "GET",
		url: `${apiUrl}blog/get/by/id/${data}`,
	});
}
export function getWebStat() {
	return axios({
		method: "GET",
		url: `${apiUrl}job/get/web/stat/`,
	});
}
// business dashboard
export function businessDashboardCards(data) {
	return axios({
		method: "GET",
		url: `${apiUrl}transaction/get/by/business/${data}`,
	});
}
export function businessProfitChart(data) {
	return axios({
		method: "GET",
		url: `${apiUrl}job/get/for/business/${data}`,
	});
}

export function businessBarChart(data) {
	return axios({
		method: "GET",
		url: `${apiUrl}jobApplication/get/by/weekly/${data}`,
	});
}
export function businessJobSuccess(data) {
	return axios({
		method: "GET",
		url: `${apiUrl}jobApplication/get/hiring/rate/${data}`,
	});
}
export function businessJobApplications(data) {
	return axios({
		method: "GET",
		url: `${apiUrl}jobApplication/get/by/business/${data}`,
	});
}
export function employeeDashboardCards(data) {
	return axios({
		method: "GET",
		url: `${apiUrl}transaction/get/by/employ/${data}`,
	});
}
export function employeeProfitChart(data) {
	return axios({
		method: "GET",
		url: `${apiUrl}jobApplication/get/by/employ/${data}`,
	});
}
export function employeeBarChart(data) {
	return axios({
		method: "GET",
		url: `${apiUrl}job/get/for/employ/weekly/${data}`,
	});
}
export function employeeHiring(data) {
	return axios({
		method: "GET",
		url: `${apiUrl}jobApplication/get/hiring/rate/for/employ/${data}`,
	});
}
export function getAllJobs() {
	return axios({
		method: "GET",
		url: `${apiUrl}job/get`,
	});
}
export function customerCareAdd(data) {
	return axios({
		method: "POST",
		url: `${apiUrl}customerCare/add`,
		data,
	});
}
export function getUsers() {
	return axios({
		method: "GET",
		url: `${apiUrl}user/get/all/`,
	});
}
export function getUserDetails(data) {
	return axios({
		method: "GET",
		url: `${apiUrl}user/get/by/id/${data}`,
	});
}

export function getPlans() {
	return axios({
		method: "GET",
		url: `${apiUrl}plan/get`,
	});
}
export function transactionAdd(data) {
	return axios({
		method: "POST",
		url: `${apiUrl}transaction/add`,
		data,
	});
}
export function getBusinessTransactionsById(data) {
	return axios({
		method: "GET",
		url: `${apiUrl}transaction/get/by/user/${data}`,
	});
}
