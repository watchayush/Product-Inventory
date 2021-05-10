import React,{useEffect} from 'react';
import { connect,useDispatch,useSelector } from "react-redux";
import { Card } from 'react-bootstrap';
import "../Css/Main.css";
import Table from 'react-bootstrap/Table'
import { Button } from 'react-bootstrap';
import Switch from 'react-bootstrap/esm/Switch';
const Posts = ({ posts}) => {
  const dispatch = useDispatch();

 
  return (
    <div>
      <Table striped bordered hover variant="light">
    <thead>
      <tr>
        <th className="label">ID</th>
        <th className="label">Title</th>
        <th className="label">Price</th>
        <th className="label">Category</th>
        <th className="label">Description</th>
        <th className="label">EDIT</th>
        <th className="label">DELETE</th>
      </tr>
    </thead>
    <tbody hover>
      {posts.map(post => (
            <tr style={{overflowY:"scroll",height:"100px",fontSize:"14px"}}>
              
              <td>
                {post.id}
              </td>
              <td>
                {post.title}
              </td>
            
              <td>
                {post.price}
              </td>

              <td>
                {post.category}
              </td>

              <td>
                {post.description}
              </td>

              <td>
                <Button value="edit" variant="primary" onClick={()=>dispatch(editProduct(post))} className="editDelete">
                   EDIT
                </Button>
              </td>

              <td>
                <Button value="delete" variant="primary" onClick={()=>dispatch(deleteProduct(post))} className="editDelete">
                   DELETE
                </Button>
              </td>
            </tr>
      ))}
      </tbody>
      </Table>
    </div>
  );
};

function editProduct(post){
  console.log("inside edit Product function");
  return {
    type:"EDIT_PRODUCT",
    product_to_edit:post
  }
}
function deleteProduct(post){
  console.log("inside delete Product function");
  return {
    type:"DELETE_PRODUCT",
    product_to_delete:post
  }
}

export default Posts;