import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import './App.css';
import App from './App.jsx'
import { DataContextProvider } from './contexts/DataContext.jsx'
import { ModalContextProvider } from './contexts/ModalContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataContextProvider>
      <ModalContextProvider>
        <App />
      </ModalContextProvider>
    </DataContextProvider>
  </StrictMode>
)
