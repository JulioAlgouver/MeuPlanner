import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../Services/api';

interface AuthState {
    token: string;
    usuario: object;
}

interface SignInCredentials {
    apelido: string;
    senha: string;
}

interface CurrentUser {
    codigo:number;
    apelido: string;
}

interface AuthContextData {
    usuario: object;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
    
    const [data, setData] = useState<AuthState>(() =>{
        const token = localStorage.getItem('@MeuPlanner:token');
        const usuario = localStorage.getItem('@MeuPlanner:usuario');

        if (token && usuario) {
            return {token, usuario: JSON.parse(usuario)};
        }

        return {} as AuthState;
    })

    const signIn = useCallback(async ({ apelido, senha }) => {

        const response = await api.post('/sessions', {
            apelido,
            senha,
        });

        const {token, usuario} = response.data

        localStorage.setItem('@MeuPlanner:token',token);
        localStorage.setItem('@MeuPlanner:usuario',(usuario.apelido));
    
        setData({ token, usuario })

    },[]);

    const signOut = useCallback( async () => {
        const token = localStorage.removeItem('@MeuPlanner:token');
        const usuario = localStorage.removeItem('@MeuPlanner:usuario');

        setData({} as AuthState);
    },[])

    return(
        <AuthContext.Provider value={{usuario: data.usuario, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth(): AuthContextData {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context;
}
