import React from 'react';

import { AuthProvider } from '../Hooks/AuthContext';
import { ToastProvider } from '../Hooks/ToastContext';

const AppProvider: React.FC = ({children}) => (
    <AuthProvider>
        <ToastProvider>
            {children}
        </ToastProvider>
    </AuthProvider>
);

export default AppProvider;