import React, {Component, useEffect, useState} from 'react';
import Axios from 'axios';
import FlashMessage from 'react-flash-message';
import swal from 'sweetalert';


const AddItems = (props) =>  {
 
    const [name,setName] = useState('');
    const [author,setAuthor] = useState('');
    const [publisher,setPublisher] = useState('');
    const [description,setDesc] = useState('');
    const [error, setError] = useState('');
    const [formSubmitting, setFS] = useState(false);
    const [flashMsg, setFlashMessage] =useState(null);
    const [pictures, setPictures] = useState([]);
    const [imagePreviewUrl, setURL] = useState('');
    const [cats, setCats] = useState(''); //all categories
    const [cat, setCat] = useState(''); //set category for current item
    const onChange = (e) => {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length)
      return;
      createImage(files[0]);
      }
    const createImage = (file) => {
      let reader = new FileReader();
      reader.onload = (e) => {
       setPictures(e.target.result)
        setURL(e.target.result);
      };
      reader.readAsDataURL(file);
      }


    useEffect(()=>{
      Axios.get('/api/admin/getcats').then(response =>{
       
        setCats(response.data);
      })
  },[]);

    const handleSubmit = e => {
        e.preventDefault();
        setFS(true);
        let itemData = {
            name: name,
            author: author,
            publisher: publisher,
            description: description,
            category: cat,
            photo: pictures,
        }
        console.log(itemData)
        Axios.post('/api/admin/additems',itemData).then(response =>{
            if (response.data.status) {
                setFS(false);
                setName('');
                setAuthor('');
                setPublisher('');
                setDesc('');
                setCat('');
                setPictures([]);
                swal("Item Added","","success");
                
            }
            else{
                setFlashMessage("Error");
                setFS(false);
            }
        }).catch(err =>{
            setError(err);
        }).finally(()=>{
            setFS(false);
        })

    }
    const handleName =(e) =>{
         setName(e.target.value);
     }
    const handleAuthor = (e) =>{
         setAuthor(e.target.value);
     }

    const handlePublisher =e =>{
        setPublisher(e.target.value);
    }
    const handleDesc = e =>{
        setDesc(e.target.value);
    }
    const handleCat = e =>{
        setCat(e.target.value);
    }


    return (
        <div className="container">
        <div className="row">
          <div className="offset-xl-3 col-xl-6 offset-lg-1 col-lg-10 col-md-12 col-sm-12 col-12 ">
            <h3 className="text-center mb30">Add New Items</h3>
            {error ? <FlashMessage duration={100000} persistOnHover={true}>
            <h5 className={"alert alert-danger"}>Error: {error}</h5></FlashMessage> : ''}
            {flashMsg ? <FlashMessage duration={100000} persistOnHover={true}>
            <h5 className={"alert alert-brand"}>{flashMsg}</h5></FlashMessage> : ''}
            <form onSubmit={handleSubmit} encType="multipart/formdata">
              <div className="form-group">
              <label>Name</label>
                <input id="name" type="text" name="name" placeholder="Item Name" className="form-control" required onChange={handleName}/>
              </div>
              <div className="form-group">
              <label>Author</label>
                <input id="author" type="text" name="author" placeholder="author" className="form-control" required onChange={handleAuthor}/>
              </div>
              <div className="form-group">
              <label>Publisher</label>
                <input id="publisher" type="text" name="publisher" placeholder="publisher" className="form-control" required onChange={handlePublisher}/>
              </div>
              <div className="form-group">
              <label>Description</label>
                <textarea id="description" type="text" name="description" placeholder="description" className="form-control" required onChange={handleDesc}/>
              </div>
              <div className="form-group">
              <label>Category</label>
                <select id="cat" name="cat" value={cat} onChange={handleCat}>
                  {(cats) ? cats.map((cat,key) => <option value={cat.id} key={key}>{cat.cat_name}</option>): console.log(cats)}
                </select>
              </div>
              <div className="form-group">
                <label className="label"> Upload Image: </label>
                  <input className="form-control" type="file"  onChange={onChange} />
                  <div className="imgPreview">
                  { imagePreviewUrl ?  (<img className="add_imagem" name="add_imagem" src={imagePreviewUrl} />) : ( 'Upload image' )
                  }
                  </div>
                </div>
             <button disabled={formSubmitting} type="submit" name="singlebutton" className="btn btn-secondary btn-lg  btn-block mb10"> {formSubmitting ? "Adding Item..." : "Add Item   "} </button>
             </form>
          </div>
        </div>
      </div>
      )
    }
export default AddItems;