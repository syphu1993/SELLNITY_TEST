import { withAuthRetry } from "@/libs/withAuthRetry";
import { User } from "@/types/user";
import axios from "axios";

export const login = async (username: string, password: string, expiresInMins = 15): Promise<User> => {
    const res = await axios.post('/api/auth/login', { username, password, expiresInMins }, {
        withCredentials: true,
    });
    return res.data.userLogin as User;
}

export const profile = async (): Promise<User> => {
    const res = await withAuthRetry(() => axios.get('/api/auth/profile', {
        withCredentials: true,
    }));
    return res.data.user as User;
}


export const logout = () => {
    axios.post(`/api/auth/logout`);
}
