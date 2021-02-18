import axios from "axios";

import fire from "../fire";

const url = "http://localhost:3001/posts";

const createToken = async () => {
  const user = fire.auth().currentUser;
  const token = user && (await user.getIdToken());

  const payloadHeader = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return payloadHeader;
};

export const addPost = async (content, user) => {
  const header = await createToken();

  const payload = {
    user,
    content,
    liked: false,
  };
  try {
    const res = await axios.post(url, payload, header);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const deleteAllPosts = async (user) => {
  const header = await createToken();

  try {
    const res = await axios.delete(url, header);
    console.log(res);
    // return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getPosts = async () => {
  const header = await createToken();

  try {
    const res = await axios.get(url, header);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const likePost = async (id) => {
  const header = await createToken();
  const payload = {
    id,
  };
  try {
    axios.post(`${url}/like`, payload, header);
  } catch (e) {
    console.error(e);
  }
};
