import React, {useState, useEffect} from 'react';
import Axios from 'axios';
import {Loading, SmallLoader} from '../Helper/Loading';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrorUpIcon from '@material-ui/icons/KeyboardArrowUp';
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
import swal from 'sweetalert';
import first from './1.png';
import second from './2.png';
import third from './3.png';




const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));



// import Footer from '../Footer/Footer';
const Home =() => {
 
    const [isLoggedIn, setIsLoggedin] = useState(false);
    const [user, setUser] = useState({});
    const [items, setItems] = useState([]);
    const [tempItem, setTempItem] = useState([]);
    const [loading, setLoading] = useState(true);

    const [catFilter, setCatFilter] = useState([]);
    const [authorFIlter, setAuthorFIlter] = useState([]);
    const [publisherFilter, setPublisherFIlter] = useState([]);


    const [cats, setCats] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [publishers, setPublishers] = useState([]);

    
    const [catFilterShown, setCFS] = useState(false);
    const [authorFilterShown, setAFS] = useState(false);
    const [publisherFilterShown, setPFS] = useState(false);

    const [favitems, setFavItems] = useState([]);

    const [smallLoad, setSMLD] = useState(false);


  const classes = useStyles();
 
  const handleChange = (event) => {
    setCatFilter({ ...catFilter, [event.target.name]: event.target.checked });
  };

  const handleChangeAuthor = (event) => {
    setAuthorFIlter({ ...authorFIlter, [event.target.name]: event.target.checked });
  };

  const handleChangePublisher = (event) => {
    setPublisherFIlter({ ...publisherFilter, [event.target.name]: event.target.checked });
  };

  const handleCatFilter = (e) =>{
    e.preventDefault();
    setCFS(!catFilterShown);
     setAFS(false);
      setPFS(false)
  }
  const handleAutFilter = (e) =>{
    e.preventDefault();
    setCFS(false);
     setAFS(!authorFilterShown);
      setPFS(false)
  }
  const handlePubFilter = (e) =>{
    e.preventDefault();
    setCFS(false);
     setAFS(false);
      setPFS(!publisherFilterShown)
  }

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


    // get fav items

    useEffect(()=>{
      if(isLoggedIn){
      Axios.post('/api/getfav',{user_id: user.id}).then((res)=>{
        const data = res.data;
        const ar = Array();
       data.map((fav,i)=>{
          return ar.push(fav.item_id);
       });
      setFavItems(ar);
      });
    }},[user]);
   

//category filter
    useEffect(()=>{
      setSMLD(true);
      const catOptions = Object.keys(catFilter).filter(key => 
        {
          if(catFilter[key]==true){
              return key;
          }
        })

        if (Object.keys(catOptions).length == 0) {
          setTempItem(items);
        }

        const catOptionsFalse = Object.keys(catFilter).filter(key => 
          {
            if(catFilter[key]==false){
                return key;
            }
          })

    if (Object.keys(catOptions).length > 0) {
      let newItems = Array();   
      catOptions.map((item, key)=>{
          const match = items.filter(key => key.category==item);
              match.map((match,key)=>newItems.push(match));
            });
          // setTempItem(newItems.push(match));
         setTempItem(newItems);
    }
    setSMLD(false);


  },[catFilter]);

  //author filter

  useEffect(()=>{
    
    setSMLD(true);
    const authOption = Object.keys(authorFIlter).filter(key => 
      {
        if(authorFIlter[key]==true){
            return key;
        }
      })
    
      if (Object.keys(authOption).length == 0) {
        setTempItem(items);
      }

  if (Object.keys(authOption).length > 0) {
      let newItems = Array();   
      authOption.map((item, key)=>{
          const match = items.filter(key => key.author==item);
          match.map((match,key)=>newItems.push(match));
            });
          // setTempItem(newItems.push(match));
         setTempItem(newItems);
  }

  setSMLD(false);
},[authorFIlter]);
//author filter ends


//publisher filter

useEffect(()=>{
  setSMLD(true);
  const pubOption = Object.keys(publisherFilter).filter(key => 
    {
      if(publisherFilter[key]==true){
          return key;
      }
    })

    if (Object.keys(pubOption).length == 0) {
      setTempItem(items);
    }

if (Object.keys(pubOption).length > 0) {
  let newItems = Array();   
  pubOption.map((item, key)=>{
      const match = items.filter(key => key.publisher==item);
      match.map((match,key)=>newItems.push(match));
        });
      // setTempItem(newItems.push(match));
    setTempItem(newItems);
}
setSMLD(false);

},[publisherFilter]);

//publisher filter ends
    

    useEffect(()=>{
      setLoading(true);
      Axios.get('/api/admin/getitems').then(response =>{
        setItems(response.data);
        setLoading(false);
      })
    },[]);

    useEffect(()=>{
        setSMLD(true);
        setTempItem(items);
        const cats = items.map((item,key)=>{
          return item.category
        })
        const author = items.map((item,key)=>{
          return item.author
        })
        const publisher = items.map((item,key)=>{
          return item.publisher
        })  
        setCats(cats.filter((item,index)=>cats.indexOf(item)===index));
        setAuthors(author.filter((item,index)=>author.indexOf(item)===index));
        setPublishers(publisher.filter((item,index)=>publisher.indexOf(item)===index));
        setSMLD(false);
    },[items])
   
  
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

  const addToFav = (id) =>{
    if(!isLoggedIn){
      return swal("Please Loging for a adding favorite items"," ","error");
    }
      let data = {
        user_id: user.id,
        item_id: id,
      };
      Axios.post('/api/addfav',data).then((res)=>{
       const newf = [res.data.item_id];
       console.log(newf);
        setFavItems([...favitems,newf]);
      });
  }

  const isFav = (id) =>{
    let res = false;
    // console.log(favitems);
    for (let index = 0; index < favitems.length; index++) {
      const element = favitems[index];
      if (element==id) {
        res = true;
      }
    }
   return res;
  }
    return (
      <div className="mt-5">
      <Loading loading={loading} />
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
            { isLoggedIn ? 
            <div className="my-profile"><h3 className="my-4"><PersonIcon /> My Profile</h3><hr />
            {user.is_admin ? <h5>AMNIN</h5>
            : null }
            <h4>{ toUpper(user.name) }</h4>
            <h6 ><BookmarkIcon /> Total Fav items {favitems.length }</h6>
            <Link to="/favitems" className="nav-link text-success"><FavoriteIcon /> Go to Favorite</Link>
            {user.is_admin ? <Link to="/dashboard" className="nav-link text-success"><DashboardIcon /> Dashboard</Link> :null }
            <a href="#" onClick={logOut} className="nav-link text-success"><ExitToAppIcon /> Logout</a>  
                <hr /></div> : null }
              <h3 className="my-4">Filter by</h3><hr />
              <h5><a href="#" onClick={handleCatFilter}><CategoryIcon /> Choose category</a> 
              {catFilterShown ? <KeyboardArrorUpIcon /> :<KeyboardArrowDownIcon />}
              </h5>
             <div className="filters">
            { catFilterShown ? <div className="list-group">
              <div className={classes.root}>
                  <FormControl component="fieldset" className={classes.formControl}>
                    <FormGroup>
                    {cats.map((cat,key)=>{
                    return <FormControlLabel key={key}
                        control={<Checkbox onChange={handleChange} name={cat} />}
                        label={cat}
                      />
                    })}
                    
                    </FormGroup>
                </FormControl>
                </div>
                </div>
              : null}
              </div><hr />
              <h5><a href="#" onClick={handleAutFilter}><NoteIcon /> Choose Author</a>
              {authorFilterShown ? <KeyboardArrorUpIcon /> :<KeyboardArrowDownIcon />}
              </h5>
             <div className="filters">
            { authorFilterShown ? <div className="list-group">
              <div className={classes.root}>
                  <FormControl component="fieldset" className={classes.formControl}>
                    <FormGroup>
                    {authors.map((author,key)=>{
                    return <FormControlLabel key={key}
                        control={<Checkbox onChange={handleChangeAuthor} name={author} />}
                        label={author}
                      />
                    })}
                    
                    </FormGroup>
                </FormControl>
                </div>
                </div>
              : null}
              </div><hr />
              <h5><a href="#" onClick={handlePubFilter}><BusinessIcon /> Choose Publisher</a>
              {publisherFilterShown  ? <KeyboardArrorUpIcon /> :<KeyboardArrowDownIcon />}
              </h5>
             <div className="filters">
            { publisherFilterShown ? <div className="list-group">
              <div className={classes.root}>
                  <FormControl component="fieldset" className={classes.formControl}>
                    <FormGroup>
                    {publishers.map((pub,key)=>{
                    return <FormControlLabel key={key}
                        control={<Checkbox onChange={handleChangePublisher} name={pub} />}
                        label={pub}
                      />
                    })}
                    
                    </FormGroup>
                </FormControl>
                </div>
                </div>
              : null}
              </div><hr />
             
             
            </div>
            <div className="col-lg-9">
              <div id="carouselExampleIndicators" className="carousel slide my-4" data-ride="carousel">
                <ol className="carousel-indicators">
                  <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                  <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                  <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner" role="listbox">
                  <div className="carousel-item active">
                    <img className="d-block img-fluid" src={first} alt="First slide" />
                  </div>
                  <div className="carousel-item">
                    <img className="d-block img-fluid" src={second} alt="Second slide" />
                  </div>
                  <div className="carousel-item">
                    <img className="d-block img-fluid" src={third} alt="Third slide" />
                  </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="sr-only">Next</span>
                </a>
              </div>
              <div className="row">
              <SmallLoader loading={smallLoad} />
              { tempItem.map((item, key) =>{
               return <div className="col-lg-4 col-md-6 mb-4" key={key}>
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
                    { isFav(item.id) ?  <button className="btn"><FavoriteIcon /></button> :
                     <button className="btn" onClick={(e)=>{ e.preventDefault(); addToFav(item.id)}}> <FavoriteBorder /> </button>
                    }
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
export default Home;