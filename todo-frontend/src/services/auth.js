import axios from "axios";
const AUTH_API = "/api/auth"; 

const login = async (userCredentials) => {
    const res= await axios.post(AUTH_API, userCredentials);
    return res.data;
}; 

const logout = async () => {
    const res = await axios.post(`${AUTH_API}/logout`);
    return res.data;
};

export default { login, logout };

