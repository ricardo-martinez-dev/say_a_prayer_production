const axios = require("axios");

// get
const axiosGet = async ({ url, obj }) => {
  const params = obj ? obj : null;

  return await axios
    .get(url, params)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// post
const axiosPost = async ({ url, obj }) => {
  return await axios
    .post(url, obj)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

// delete
const axiosDelete = async ({ url, obj }) => {
  return await axios
    .delete(url, obj)
    .then((res) => res.data)
    .catch((err) => console.log(err));
};

module.exports = { axiosGet, axiosPost, axiosDelete };
