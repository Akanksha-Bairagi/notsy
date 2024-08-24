import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import Navbar from './Navbar'; // Import the Navbar component
import 'normalize.css'; // Import Normalize.css
import './JournalForm.css'; // Your custom styles

function JournalForm({
  isEdit = false,
  journalId = null,
  existingTitle = '',
  existingContent = '',
  existingImages = [],
  existingTodoList = []
}) {
  const [title, setTitle] = useState(existingTitle);
  const [content, setContent] = useState(existingContent);
  const [images, setImages] = useState(existingImages);
  const [todoList, setTodoList] = useState(existingTodoList.map((todo, index) => ({
    ...todo, text: todo.text || `To-do ${index + 1}`
  })));
  const [imageInput, setImageInput] = useState('');
  const [todoInput, setTodoInput] = useState('');
  const [editingTodoIndex, setEditingTodoIndex] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const defaultImage = "https://images.unsplash.com/photo-1528938102132-4a9276b8e320?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const filteredImages = images.filter(image => image.trim() !== '');
      const filteredTodoList = todoList.map(todo => {
        const { _id, ...rest } = todo;
        return rest;
      });

      if (isEdit) {
        await axios.put(`/api/journals/${journalId}`, {
          title, content, images: filteredImages, todoList: filteredTodoList
        });
      } else {
        await axios.post('/api/journals', {
          title, content, images: filteredImages, todoList: filteredTodoList
        });
      }
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  const addImage = () => {
    setImages([...images, imageInput]);
    setImageInput('');
  };

  const removeImage = (index) => {
    setImages(images.filter((_, idx) => idx !== index));
  };

  const editImage = (index) => {
    const newImageUrl = prompt('Enter new image URL:', images[index]);
    if (newImageUrl) {
      setImages(images.map((img, idx) => (idx === index ? newImageUrl : img)));
    }
  };

  const addTodo = () => {
    setTodoList([...todoList, { text: todoInput, completed: false }]);
    setTodoInput('');
  };

  const removeTodo = (index) => {
    setTodoList(todoList.filter((_, idx) => idx !== index));
  };

  const editTodo = (index) => {
    setEditingTodoIndex(index);
  };

  const handleTodoChange = (index, newText) => {
    const newTodoList = [...todoList];
    newTodoList[index].text = newText;
    setTodoList(newTodoList);
  };

  return (
    <>
      <Navbar /> {/* Add the Navbar component here */}
      <main className="journal-form-container">
        <h1>{isEdit ? 'Edit Journal' : 'Create Journal'}</h1>
        <form onSubmit={handleSubmit}>
          <section className="journal-form-content">
            <article className="left-section">
              <label>
                Title:
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </label>
              <label className="content-label">
                Content:
                <textarea
                  placeholder="Content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
              </label>

              <section className="images-section">
                <label>
                  Image URL:
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={imageInput}
                    onChange={(e) => setImageInput(e.target.value)}
                  />
                  <button type="button" onClick={addImage}>Add Image</button>
                </label>
                <ul className="images-list">
                  {images.length === 0 && <img src={defaultImage} alt="Default" style={{ maxWidth: '100px' }} />}
                  {images.map((img, idx) => (
                    <li key={idx}>
                      <img src={img || defaultImage} alt={`Journal Image ${idx}`} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                      <button type="button" onClick={() => editImage(idx)}>
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                      <button type="button" onClick={() => removeImage(idx)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            </article>
            <article className="right-section">
              <section className="todo-section">
                <label>
                  To-Do Item:
                  <input
                    type="text"
                    placeholder="To-Do Item"
                    value={todoInput}
                    onChange={(e) => setTodoInput(e.target.value)}
                  />
                  <button type="button" onClick={addTodo}>Add To-Do</button>
                </label>
                <ul className="todo-list">
                  {todoList.map((todo, idx) => (
                    <li key={idx}>
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => {
                          const newTodoList = [...todoList];
                          newTodoList[idx].completed = !todo.completed;
                          setTodoList(newTodoList);
                        }}
                      />
                      {editingTodoIndex === idx ? (
                        <textarea
                          value={todo.text}
                          onChange={(e) => handleTodoChange(idx, e.target.value)}
                        />
                      ) : (
                        <span>{todo.text}</span>
                      )}
                      <button type="button" onClick={() => editTodo(idx)}>
                        <FontAwesomeIcon icon={faPen} />
                      </button>
                      <button type="button" onClick={() => removeTodo(idx)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            </article>
          </section>
          <button type="submit">Save</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </main>
    </>
  );
}

export default JournalForm;
