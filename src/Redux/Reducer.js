export default function Reducer(state = { loggedIn_person: null,newProduct:null,product_to_edit:null, product_to_delete:null }, action) {
    switch (action.type) {
      case "USER_LOGGEDIN":
        console.log("inside reducer");
  
        return { loggedIn_person: action.loggedIn_person };
      
      case "ADD_PRODUCT":
        console.log("inside newProduct reducer ", action.newProduct);
        return {newProduct : action.newProduct};

      case "EDIT_PRODUCT":
          console.log("inside editProduct reducer ", action.product_to_edit);
          return {product_to_edit : action.product_to_edit};

    case "DELETE_PRODUCT":
          console.log("inside deleteProduct reducer ", action.product_to_delete);
          return {product_to_delete : action.product_to_delete};

      default:
        return state;
    }
  }
  