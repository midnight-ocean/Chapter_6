import axios from "axios";

const API_URL = "/api/login";

const login = async (userCredentials) => {
    const response = await axios.post(API_URL, userCredentials);
    return response.data;
}

export default { login };