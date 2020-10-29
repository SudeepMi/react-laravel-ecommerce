import React, {Component, useEffect, useState} from 'react'
import Axios from 'axios';
import FlashMessage from 'react-flash-message';
import swal from 'sweetalert';


const Category = (props) =>  {
 
    const [name,setName] = useState('');
    const [error, setError] = useState('');
    const [formSubmitting, setFS] = useState(false);
    const [flashMsg, setFlashMessage] =useState(null);
    

    const handleSubmit = e => {
        e.preventDefault();
        setFS(true);
        let itemData = {
            cat_name: name,
        }
        console.log(itemData)
        Axios.post('/api/admin/addcat',itemData).then(response =>{
            if (response.data.status) {
                console.log(response)
                setFS(false);
                setName('');
                swal("Category Added","","success");  
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
 

    return (
        <div className="container mt-3">
        <div className="row">
          <div className="col-xl-6 col-lg-8 col-md-12 col-sm-12 col-12 m-auto">
            <h3 className="text-center mb30">Add New Category</h3>
            {error ? <FlashMessage duration={100000} persistOnHover={true}>
            <h5 className={"alert alert-danger"}>Error: {error}</h5></FlashMessage> : ''}
            {flashMsg ? <FlashMessage duration={100000} persistOnHover={true}>
            <h5 className={"alert alert-brand"}>{flashMsg}</h5></FlashMessage> : ''}
            <form onSubmit={handleSubmit} encType="multipart/formdata">
              <div className="form-group">
              <label>Category Name</label>
                <input id="name" type="text" name="name" placeholder="Category Name" className="form-control" required onChange={handleName}/>
              </div>
             <button disabled={formSubmitting} type="submit" name="singlebutton" className="btn btn-secondary btn-lg  btn-block mb10"> {formSubmitting ? "Adding Category..." : "Add Category   "} </button>
             </form>
          </div>
        </div>
      </div>
      )
    }
export default Category;