import React, { Component } from "react";
import { connect } from "react-redux";
import {
  retrieveCustomers,
  findCustomersByName,
  deleteAllCustomers,
} from "../actions/customers";
import { Link } from "react-router-dom";
import { updateCustomer, deleteCustomer } from "../actions/customers";
import CustomerDataService from "../services/customer.service";

class CustomersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveCustomer = this.setActiveCustomer.bind(this);
    this.findByName = this.findByName.bind(this);
    this.removeAllCustomers = this.removeAllCustomers.bind(this);

    this.state = {
      currentCustomer: null,
      currentIndex: -1,
      searchName: "",
    };
  }

  componentDidMount() {
    this.props.retrieveCustomers();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName,
    });
  }

  refreshData() {
    this.setState({
      currentCustomer: null,
      currentIndex: -1,
    });
  }

  setActiveCustomer(customer, index) {
    this.setState({
      currentCustomer: customer,
      currentIndex: index,
    });
  }

  removeAllCustomers() {
    this.props
      .deleteAllCustomers()
      .then((response) => {
        console.log(response);
        this.refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  findByName() {
    this.refreshData();

    this.props.findCustomersByName(this.state.searchName);
  }

  render() {
    const { searchName, currentCustomer, currentIndex } = this.state;
    const { customers } = this.props;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by firstname"
              value={searchName}
              onChange={this.onChangeSearchName}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.findByName}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Customers List</h4>

          <ul className="list-group">
            {customers &&
              customers.map((customer, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCustomer(customer, index)}
                  key={index}
                >
                  {customer.firstname}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllCustomers}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentCustomer ? (
            <div>
              <h4>Customer</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentCustomer.firstname}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentCustomer.lastname}
              </div>

              <Link
                to={`/customer/${currentCustomer.customerId}`}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Customer...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customers: state.customers,
  };
};

export default connect(mapStateToProps, {
  retrieveCustomers,
  findCustomersByName,
  deleteAllCustomers,
})(CustomersList);
