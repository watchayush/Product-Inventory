import React, { useEffect, useState } from 'react';
import { connect,useDispatch,useSelector } from "react-redux";
import { useAlert } from 'react-alert'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Form,Button } from 'react-bootstrap';
import "../Css/Main.css";
const FormComponent = ({edit})=>{
    const [productName,setProductName] = useState('');
    const dispatch = useDispatch();
    const loggedIn_person = useSelector(state => state.loggedIn_person);
    const newProduct = useSelector(state => state.newProduct);
    const product_to_edit = useSelector(state => state.product_to_edit);

    useEffect(()=>{
      setProductName(product_to_edit?.title);
    },[product_to_edit])

    const add = (event) => {
        event.preventDefault();
        if(localStorage.getItem('user'))
        {
           const newProduct ={
            ["id"]: parseInt(event.target.id.value),
            ["title"] : event.target.productName.value,
            ["category"] : event.target.category.value,
            ["price"] : parseFloat(event.target.productPrice.value),
            ["description"] : event.target.productDescription.value
           }
           dispatch(addProduct(newProduct));
           console.log(newProduct);
        }else{
            alert('Please login as Admin to add Products')
        }
    }

    const editPost = (event) => {
      event.preventDefault();
      const post_to_edit ={
        ["id"]: parseInt(event.target.id.value),
        ["title"] : event.target.productName.value,
        ["category"] : event.target.category.value,
        ["price"] : parseFloat(event.target.productPrice.value),
        ["description"] : event.target.productDescription.value
       }
       edit(post_to_edit);
  }

    return(
            <React.Fragment>
                {!product_to_edit ? (
                   <Form style={{margin:"15px"}} onSubmit={add}>
                      <Form.Group controlId="exampleForm.ControlInput1">
                          <Form.Label className="label">ID</Form.Label>
                          <Form.Control type="number" placeholder="Enter ID" name="id" />
                      </Form.Group>
                      <Form.Group controlId="exampleForm.ControlInput1">
                          <Form.Label className="label">NAME</Form.Label>
                          <Form.Control type="text" placeholder="Enter Product name" name="productName"/>
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
                      </Form.Group>
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                          <Form.Label className="label">DESCRIPTION</Form.Label>
                          <Form.Control as="textarea" rows={3} placeholder="Enter Description of the product" name="productDescription"/>
                      </Form.Group>
                      <Button variant="primary" type="submit" className="label sb">
                               ADD PRODUCT
                      </Button>

                    </Form>) :

                   (<Form style={{margin:"15px"}} onSubmit={editPost}>
                      <Form.Group controlId="exampleForm.ControlInput1">
                         <Form.Label className="label">ID</Form.Label>
                         <Form.Control type="number" placeholder="Enter ID" disabled name="id" value={product_to_edit.id}/>
                      </Form.Group>
                      <Form.Group controlId="exampleForm.ControlInput1">
                          <Form.Label className="label">NAME</Form.Label>
                          <Form.Control type="text" placeholder="Enter Product name" name="productName" contentEditable="true" onChange={(e)=>{setProductName(e.target.value)}} value={productName}/>
                      </Form.Group>
                      <Form.Group controlId="exampleForm.ControlSelect1">
                          <Form.Label className="label">SELECT CATEGORY</Form.Label>
                          <Form.Control as="select" defaultValue="Select category" name="category" value={product_to_edit.category}>
                               <option disabled selected value="select category">Select Category</option>
                               <option value="Men's cloathing">Men's cloathing</option>
                               <option value="Women's cloathing">Women's cloathing</option>
                               <option value="Jewelery">Jewelery</option>
                               <option value="Electronics">Electronics</option>
                          </Form.Control>
                      </Form.Group>
                      <Form.Group controlId="exampleForm.ControlInput1">
                          <Form.Label className="label">PRICE</Form.Label>
                          <Form.Control type="number" placeholder="Enter Price of the product" name="productPrice" value={product_to_edit.price}/>
                      </Form.Group>
                      <Form.Group controlId="exampleForm.ControlTextarea1">
                          <Form.Label className="label">DESCRIPTION</Form.Label>
                          <Form.Control as="textarea" rows={3} placeholder="Enter Description of the product" name="productDescription" value={product_to_edit.description}/>
                      </Form.Group>
                      <Button variant="primary" type="submit" className="label sb">
                               EDIT PRODUCT
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

export default React.memo(FormComponent);