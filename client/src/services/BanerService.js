import axios from "../axios";

export default class BanerService {
    // Get all baners
    static get = async () => {
        const res = await axios.get("/baners", {
            withCredentials: true,
        });

        return res;
    };

    // Add baner
    static add = async (data) => {
        const res = await axios.post("/baners", data, {
            withCredentials: true,
        });

        return res;
    };

    // Edit baner
    static edit = async (data, id) => {
        const res = await axios.put(`/baners/${id}`, data, {
            withCredentials: true,
        });

        return res;
    };

    // Remove baner
    static remove = async (id) => {
        const res = await axios.delete(`/baners/${id}`, {
            withCredentials: true,
        });

        return res;
    };
}
