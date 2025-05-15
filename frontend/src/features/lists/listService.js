import axios from 'axios'

const API_URL = '/api/lists/'

// Create new list
const createList = async (name, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(API_URL, { name }, config);
  return response.data;
};

// get all lists
const fetchLists = async (token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// Delete user list
const deleteList = async (listId, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.delete(`${API_URL}${listId}`, config);
  return response.data;
};

// add item in the list
const addItem = async (listId, itemName, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(`${API_URL}${listId}/items`, { name: itemName }, config);
  return response.data;
};

// remove item in the list
const removeItem = async (listId, itemId, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.delete(`${API_URL}${listId}/items/${itemId}`, config);
  return response.data;
};

// Toggle an item's checked status
const toggleItem = async (listId, itemId, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const res = await axios.patch(
    `${API_URL}${listId}/items/${itemId}/toggle`,
    {},
    config
  )
  return res.data
};
const listService = {
  createList,
  fetchLists,
  deleteList,
  addItem,
  removeItem,
  toggleItem
}

export default listService
