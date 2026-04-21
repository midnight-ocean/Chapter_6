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


router.post("/me", authenticateToken, (req, res) => {
    res.json({ username: req.user.username, id: req.user.id });
});

const refreshUser = async () => {
    const userResponse = await axios.get("/api/auth/me", { withCredentials: true });
    return userResponse.data;
};

export default { login, logout, refreshUser };

