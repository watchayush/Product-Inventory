import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, NavLink,Button } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      message: "",
    };
  }

  validateUserAndPass = () => {};
  handleSubmit = (event) => {
    // this.validateUserAndPass();
    axios.get(`https://fakestoreapi.com/users`).then((res) => {
      const persons = res.data;
      console.log(persons);
      var flag = 0;
      persons.map((person) => {
        if (
          person.email === this.state.username &&
          person.password === this.state.password
        ) {
          flag = 1;
          this.props.dispatch(loggedIn(person));
          localStorage.setItem('user',person.username);
        }
      });
      if (flag === 0) {
        this.setState({
          message: "You do not have an account. Please sign up",
        });
      }
      if (flag === 1) {
        this.setState({
          message: "You have an account",
        });
        
      }
    });
    event.preventDefault();
  };
  handleChange = (event) => {
    switch (event.target.name) {
      case "email":
        this.setState({ username: event.target.value });

        break;
      case "pwd":
        this.setState({ password: event.target.value });
        break;
      default:
        break;
    }
  };

  render() {
    return (
        <>
        <Card
          style={{
            margin:"0 auto",
            height: "400px",
            marginTop: "135px",
            paddingLeft: "20px",
            width:"50%",
          }}
        >
          <form
            onSubmit={this.handleSubmit}
            style={{
              width: "30%",
              marginTop:"60px",
            }}
            className="form-inline"
          >
            <div className="form-group">
              <label htmlFor="email"style={{color: "rgb(110, 110, 110)",fontSize:"1.2rem"}}>Email address:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                style={{ width: "300px",marginLeft:"45px",overflowX:"hidden"  }}
                onChange={this.handleChange}
                name="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="pwd" style={{color: "rgb(110, 110, 110)",fontSize:"1.2rem"}}>Password:</label>
              <input
                type="password"
                className="form-control"
                id="pwd"
                style={{ width: "300px",marginLeft:"81px",marginTop:"25px",overflowX:"hidden" }}
                onChange={this.handleChange}
                name="pwd"
              />
            </div>

            <Button type="submit" variant="outline-success" size="lg" style={{marginTop:"45px",marginLeft:"162px"}}>
              SignIn
            </Button>
            <a href="/signUp" style={{marginLeft:"280px",marginTop:"-45px"}}>/SignUp</a>
          </form>
          {this.props.loggedIn_person != null ? (
            this.props.history.push("/")
          ) : (
            <div>{this.state.message}</div>
          )}
        </Card>
        </>
    );
  }
}
function mapStateToProps(state) {
  console.log(state.loggedIn_person);

  return {
    loggedIn_person: state.loggedIn_person,
  };
}

function loggedIn(person) {
  console.log("inside loggin In action function");
  return {
    type: "USER_LOGGEDIN",
    loggedIn_person: person,
  };
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch: dispatch
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(SignIn);
// export default SignIn;
