import React, { useEffect, useState } from 'react';
import { connect,useDispatch,useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Form,Button } from 'react-bootstrap';
import "../Css/Main.css";
import ReplayIcon from '@material-ui/icons/Replay';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import {toast} from 'react-toastify';

const FormComponent = ({edit,calculateId})=>{
    const [productName,setProductName] = useState('');
    const [category,setCategory] = useState('');
    const [productPrice,setProductPrice] = useState('');
    const [productDescription,setProductDescription] = useState('');

    const dispatch = useDispatch();
    const loggedIn_person = useSelector(state => state.loggedIn_person);
    const newProduct = useSelector(state => state.newProduct);
    const product_to_edit = useSelector(state => state.product_to_edit);

    useEffect(()=>{
      setProductName(product_to_edit?.title);
      setCategory(product_to_edit?.category);
      setProductPrice(product_to_edit?.price);
      setProductDescription(product_to_edit?.description);
    },[product_to_edit])

    const add = (event) => {
        event.preventDefault();
        // document.getElementById("addId").hidden=true;
        document.getElementById("addProName").hidden=true;
        document.getElementById("addPrice").hidden=true;
        document.getElementById("addDesc").hidden=true;
        if(localStorage.getItem('user'))
        {
           const newProduct ={
            ["id"]: calculateId(),
            ["title"] : event.target.productName.value,
            ["category"] : event.target.category.value,
            ["price"] : parseFloat(event.target.productPrice.value),
            ["description"] : event.target.productDescription.value
           }
           if(newProduct.id==""||newProduct.title==""||newProduct.price==""||newProduct.description==""){
            
            if(newProduct.title==""){
             document.getElementById("addProName").hidden=false;
            }
            if(newProduct.price==""){
             document.getElementById("addPrice").hidden=false;
            }
            if(newProduct.description==""){
             document.getElementById("addDesc").hidden=false;
            }
            return
        }
           dispatch(addProduct(newProduct));
           toast.success('Congratulations!!.... One product added', {
            position: toast.POSITION.TOP_RIGHT, autoClose:5000});
           console.log(newProduct);
        }else{
            alert('Please login as Admin to add Products')
        }
    }

    const editPost = (event) => {
      event.preventDefault();
      document.getElementById("editId").hidden=true;
      document.getElementById("editProName").hidden=true;
      document.getElementById("editPrice").hidden=true;
      document.getElementById("editDesc").hidden=true;
      const post_to_edit ={
        ["id"]: parseInt(event.target.id.value),
        ["title"] : event.target.productName.value,
        ["category"] : event.target.category.value,
        ["price"] : parseFloat(event.target.productPrice.value),
        ["description"] : event.target.productDescription.value
       }
       if(post_to_edit.id==""||post_to_edit.title==""||post_to_edit.price==""||post_to_edit.description==""){
           if(post_to_edit.id==""){
               document.getElementById("editId").hidden=false;
           }
           if(post_to_edit.title==""){
            document.getElementById("editProName").hidden=false;
           }
           if(post_to_edit.price==""){
            document.getElementById("editPrice").hidden=false;
           }
           if(post_to_edit.description==""){
            document.getElementById("editDesc").hidden=false;
           }
           return
       }
       edit(post_to_edit);
  }
  

    return(
            <React.Fragment>
                {!product_to_edit ? (
                   <Form style={{margin:"15px"}} onSubmit={add}>
                      <Form.Group controlId="exampleForm.ControlInput1">
                          <Form.Label className="label">NAME</Form.Label>
                          <Form.Control type="text" placeholder="Enter Product name" name="productName"/>
                          <Form.Label className="label errorMessage" id="addProName" hidden>Enter a valid Product Name</Form.Label>
                      </Form.Group>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                          <Form.Label className="label">SELECT CATEGORY</Form.Label>
                          <Form.Control as="select" defaultValue="Select category" name="category" selected>
                              <option disabled value="select category">Select Category</option>
                              <option value="Men's cloathing">Men's cloathing</option>
                              <option value="Women's cloathing">Women's cloathing</option>
                              <option value="Jewelery">Jewelery</option>
                              <option value="Electronics">Electronics</option>
                          </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="exampleForm.ControlInput1">
                          <Form.Label className="label">PRICE</Form.Label>
                          <Form.Control type="number" placeholder="Enter Price of the product" name="productPrice"/>
                          <Form.Label className="label errorMessage" id="addPrice" hidden>Enter price</Form.Label>
                      </Form.Group>
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                          <Form.Label className="label">DESCRIPTION</Form.Label>
                          <Form.Control as="textarea" rows={3} placeholder="Enter Description of the product" name="productDescription"/>
                          <Form.Label className="label errorMessage" id="addDesc" hidden>Enter product Description</Form.Label>
                      </Form.Group>
                      <Button variant="primary" type="submit" className="label sb">
                               ADD PRODUCT<AddCircleIcon/>
                      </Button>

                    </Form>) :

                   (<Form style={{margin:"15px"}} onSubmit={editPost}>
                      <Form.Group controlId="exampleForm.ControlInput1">
                         <Form.Label className="label">ID</Form.Label>
                         <Form.Control type="number" placeholder="Enter ID" disabled name="id" value={product_to_edit.id}/>
                         <Form.Label className="label errorMessage" id="editId" hidden>Enter a valid Id</Form.Label>
                      </Form.Group>
                      <Form.Group controlId="exampleForm.ControlInput1">
                          <Form.Label className="label">NAME</Form.Label>
                          <Form.Control type="text" placeholder="Enter Product name" name="productName" contentEditable="true" onChange={(e)=>{setProductName(e.target.value)}} value={productName}/>
                          <Form.Label className="label errorMessage" id="editProName" hidden>Enter a valid Product Name</Form.Label>
                      </Form.Group>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                          <Form.Label className="label">SELECT CATEGORY</Form.Label>
                          <Form.Control as="select" defaultValue="Select category" name="category" onChange={(e)=>{setCategory(e.target.value)}} value={category}>
                               <option disabled selected value="select category">Select Category</option>
                               <option value="Men's cloathing">Men's cloathing</option>
                               <option value="Women's cloathing">Women's cloathing</option>
                               <option value="Jewelery">Jewelery</option>
                               <option value="Electronics">Electronics</option>
                          </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="exampleForm.ControlInput1">
                          <Form.Label className="label">PRICE</Form.Label>
                          <Form.Control type="number" placeholder="Enter Price of the product" name="productPrice" onChange={(e)=>{setProductPrice(e.target.value)}} value={productPrice}/>
                          <Form.Label className="label errorMessage" id="editPrice" hidden>Enter price</Form.Label>
                      </Form.Group>
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                          <Form.Label className="label">DESCRIPTION</Form.Label>
                          <Form.Control as="textarea" rows={3} placeholder="Enter Description of the product" name="productDescription" onChange={(e)=>{setProductDescription(e.target.value)}} value={productDescription}/>
                          <Form.Label className="label errorMessage" id="editDesc" hidden>Enter product Description</Form.Label>
                      </Form.Group>
                      <Button variant="primary" className="go" onClick={ () => {dispatch(go_to_add_Products())}  }>
                               <ReplayIcon/>Go to Add Products
                      </Button>
                      <Button variant="primary" type="submit" className="label sb">
                               EDIT PRODUCT<EditIcon fontSize="small"/>
                      </Button>
                      

                    </Form>)
        
                }
            </React.Fragment>
          )

  }

function addProduct(newProduct) {
    console.log("inside loggin In action function");
    return {
      type: "ADD_PRODUCT",
      newProduct: newProduct,
    };
  }

function go_to_add_Products(){
    return{
        type:"EDIT_PRODUCT",
        productToEdit:null,
    };
}

export default React.memo(FormComponent);