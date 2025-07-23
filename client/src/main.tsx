import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'
import { CartContextProvider } from './context/cartContext.tsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ThemeProvider } from './context/ThemeContext.tsx'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <CartContextProvider>
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              <App />
            </QueryClientProvider>
          </BrowserRouter>
        </CartContextProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
