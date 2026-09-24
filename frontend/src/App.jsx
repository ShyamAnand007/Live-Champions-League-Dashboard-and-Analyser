import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import LandingPage from './components/LandingPage.jsx'
import PlaceholderPage from './components/PlaceholderPage.jsx'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/matches" element={<PlaceholderPage title="Matches" />} />
        <Route path="/standings" element={<PlaceholderPage title="Standings" />} />
        <Route path="/teams" element={<PlaceholderPage title="Teams" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
