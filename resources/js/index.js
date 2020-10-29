import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Link, Route } from 'react-router-dom';
import Home from './views/Home';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import {Loading} from './Helper/Loading';
import HomeIcon from '@material-ui/icons/Home';
// import Nav from '../components/Nav';
// // User is LoggedIn
import PrivateRoute from './PrivateRoute'
import Dash from './views/Dashboard/Dashboard';
import FavItem from './views/FavItem';

class Index extends Component {

  constructor(props) {
    super(props);
    console.log(props)
      this.state = {
        user: "",
        isLoggedIn:false,
        loading:true,
      };
  }

  componentDidMount() {
    let state = localStorage["appState"];
    if (state) {
      let AppState = JSON.parse(state);
      this.setState({ isLoggedIn: AppState.isLoggedIn, user: AppState.user,loading:false });
    }
  }
  

  render() {
    return (
      <BrowserRouter>
      <Loading loading={this.state.loading} />
         <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
            <div className="container">
              <Link className="navbar-brand" to="/">eBook</Link>
                  <ul className="navbar-nav ml-auto">
                  { this.state.isLoggedIn ? <li><Link to="/" className="nav-link text-success"><HomeIcon /> Home</Link></li> :
                      <span className="d-flex"><li><Link to="/login" className="nav-link text-success">Login</Link></li>
                      <li><Link to="/register" className="nav-link text-success">Register</Link></li></span> }
                  </ul>
              </div>
        </nav>
          <div id="comp" className="mt-5">
            <Route exact path='/' component={Home}/>
            <Route path='/login' component={Login}/>
            <Route path='/register' component={Register}/>
            <Route path='/favitems' component={FavItem}/>
            <PrivateRoute path='/dashboard' component={Dash}/>
            {/* <Route component={NotFound}/> */}
          </div>
          <footer className="py-5 bg-dark">
          <div className="container">
            <p className="m-0 text-center text-white py-3">Copyright &copy; Developed by: Surya Shrestha</p>
          </div>
          </footer>
      </BrowserRouter>

    );
  }
}
ReactDOM.render(<Index/>, document.getElementById('app'));
