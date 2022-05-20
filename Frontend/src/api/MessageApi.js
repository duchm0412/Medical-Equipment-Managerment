import Api from "./Api";

const url = "/messages";
// GET
const getAllMessage = () => {
  return Api.get(url);
};
const createMessage = (sender, message) => {
  const body = {
    sender: sender,
    message: message,
  };
  return Api.post(url, body);
};
const deleteBySender = (sender, message) => {
  console.log(sender, message);
  const requestParams = {
    sender,
    message,
  };
  return Api.delete(`${url}/delete`, { params: requestParams });
};
const MessageApi = {
  getAllMessage,
  createMessage,
  deleteBySender,
};
export default MessageApi;
