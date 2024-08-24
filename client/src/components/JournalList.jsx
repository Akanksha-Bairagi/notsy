import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'; // Correctly import the Navbar component
import './JournalList.css'; // Import CSS file
import 'normalize.css'; 

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1528938102132-4a9276b8e320?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

function JournalList() {
    const [journals, setJournals] = useState([]);

    useEffect(() => {
        axios.get('/api/journals')
            .then(response => setJournals(response.data))
            .catch(error => console.error('Error fetching journals:', error));
    }, []);

    return (
        <>
            <Navbar /> {/* Render the Navbar component */}
            <main className="journal-list">
                <h1>Journal Entries</h1>
                <section className="grid">
                    {journals.map(journal => (
                        <Link 
                            key={journal._id} 
                            to={`/journals/${journal._id}`} 
                            className="journal-item"
                        >
                            <h2>{journal.title}</h2>
                            <img 
                                src={journal.images.length > 0 ? journal.images[0] : DEFAULT_IMAGE} 
                                alt={`Journal ${journal._id}`} 
                            />
                        </Link>
                    ))}
                </section>
                <Link to="/journals/new" className="create-link">
                    Create New Journal
                </Link>
            </main>
        </>
    );
}

export default JournalList;
