import axios from 'axios';
import { CONST_INVEST_PREFIX, CONST_LIST, CONST_PAGE, CONST_INSERT, CONST_UPDATE, CONST_DELETE, CONST_BATCH_DELETE } from '../common/constants'

let base = '';

export const listInvest = params => { return axios.get(`${base}` + CONST_INVEST_PREFIX + CONST_LIST, { params: params }); };

export const pageInvest = params => { return axios.get(`${base}` + CONST_INVEST_PREFIX + CONST_PAGE, { params: params }); };

export const deleteInvest = params => { return axios.get(`${base}` + CONST_INVEST_PREFIX + CONST_DELETE, { params: params }); };

export const batchDeleteInvest = params => { return axios.get(`${base}` + CONST_INVEST_PREFIX + CONST_BATCH_DELETE, { params: params }); };

export const updateInvest = params => { return axios.get(`${base}` + CONST_INVEST_PREFIX + CONST_UPDATE, { params: params }); };

export const insertInvest = params => { return axios.get(`${base}` + CONST_INVEST_PREFIX + CONST_INSERT, { params: params }); };