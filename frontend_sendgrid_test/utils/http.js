import axios from 'axios'

import { API_ENDPOINT } from '../constants/API_ENDPOINTS'

export const httpGet = async (endpoint, token, data = {}) => {
	return await axios.get(`${API_ENDPOINT}/${endpoint}`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		params: {
			...data
		}
	})
}

export const httpPost = async (endpoint, token, body) => {
	return await axios.post(`${API_ENDPOINT}/${endpoint}`, body, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
	})
}

export const httpPatch = async (endpoint, token, body, id) => {
	return await axios.patch(`${API_ENDPOINT}/${endpoint}/${id}/`, body, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
	})
}

export const httpDelete = async (endpoint, token, id) => {
	return await axios.delete(`${API_ENDPOINT}/${endpoint}/${id}/`, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
	})
}

export const httpPut = async (endpoint, token, body, id) => {
	return await axios.put(`${API_ENDPOINT}/${endpoint}/${id}/`, body, {
		headers: {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
	})
}