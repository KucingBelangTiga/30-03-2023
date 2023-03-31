import {
  CREATE_CUSTOMER,
  RETRIEVE_CUSTOMERS,
  UPDATE_CUSTOMER,
  DELETE_CUSTOMER,
  DELETE_ALL_CUSTOMERS,
} from "../actions/types";

const initialState = [];

function customerReducer(customers = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_CUSTOMER:
      return [...customers, payload];

    case RETRIEVE_CUSTOMERS:
      return payload;

    case UPDATE_CUSTOMER:
      return customers.map((customer) => {
        if (customer.customerId === payload.customerId) {
          return {
            ...customer,
            ...payload,
          };
        } else {
          return customer;
        }
      });

    case DELETE_CUSTOMER:
      return customers.filter(
        ({ customerId }) => customerId !== payload.customerId
      );

    case DELETE_ALL_CUSTOMERS:
      return [];

    default:
      return customers;
  }
}
export default customerReducer;
