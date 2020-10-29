import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import {Loading, SmallLoader} from '../Helper/Loading';
import { makeStyles } from '@material-ui/core/styles';
import { Fade } from "react-awesome-reveal";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { toUpper } from 'lodash';
import {BrowserRouter, Link, Route } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import CategoryIcon from '@material-ui/icons/Category';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import NoteIcon from '@material-ui/icons/Note';
import BusinessIcon from '@material-ui/icons/Business';
import HomeIcon from '@material-ui/icons/Home';




const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));



// import Footer from '../Footer/Footer';
const FavItem =() => {
 
    const [isLoggedIn, setIsLoggedin] = useState('');
    const [user, setUser] = useState({});
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [smallLoad, setSMLD] = useState(false);




  // check if user is authenticated and storing authentication data as states if true
    useEffect(()=>{
      let state = localStorage["appState"];
     
      if (state) {
        let AppState = JSON.parse(state);
        // console.log(AppState);
        setIsLoggedin(AppState.isLoggedIn);
        setUser(AppState.user);
        setLoading(false);
  }
    },[]);

    useEffect(()=>{
      
        if (isLoggedIn===false) {
            location.href='/';
        }
      },[isLoggedIn]);


    // get fav items

    useEffect(()=>{
     
        setSMLD(true);
      Axios.post('/api/getallfav',{user_id: user.id}).then((res)=>{
            setItems(res.data);
            setSMLD(false);
      });
    },[user])
   
    const removeFav = (id) =>{
       Axios.post('/api/delfav',{user_id: user.id, item_id: id}).then((res) =>{
           const newitems = items.filter(item => item.id!==res.data);
            setItems(newitems);
       });
    }

    const clearAll = () =>{
        Axios.post('/api/delallfav',{user_id: user.id}).then((res) =>{
             setItems([]);
        });
     }
   
   
  
    const logOut = (e) => {
        e.preventDefault();
        setLoading(true);
        Axios.post('/api/logout').then(response =>{
          console.log(response);
        }).then(()=>{
          setIsLoggedin(false);
          setLoading(false);
          setUser({});
          let appState = {
            isLoggedIn:false,
            user: {},
          };
        localStorage["appState"] = JSON.stringify(appState);
        this.props.history.push("/");
      })
       
    }

    return (
      <div className="mt-5">
      <Loading loading={loading} />
        <div className="container">
          <div className="row">
            <div className="col-lg-3 mt-3">
            { isLoggedIn ? 
            <div className="my-profile"><h3 className="my-4"><PersonIcon /> My Profile</h3><hr />
            {user.is_admin ? <h5>AMNIN</h5>
            : null }
            <h4>{ toUpper(user.name) }</h4>
            <h6 ><BookmarkIcon /> Total Favorite items {items.length}</h6>
            <Link to="/" className="nav-link text-success"><HomeIcon /> Home</Link>
            <Link to="/favitems" className="nav-link text-success disabled"><FavoriteIcon /> Go to Favorite</Link>
            {user.is_admin ? <Link to="/dashboard" className="nav-link text-success"><DashboardIcon /> Dashboard</Link> :null }
            <a href="#" onClick={clearAll} className="nav-link text-success"><FavoriteBorder/> Clear All</a>  
            <a href="#" onClick={logOut} className="nav-link text-success"><ExitToAppIcon/> Logout</a>  
                <hr /></div> : null }
            </div>
            <div className="col-lg-9 mt-5">
            <h4>My Favorites</h4><hr />
            <div className="row mt-4">
              <SmallLoader loading={smallLoad} />
              { items.map((item, key) =>{
               return <div className="col-lg-3 col-md-4 mb-4" key={key}>
              <Fade cascade>
                  <div className="card h-100">
                    <a href="#">
                    <LazyLoadImage 
                     className="card-img-top"
                      src={item.photo} 
                      alt=""
                      effect="blur" />
                      </a>
                    <div className="card-body">
                      <h4 className="card-title">
                        <a href="#">{item.name}</a>
                      </h4>
                      <h5>Author : {item.author}</h5>
                      <p className="card-text">{item.description}</p>
                    </div>
                    <div className="card-footer">
                     <button className="btn" onClick={(e)=>{ e.preventDefault(); removeFav(item.id)}}><FavoriteIcon/></button>
                    </div>
                  </div>
                </Fade>
                </div>
              })}

              </div>
            </div>
          </div>
          </div>
      </div>
      )
    }
export default FavItem;