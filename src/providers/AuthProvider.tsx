"use client";

import request from '@/utils/request';
import { createContext, useContext, useEffect, useRef, useState } from 'react';

type IUser = {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
};

const AuthContext = createContext<{
    user: IUser | null,
    setUser: (user: IUser | null) => void,
}>({
    user: null,
    setUser(user) {},
});

export const useAuthContext = () => useContext(AuthContext);


export const AuthProvider = ({ children, user: defaultUser }: {children: React.ReactNode, user: IUser | null}) => {
    const [user, setUser] = useState<IUser | null>(defaultUser);

    return (
        <AuthContext.Provider value={{user, setUser}}>
            {children}
        </AuthContext.Provider>
    );
};