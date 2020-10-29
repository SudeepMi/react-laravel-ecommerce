import React, {Component} from 'react';
import {Link, withRouter, Redirect} from 'react-router-dom';
import ReactDOM from 'react-dom';
import FlashMessage from 'react-flash-message';
import {Loading} from '../../Helper/Loading';

class RegisterContainer extends Component {
  // 2.1
  constructor(props) {
    super(props);
    let state = localStorage["appState"] || null;
    let AppState = JSON.parse(state) || null;

    this.state = {
      loading:false,
      isRegistered: AppState.isRegistered,
      error: '',
      errorMessage: '',
      isLoggedIn: AppState.isRegistered,
      formSubmitting: false,
      user: AppState.user || {
        name: '',
        email: '',
        password: '',
        phone:'',
        password_confirmation: '',
        tc:''
    },
    redirect: props.redirect,
};
if (this.state.isRegistered) {
    if (this.state.user.is_admin) {
      this.props.history.push("/dashboard");
    } else {
      this.props.history.push("/");
    }
  
}

this.handleSubmit = this.handleSubmit.bind(this);
this.handleName = this.handleName.bind(this);
this.handleEmail = this.handleEmail.bind(this);
this.handlePassword = this.handlePassword.bind(this);
this.handlePasswordConfirm = this.handlePasswordConfirm.bind(this);
this.handlePhone = this.handlePhone.bind(this);
this.handleTC = this.handleTC.bind(this);


}
// 2.2
// componentWillMount, componentDidMount etc etc that have //componentStuffStuff are known as React Lifecycles 

// 2.3
// componentDidMount() {
//   const { prevLocation } = this.state.redirect.state || {prevLocation: { pathname: '/dashboard' } };
//   if (prevLocation && this.state.isLoggedIn) {
//     return this.props.history.push(prevLocation);
//   }
// }
// 2.4
handleSubmit(e) {
  e.preventDefault();
  this.setState({formSubmitting: true, loading:true});
  ReactDOM.findDOMNode(this).scrollIntoView();
  if (this.state.user.name==""||this.state.user.email==""||this.state.user.password==""||this.state.user.phone==""||this.state.user.tc=="") {
    return this.setState({
      error: "All feild are required",
    })
  }

  if (this.state.password !== this.state.password_confirmation) {
    return this.setState({
      error: "Password Confirmation didn't matched",
    })
  }
  let userData = this.state.user;
  axios.post("/api/register", userData)
    .then(response => {
      return response;
  }).then(json => {
    console.log(json);
      if (json.data.success) {
        let userData = {
          id: json.data.id,
          name: json.data.name,
          email: json.data.email,
          activation_token: json.data.activation_token,
          is_admin: json.data.is_admin,
        };
        let appState = {
          isRegistered: true,
          isLoggedIn:true,
          user: userData
        };
        localStorage["appState"] = JSON.stringify(appState);
        this.setState({
          isRegistered: appState.isRegistered,
          user: appState.user,
          isLoggedIn: appState.isLoggedIn,
          loading:false,
        });
       if (userData.is_admin) {
         location.href="/dashboard"
       } else {
         location.href="/";
       }
      } else {
        console.log(json);
          alert(`Our System Failed To Register Your Account!`);
      }
 }).catch(error => {if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      let err = error.response.data;
      this.setState({
        error: err.message,
        errorMessage: err.errors,
        formSubmitting: false,
        loading:false
      })
    }
    else if (error.request) {
      // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
      let err = error.request;
      this.setState({
        error: err,
        formSubmitting: false,
        loading:false,
      })
   } else {
       // Something happened in setting up the request that triggered an Error
       let err = error.message;
       this.setState({
         error: err,
         formSubmitting: false,
         loading:false
       })
   }
 }).finally(this.setState({error: ''}));
}
handleName(e) {
  let value = e.target.value;
  this.setState(prevState => ({
    user: {
      ...prevState.user, name: value
    }
  }));
}
//phone
handlePhone(e) {
  let value = e.target.value;
  this.setState(prevState => ({
    user: {
      ...prevState.user, phone: value
    }
  }));
}
// 2.5
handleEmail(e) {
  let value = e.target.value;
  this.setState(prevState => ({
    user: {
      ...prevState.user, email: value
    }
  }));
}
handlePassword(e) {
  let value = e.target.value;
  this.setState(prevState => ({
    user: {
      ...prevState.user, password: value
    }
  }));
}
handlePasswordConfirm(e) {
  let value = e.target.value;
  this.setState(prevState => ({
    user: {
      ...prevState.user, password_confirmation: value
    }
  }));
}
// terms and condition
handleTC(e) {
  let value = e.target.value;
  this.setState(prevState => ({
    user: {
      ...prevState.user, tc: value
    }
  }));
}

render() {
  // 2.6
  let errorMessage = this.state.errorMessage;
  let arr = [];
  Object.values(errorMessage).forEach((value) => (
    arr.push(value)
  ));
  return (
    <div className="container my-5">
    <Loading loading={this.state.loading} />
      <div className="row">
        <div className="offset-xl-3 col-xl-6 offset-lg-1 col-lg-10 col-md-12 col-sm-12 col-12 my-5">
          <h2>Create Your Account</h2>
        {this.state.isRegistered ? <FlashMessage duration={60000} persistOnHover={true}>
          <h5 className={"alert alert-success"}>Registration successful, redirecting...</h5></FlashMessage> : ''}
        {this.state.error ? <FlashMessage duration={900000} persistOnHover={true}>
          <h5 className={"alert alert-danger"}>Error: {this.state.error}</h5>
          <ul>
            {arr.map((item, i) => (
              <li key={i}><h5 style={{color: 'red'}}>{item}</h5></li>
             ))}
          </ul></FlashMessage> : ''}
          <form onSubmit={this.handleSubmit} className="my-4">
            <div className="form-group">
              <input id="name" name="name" type="text" placeholder="Name" className="form-control" required onChange={this.handleName}/>
            </div>
            <div className="form-group">
              <input id="email" type="email" name="email" placeholder="E-mail" className="form-control" required onChange={this.handleEmail}/>
            </div>
            <div className="form-group">
              <input id="phone" type="tel" name="phone" placeholder="Phone No" className="form-control" required onChange={this.handlePhone}/>
            </div>
            <div className="form-group">
              <input id="password" type="password" name="password" placeholder="Password" className="form-control" required onChange={this.handlePassword}/>
            </div>
            <div className="form-group">
              <input id="password_confirm" type="password" name="password_confirm" placeholder="Confirm Password" className="form-control" required onChange={this.handlePasswordConfirm} />
            </div>
            <div className="form-group">
              <input id="accept_tc" type="checkbox" name="accept_tc" className="" required onChange={this.handleTC} /> I accept all terms and condition.
            </div>
            <button type="submit" name="singlebutton" className="btn btn-default btn-lg  btn-block mb10" disabled={this.state.formSubmitting ? "disabled" : ""}>Create Account</button>
          </form>
          <p>Already have an account?
            <Link to="/login" className="text-yellow"> Log In</Link>
            <span className="pull-right"><Link to="/" className="text-white">Back to Home</Link></span>
        </p>
        </div>
      </div>
    </div>
    )
  }
}

export default withRouter(RegisterContainer);