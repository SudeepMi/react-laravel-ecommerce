import React, {Component, useEffect, useState} from 'react'
const AdminHome = () =>  {
    let AppState = JSON.parse(localStorage["appState"]) || null;
    const [user, getUser] = useState(AppState.user || {});

    return (
      <div className="container">
        <main>
          <span>Whatever normally goes into the user dasboard page; the table below for instance</span> <br/>
          <table className="table table-striped">
            <tbody>
              <tr>
                <th scope="row ">User Id</th>
                <td>{user.id}</td>
              </tr>
              <tr>
                <th scope="row ">Full Name</th>
                <td>{user.name}</td>
              </tr>
              <tr>
                <th scope="row ">Email</th>
                <td>{user.email}</td>
              </tr>
            </tbody>
          </table>
          </main>
      </div>
      )
    }
export default AdminHome;