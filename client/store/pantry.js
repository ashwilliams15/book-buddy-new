import axios from 'axios';
import 'regenerator-runtime/runtime'

const ADD_ITEM = 'ADD_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
const SET_ITEMS = 'SET_ITEMS';

const _addItem = (item) => {
  return {
    type: ADD_ITEM,
    item
  }
};

const _deleteItem = (item) => {
  return {
    type: DELETE_ITEM,
    item
  }
};

const _setItems = (items) => {
  return {
    type: SET_ITEMS,
    items
  }
}

export const addItem = (item) => {
  return async (dispatch) => {
    const result = await axios.post('/api/pantry', item);
    dispatch(_addItem(result.data))
  }
};

// export const deleteItem = (item) => {
//   return async (dispatch) => {
//     const result = await axios.delete('/api/pantry');
//     dispatch(_deleteItem(result.data))
//   }
// };

export const fetchItems = () => {
  return async (dispatch) => {
    try {
      const result = await axios.get('/api/pantry');
      const data = result.data;
      dispatch(_setItems(data));
    } catch (err) {
      console.log(err)
    }
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case SET_ITEMS:
      return action.items
    case ADD_ITEM:
      return [...state, action.item]
    case DELETE_ITEM:
      return state.filter((item) =>
      item.id === action.item.id ? action.item : item)
    default:
      return state;
  }
}
