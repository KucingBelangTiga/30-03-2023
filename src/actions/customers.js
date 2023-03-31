import {
  CREATE_CUSTOMER,
  RETRIEVE_CUSTOMERS,
  UPDATE_CUSTOMER,
  DELETE_CUSTOMER,
  DELETE_ALL_CUSTOMERS,
} from "./types";

import CustomerDataService from "../services/customer.service";

export const createCustomer =
  (firstname, lastname, user_id) => async (dispatch) => {
    try {
      const res = await CustomerDataService.create({
        firstname,
        lastname,
        user_id,
      });

      dispatch({
        type: CREATE_CUSTOMER,
        payload: res.data,
      });

      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };

export const retrieveCustomers = () => async (dispatch) => {
  try {
    const res = await CustomerDataService.getAll();

    dispatch({
      type: RETRIEVE_CUSTOMERS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateCustomer = (customerId, data) => async (dispatch) => {
  try {
    const res = await CustomerDataService.update(customerId, data);

    dispatch({
      type: UPDATE_CUSTOMER,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteCustomer = (customerId) => async (dispatch) => {
  try {
    await CustomerDataService.delete(customerId);

    dispatch({
      type: DELETE_CUSTOMER,
      payload: { customerId },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteAllCustomers = () => async (dispatch) => {
  try {
    const res = await CustomerDataService.deleteAll();

    dispatch({
      type: DELETE_ALL_CUSTOMERS,
      payload: res.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const findCustomersByName = (firstname) => async (dispatch) => {
  try {
    const res = await CustomerDataService.findByName(firstname);

    dispatch({
      type: RETRIEVE_CUSTOMERS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
