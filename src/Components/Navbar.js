import React from "react";
import "../Css/Navbar.css";
import Avatar from '@material-ui/core/Avatar';
import { connect } from "react-redux";
class Navbar extends React.Component {
    constructor(props) {
        super(props)
      }
    
    render() {
  
      return (
        <nav>
          <h2>PRODUCT INVENTORY</h2>
          {!localStorage.getItem('user')?
            (<a href="http://localhost:3000/SignIn" className="slide-center-out">  <Avatar alt="" src="" style={{backgroundColor:"white",color:"gray"}} /> SignIn</a>):
            <p className="welcome">Welcome&#128516;&nbsp;  {"   " + localStorage.getItem('user')}</p>}
        </nav>
      );
    }
  }
  function mapStateToProps(state) {
    return {
      loggedIn_person: state.loggedIn_person,
    };
  }
  export default connect(mapStateToProps)(Navbar);

