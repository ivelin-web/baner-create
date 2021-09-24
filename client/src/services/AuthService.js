import axios from "../axios";

export default class AuthService {
    // Login user
    static login = async (userCredentials) => {
        const res = await axios.post("/auth/login", userCredentials, {
            withCredentials: true,
        });

        return res;
    };

    // Register user
    static register = async (user) => {
        const res = await axios.post("/auth/register", user);

        return res;
    };

    // Logout user
    static logout = async () => {
        const res = await axios.post("/auth/logout", null, {
            withCredentials: true,
        });

        return res;
    };

    // Get auth user
    static getAuthUser = async () => {
        const res = await axios.get("/auth/user", {
            withCredentials: true,
        });

        return res;
    };
}
