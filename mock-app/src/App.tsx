import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AccordionPage from './pages/AccordionPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Accordion page is now the homepage (needs full viewport) */}
        <Route path="/" element={<AccordionPage />} />
        
        {/* Old homepage moved to /home for reference */}
        <Route
          path="/home"
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
