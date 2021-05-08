import React,{useEffect, useState} from 'react';
import { connect,useDispatch,useSelector } from "react-redux";
import Paginate from "./Paginate";
import Posts from "./Posts";
const DisplayProducts = ({ products})=>{
    var [currentPage, setCurrentPage]= useState(1);
    
    var total_Products=products.reverse();
    const indexOfLastPost = currentPage * 2;
    const indexOfFirstPost = indexOfLastPost - 2;
    const currentPosts = total_Products.slice(indexOfFirstPost, indexOfLastPost);

    

    var paginate = pageNumber => setCurrentPage(pageNumber);

        return(
        <div style={{margin:"3px"}}>
            <Posts posts={currentPosts}/>
            
            <Paginate
              postsPerPage={2}
              totalPosts={products.length}
              paginate={paginate}
            />
        </div>
    )
}
export default DisplayProducts;