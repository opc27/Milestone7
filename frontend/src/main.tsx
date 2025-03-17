import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import App from './App.tsx'
import { ModuleList } from './ModuleList.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ModuleList />
  </StrictMode>,
)
