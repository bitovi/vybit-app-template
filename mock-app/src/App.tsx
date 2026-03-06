import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AccordionPage from './pages/AccordionPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Accordion page is the homepage (needs full viewport) */}
        <Route path="/" element={<AccordionPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
