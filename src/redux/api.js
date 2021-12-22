import axios from "axios";

export const loadUsersAPI = async () =>
  await axios.get("http://localhost:5000/users");

export const createUserAPI = async (user) =>
  await axios.post("http://localhost:5000/users", user);

export const deleteUserAPI = async (userId) =>
  await axios.delete(`http://localhost:5000/users/${userId}`);

export const updateUserAPI = async (userId, userInfo) =>
  await axios.put(`http://localhost:5000/users/${userId}`, userInfo);
