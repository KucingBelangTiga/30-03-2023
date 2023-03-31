import React, { Component } from "react";
import { connect } from "react-redux";
import { createCustomer } from "../actions/customers";

class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLname = this.onChangeLname.bind(this);
    this.onChangeUid = this.onChangeUid.bind(this);
    this.saveCustomer = this.saveCustomer.bind(this);
    this.newCustomer = this.newCustomer.bind(this);

    this.state = {
      customerId: null,
      firstname: "",
      lastname: "",
      user_id: null,
    };
  }

  onChangeName(e) {
    this.setState({
      firstname: e.target.value,
    });
  }

  onChangeLname(e) {
    this.setState({
      lastname: e.target.value,
    });
  }

  onChangeUid(e) {
    this.setState({
      user_id: e.target.value,
    });
  }

  saveCustomer() {
    const { firstname, lastname, user_id } = this.state;

    this.props
      .createCustomer(firstname, lastname, user_id)
      .then((data) => {
        this.setState({
          customerId: data.customerId,
          firstname: data.firstname,
          lastname: data.lastname,
          user_id: data.user_id,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  newCustomer() {
    this.setState({
      customerId: null,
      firstname: "",
      lastname: "",
      user_id: null,
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newCustomer}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                className="form-control"
                customerId="firstname"
                required
                value={this.state.firstname}
                onChange={this.onChangeName}
                name="firstname"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                className="form-control"
                customerId="lastname"
                required
                value={this.state.lastname}
                onChange={this.onChangeLname}
                name="lastname"
              />
            </div>

            <div className="form-group">
              <label htmlFor="user_id">User ID</label>
              <input
                type="text"
                className="form-control"
                customerId="user_id"
                required
                value={this.state.user_id}
                onChange={this.onChangeUid}
                name="user_id"
              />
            </div>

            <button onClick={this.saveCustomer} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { createCustomer })(AddCustomer);
