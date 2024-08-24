import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './JournalDetail.css'; // Ensure this CSS file exists and is correctly linked
import 'normalize.css'; 

function JournalDetail() {
    const { id } = useParams();
    const [journal, setJournal] = useState(null);
    const navigate = useNavigate();
    const defaultImage = "https://images.unsplash.com/photo-1528938102132-4a9276b8e320?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

    useEffect(() => {
        axios.get(`/api/journals/${id}`)
            .then(response => setJournal(response.data))
            .catch(error => console.error('Error fetching journal:', error));
    }, [id]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/journals/${id}`);
            navigate('/');
        } catch (error) {
            console.error('Error deleting journal:', error);
        }
    };

    if (!journal) return <div className="loading">Loading...</div>;

    return (
        <>
            <Navbar /> {/* Add the Navbar here */}
            <header className="journal-header">
                <h1>{journal.title}</h1>
            </header>

            <main className="journal-content">
                <p>{journal.content}</p> {/* Display journal content */}

                {/* Display Images */}
                <section className="image-gallery">
                    {journal.images.length > 0 ? (
                        <div className="image-carousel">
                            {journal.images.map((img, idx) => (
                                <article className="image-card" key={idx}>
                                    <img
                                        src={img || defaultImage}
                                        alt={`Journal Image ${idx}`}
                                    />
                                </article>
                            ))}
                        </div>
                    ) : (
                        <article className="image-card">
                            <img src={defaultImage} alt="Default" />
                        </article>
                    )}
                </section>

                {/* Display To-Do List */}
                {journal.todoList.length > 0 && (
                    <section className="todo-list">
                        <h2>To-Do List</h2>
                        <ul>
                            {journal.todoList.map((todo, idx) => (
                                <li key={idx}>
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        readOnly
                                    />
                                    {todo.text}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}
            </main>

            <footer className="journal-actions">
                <Link to={`/journals/${id}/edit`} className="button">Edit</Link>
                <button onClick={handleDelete} className="button">Delete</button>
            </footer>
        </>
    );
}

export default JournalDetail;
