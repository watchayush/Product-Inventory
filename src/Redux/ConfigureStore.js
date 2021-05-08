import { createStore } from "redux";

import Reducer from "./Reducer";

export default function configureStore() {
  const state = { loggedIn_person: null,newProduct:null,product_to_edit:null, product_to_delete:null };
  const store = createStore(Reducer, state);
  return store;
}