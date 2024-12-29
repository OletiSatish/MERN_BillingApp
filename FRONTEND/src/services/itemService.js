import axios from 'axios';

export const fetchItems = async () => {
  const response = await axios.get('/api/items');
  return response.data;
};
