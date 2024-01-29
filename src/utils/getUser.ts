import request from "./request";

type IUser = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
};


export default async function getUser(cached = true): Promise<IUser | null> {
    const response = await request("/api/user", {
        cache: cached ? 'default' : 'reload',
        redirect: 'manual',
    });

    if (response.status === 200) {
        return response.json();
    }

    return null;
}