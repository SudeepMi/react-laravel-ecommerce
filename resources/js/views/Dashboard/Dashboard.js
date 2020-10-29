import React, {Component, useEffect, useState} from 'react';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import AdminHome from './AdminHome';
import Items from './Items';
import AddItems from './AddItems';
import Category from './Category';

const Dash = () =>  {
  let AppState = JSON.parse(localStorage["appState"]) || null;
  const [isLoggedIn, checkLogin] = useState(AppState.isLoggedIn || false);
  const [user, getUser] = useState(AppState.user || {});
// check if user is authenticated and storing authentication data as states if true


  useEffect(()=>{
    if (!isLoggedIn) {
      location.href = "/login"
    }
  },[]);

    return (
      <Router>
      <div className="container my-5">
        <div className="row">
          <div className="col-xl-12 col-md-8 col-sm-12 my-5">
            <div className="admin-nav my-1">
              <ul>
                <li>
                  <Link to="/dashboard/addItems">Add Items</Link>
                </li>
                <li>
                  <Link to="/dashboard/categories">Add Category</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <main>
        <Route path="/dashboard/items" exact component={Items} />
        <Route path="/dashboard/addItems" exact component={AddItems} />
        <Route path="/dashboard/" exact component={Items} />
        <Route path="/dashboard/categories" exact component={Category} />
          </main>
      </div>
      </Router>
      )
    }
export default Dash;