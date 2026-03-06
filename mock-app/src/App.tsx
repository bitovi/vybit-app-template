import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AccordionPage from './pages/AccordionPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Accordion page without layout (needs full viewport) */}
        <Route path="/accordion" element={<AccordionPage />} />
        
        {/* Regular pages with layout */}
        <Route
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
