import './index.css'

import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import { Home, Login } from './pages'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
    </Routes>
  </BrowserRouter>,
)
