import React, {Component, useEffect, useState} from 'react';
import Axios from 'axios';
import { Loading } from '../../Helper/Loading';
import MUIDataTable from "mui-datatables";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Modal from 'react-bootstrap/Modal';
import FlashMessage from 'react-flash-message';
import swal from 'sweetalert';
import Category from './Category';

const Items = () =>  {
  
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRow, setSelectedRow] = useState({});
  const [lgShow, setLgShow] = useState(false);
  const [name,setName] = useState('');
  const [author,setAuthor] = useState('');
  const [publisher,setPublisher] = useState('');
  const [description,setDesc] = useState('');
  const [category,setCategory] = useState('');
  const [error, setError] = useState('');
  const [formSubmitting, setFS] = useState(false);
  const [flashMsg, setFlashMessage] =useState(null);
  const [pictures, setPictures] = useState([]);
  const [imagePreviewUrl, setURL] = useState('');
  const [selectedId, setSI] = useState('');
  const [cat, setCat] = useState([]);
  const columns = [
    {
      name: "id",
      label: "id",
      options:{
        display:"excluded"
      }
     },
     {
      name: "photo",
      label: "photo",
      options:{
        display:"excluded"
      }
     },
     {
      name: "category_id",
      label: "category_id",
      options:{
        display:"excluded"
      }
     },
    {
     name: "name",
     label: "Name",
     options: {
      sort: true,
     }
    },
    {
     name: "author",
     label: "Author",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "publisher",
     label: "Publisher",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
     name: "category",
     label: "Category",
     options: {
      filter: true,
      sort: true,
     }
    },
    {
      name: "description",
      label: "Description",
      options: {
        display:"excluded"
      }
     },
   ];

   const [rowData, setRow] = useState([]);

  useEffect(()=>{
      Axios.get('/api/admin/getitems').then(response =>{
        setItems(response.data);
      })
  },[]);

  useEffect(()=>{
    setRow(items);
    setLoading(false);
  },[items]);

  
  const Button = (data) =>{ 
      return <div className="col-8 px-4"><button className="btn btn-icon p-2" onClick={(e)=>{
         setLoading(true);
        Axios.post('/api/admin/deleteitems',data.data).then(response =>{
          // console.log(response);
        }).finally(()=>{
          const newItems =  items.filter((item,i,[])=>i!==data.data.dataIndex);
          setItems(newItems);
        })
      }}> <DeleteIcon /></button>
      <button className="btn btn-icon p-2" onClick={async ()=>{
        // console.log(data)
        setSelectedRow(data.data);
        await setLgShow(true);
        }}>
        <EditIcon />
      </button>
      </div>
  }
  const options = {
    filterType: 'checkbox',
    responsive: "standard",
    selectableRows:'single',
    customToolbarSelect(selectedRows, displayData, setSelectedRows){
      let lookup = Object.keys(selectedRows.lookup);
      let selected = lookup[0];
      return <Button data={displayData[selected]} />
    },
   
  };

    useEffect(()=>{
      if(selectedRow.data){
        console.log(selectedRow.data)
        setName(selectedRow.data[3]);
        setURL(selectedRow.data[1]);
        setAuthor(selectedRow.data[4]);
        setSI(selectedRow.data[0]);
        setPublisher(selectedRow.data[5]);
        setCategory(selectedRow.data[2]);
        setDesc(selectedRow.data[7]);
      }
    },[selectedRow]);

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

    const handleSubmit = e => {
        e.preventDefault();
        setLoading(true);
        setFS(true);
        let itemData = {
            name: name,
            author: author,
            publisher: publisher,
            description: description,
            category: category,
            photo: pictures,
            id: selectedId,
        }
        // console.log(itemData)
        Axios.post('/api/admin/edititems',itemData).then(response =>{
            if (response.data.status) {
                setRow(response.data.data);
                setLoading(false);
                swal("Item updated","","success");
            }
            else{
                setFlashMessage("Error");
                setFS(false);
            }
        }).catch(err =>{
            setError(err);
        }).finally(()=>{
            setFS(false);
            setLgShow(false);
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
        setCategory(e.target.value);
    }

    useEffect(()=>{
      Axios.get('/api/admin/getcats').then(response =>{
       
        setCat(response.data);
      })
  },[]);

    return (
      <div className="container">
      <Loading loading={loading} />
      <MUIDataTable
          title={"Item List"}
          data={rowData}
          columns={columns}
          options={options}
          
        />

        <Modal
            size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Edit Items
              
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="offset-xl-3 col-xl-6 offset-lg-1 col-lg-10 col-md-12 col-sm-12 col-12 ">
            {error ? <FlashMessage duration={100000} persistOnHover={true}>
            <h5 className={"alert alert-danger"}>Error: {error}</h5></FlashMessage> : ''}
            {flashMsg ? <FlashMessage duration={100000} persistOnHover={true}>
            <h5 className={"alert alert-brand"}>{flashMsg}</h5></FlashMessage> : ''}
            <form onSubmit={handleSubmit} encType="multipart/formdata">
              <div className="form-group">
                <input id="name" type="text" name="name" placeholder="Item Name" className="form-control" required onChange={handleName} value={name} />
              </div>
              <div className="form-group">
                <input id="author" value={author} type="text" name="author" placeholder="author" className="form-control" required onChange={handleAuthor}/>
              </div>
              <div className="form-group">
                <input id="publisher" value={publisher} type="text" name="publisher" placeholder="publisher" className="form-control" required onChange={handlePublisher}/>
              </div>
              <div className="form-group">
                <textarea id="description" value={description} type="text" name="description" placeholder="description" className="form-control" required onChange={handleDesc}/>
              </div>
              <div className="form-group">
              <label>Category</label>
                <select id="cat" name="cat" value={category} onChange={handleCat}>
                  {(cat) ? cat.map((cat,key) => <option value={cat.id} key={key}>{cat.cat_name}</option>): console.log(cats)}
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
          </Modal.Body>
        </Modal>
      </div>
      )
    }
export default Items;