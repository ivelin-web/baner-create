import axios from "axios";

export default class BanerService {
    // Get all baners
    static get = async () => {
        const res = await axios.get("/baners");

        return res;
    };

    // Add baner
    static add = async (data) => {
        const res = await axios.post("/baners", data);

        return res;
    };

    // Edit baner
    static edit = async (data, id) => {
        const res = await axios.put(`/baners/${id}`, data);

        return res;
    };

    // Remove baner
    static remove = async (id) => {
        const res = await axios.delete(`/baners/${id}`);

        return res;
    };
}
