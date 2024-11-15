import React, { useState } from 'react';

export const ArticleForm = ({ onFormSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const articleData = {
      title,
      content,
      name,
      email,
      tags, // This will be sent as a space-separated string of tags
    };
    console.log(articleData);
    onFormSubmit(articleData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Article</h2>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </label>
      <label>
        Content:
        <textarea value={content} onChange={(e) => setContent(e.target.value)} required />
      </label>
      <label>
        Author Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Author Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>
      <label>
        Tags (separate with spaces):
        <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
      </label>
      <button type="submit">Submit Article</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};
