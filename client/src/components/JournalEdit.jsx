import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import JournalForm from './JournalForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import './JournalEdit.css'; // Ensure this CSS file is correctly created
import 'normalize.css'; 

function JournalEdit() {
    const { id } = useParams();
    const [journal, setJournal] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`/api/journals/${id}`)
            .then(response => setJournal(response.data))
            .catch(error => console.error('Error fetching journal:', error));
    }, [id]);

    const handleUpdate = async (updatedJournal) => {
        try {
            await axios.put(`/api/journals/${id}`, updatedJournal);
            navigate('/');
        } catch (error) {
            console.error('Error updating journal:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/journals/${id}`);
            navigate('/');
        } catch (error) {
            console.error('Error deleting journal:', error);
        }
    };

    if (!journal) return <div>Loading...</div>;

    return (
        <>
            <section className="journal-edit__form">
                <JournalForm
                    isEdit={true}
                    journalId={id}
                    existingTitle={journal.title}
                    existingContent={journal.content}
                    existingImages={journal.images}
                    existingTodoList={journal.todoList}
                    onSubmit={handleUpdate}
                />
            </section>
            <footer className="journal-edit__actions">
                <button onClick={handleDelete} className="action-button">
                    <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
            </footer>
        </>
    );
}

export default JournalEdit;
