import React, { Component } from "react";
import { connect } from "react-redux";
import { updateCustomer, deleteCustomer } from "../actions/customers";
import CustomerDataService from "../services/customer.service";
import { Link, useParams } from "react-router-dom";

// function withParams(Component) {
//   return (props) => <Component {...props} params={useParams()} />;
// }

function CustomerId() {
  let { customerId } = useParams();
  console.log(customerId);
  return customerId;
}

class Customer extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeLname = this.onChangeLname.bind(this);
    this.onChangeUid = this.onChangeUid.bind(this);
    this.getCustomer = this.getCustomer.bind(this);
    // this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeCustomer = this.removeCustomer.bind(this);

    this.state = {
      currentCustomer: {
        customerId: null,
        firstname: "",
        lastname: "",
        user_id: null,
      },
      message: "",
    };
  }

  componentDidMount() {
    let { customerId } = useParams;
    // console.log(CustomerId.customerId);
    this.getCustomer(customerId);
  }

  onChangeName(e) {
    const firstname = e.target.value;

    this.setState(function (prevState) {
      return {
        currentCustomer: {
          ...prevState.currentCustomer,
          firstname: firstname,
        },
      };
    });
  }

  onChangeLname(e) {
    const lastname = e.target.value;

    this.setState((prevState) => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        lastname: lastname,
      },
    }));
  }

  onChangeUid(e) {
    const user_id = e.target.value;

    this.setState((prevState) => ({
      currentCustomer: {
        ...prevState.currentCustomer,
        user_id: user_id,
      },
    }));
  }

  getCustomer(customerId) {
    CustomerDataService.get(customerId)
      .then((response) => {
        this.setState({
          currentCustomer: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateStatus() {
    var data = {
      customerId: this.state.currentCustomer.customerId,
      firstname: this.state.currentCustomer.firstname,
      lastname: this.state.currentCustomer.lastname,
      user_id: this.state.currentCustomer.user_id,
      //   published: status,
    };

    this.props
      .updateCustomer(this.state.currentCustomer.customerId, data)
      .then((reponse) => {
        console.log(reponse);

        this.setState((prevState) => ({
          currentCustomer: {
            ...prevState.currentCustomer,
            // published: status,
          },
        }));

        this.setState({ message: "The data was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  updateContent() {
    this.props
      .updateCustomer(
        this.state.currentCustomer.customerId,
        this.state.currentCustomer
      )
      .then((reponse) => {
        console.log(reponse);

        this.setState({ message: "The customer was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeCustomer() {
    this.props
      .deleteCustomer(this.state.currentCustomer.customerId)
      .then(() => {
        this.props.history.push("/customers");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentCustomer } = this.state;

    return (
      <div>
        {currentCustomer ? (
          <div className="edit-form">
            <h4>Customer</h4>
            <form>
              <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  value={currentCustomer.firstname}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  value={currentCustomer.lastname}
                  onChange={this.onChangeLname}
                />
              </div>
              <div className="form-group">
                <label htmlFor="user_id">User ID</label>
                <input
                  type="number"
                  className="form-control"
                  id="user_id"
                  value={currentCustomer.user_id}
                  onChange={this.onChangeUid}
                />
              </div>
            </form>

            <button
              className="badge badge-primary mr-2"
              onClick={() => this.updateStatus()}
            >
              UpdateStatus
            </button>

            <button
              className="badge badge-danger mr-2"
              onClick={this.removeCustomer}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateContent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Customer...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateCustomer, deleteCustomer })(Customer);
