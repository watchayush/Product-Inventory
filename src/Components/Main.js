import React,{useState,useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect,useDispatch,useSelector } from "react-redux";
import { Card, Form,Button,Row,Col } from 'react-bootstrap';
import axios from 'axios';
import FormComponent from "./FormComponent";
import DisplayProducts from "./DisplayProducts";
import "../Css/Main.css";
import {toast} from 'react-toastify';
const Main = ()=>{
    const [products,setProducts]=useState([]);
    const newProduct = useSelector(state => state.newProduct);
    const product_to_delete = useSelector(state => state.product_to_delete);


    useEffect(()=>{
        axios.get('https://fakestoreapi.com/products')
        .then(res => {
            setTimeout(()=>{
                    setProducts(res.data);
            },1000)
            
        })
        .catch(error => {
          console.log(error);
        });
    },[])

    useEffect(()=>{
      //  products.push(newProduct);
      if(newProduct)
        setProducts([...products,newProduct]);
      console.log(products);
    },[newProduct])

    useEffect(()=>{
      if(product_to_delete)
        var remainingProducts = products.filter(product => product.id != product_to_delete.id);
      if(remainingProducts)
        setProducts(remainingProducts)
      console.log("check" ,remainingProducts);
      console.log(products);
    },[product_to_delete])
    
    var edit = (editProduct) =>{
      var remainingProducts = products.filter(product => product.id != editProduct.id);
      remainingProducts.push(editProduct);
      setProducts(remainingProducts);
      toast.success('One product Edited', {
        position: toast.POSITION.TOP_RIGHT, autoClose:5000});
    }

    var calculateId = () =>{
      console.log("inside calculateId ",parseInt(products[products.length-1].id+1));
      return parseInt(products[products.length-1].id)+1;
    }

    return(
        <div className="main">
            <Row>
              <Col lg={5}>
                <Card style={{ margin:"30px",color:"black",boxShadow: "2px 5px 20px 2px rgba(46, 46, 46, 0.5)"}}>
                   <FormComponent edit={edit} calculateId={calculateId}/>
                </Card>
              </Col>
              <Col lg={7}>
           
                <Card style={{marginTop:"30px",marginRight:"10px" ,maxHeight:"500px",overflowY:"scroll",boxShadow: "2px 5px 20px 2px rgba(46, 46, 46, 0.5)"}}>
                  <DisplayProducts products={products}/>
                </Card>
              </Col>
            </Row>
        </div>
    )
}

export default Main;