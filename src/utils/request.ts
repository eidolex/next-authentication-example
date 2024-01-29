import { getCookie } from "cookies-next";
// import { cookies } from "next/headers";

export default function request(input: URL| RequestInfo, init?: RequestInit) {
    const isServer = typeof window === 'undefined';
    const url = isServer ? 'http://127.0.0.1:8000' : 'http://localhost:8000';

    const headers: any = {
        "referer": "http://localhost:3000",
        "Accept": "application/json",
    };

    let token: string | undefined;
    let cookieHeader = '';

    if (isServer) {
        const { cookies } = require('next/headers');
        const cookieStore = cookies();
        token = cookieStore.get("XSRF-TOKEN")?.value;
        cookieHeader = cookieStore.getAll().map((cookie: any) => `${cookie.name}=${cookie.value}`).join('; ');
    } else {
        token = getCookie('XSRF-TOKEN')?.toString();
    }


    if (token) {
        headers['X-XSRF-TOKEN'] = token;
    }

    if (cookieHeader) {
        headers['Cookie'] = cookieHeader;
    }

    return fetch(url + input, {
        credentials: "include",
        ...init,
        headers: {
            ...headers,
            ...init?.headers
        },
    });
}