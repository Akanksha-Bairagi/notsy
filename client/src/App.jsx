import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JournalList from './components/JournalList';
import JournalForm from './components/JournalForm';
import JournalDetail from './components/JournalDetail';
import JournalEdit from './components/JournalEdit';

import './App.css'; // Assuming you have a CSS file for global styling

function App() {
    return (
        <Router>
            <div className="content">
                <Routes>
                    <Route path="/" element={<JournalList />} />
                    <Route path="/journals/new" element={<JournalForm />} />
                    <Route path="/journals/:id" element={<JournalDetail />} />
                    <Route path="/journals/:id/edit" element={<JournalEdit />} />
                   
                </Routes>
            </div>
        </Router>
    );
}

export default App;
