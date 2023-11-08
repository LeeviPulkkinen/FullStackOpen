import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token = "";

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const like = async (id) => {
  const blog = await axios.get(`${baseUrl}/${id}`);
  const updatedBlog = { ...blog.data, likes: blog.data.likes + 1 };
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog);
  return response.data;
};

const remove = async (id) => {
  const config = { headers: { Authorization: token } };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { setToken, getAll, create, like, remove };
