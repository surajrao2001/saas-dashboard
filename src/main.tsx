import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { validateEnv } from './env'
import '@surajrao/my-ui-library/styles.css'
import './index.css'
import App from './App.tsx'

validateEnv()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
