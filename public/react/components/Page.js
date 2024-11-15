import React from 'react'

export const Page = ({ page, author, onReadMore, onBack, onDelete, detailed }) => {
  return (
    <div>
      <h3>{page.title}</h3>
      <p><strong>Author:</strong> {author ? author.name : 'Unknown'}</p>
      <p><strong>Published:</strong> {new Date(page.createdAt).toLocaleDateString()}</p>
      
      {detailed ? (
        <>
          <p>{page.content}</p>
          <p><strong>Tags:</strong> {page.tags.map(tag => tag.name).join(', ')}</p> {/* Display tags */}
          <button onClick={onBack}>Back to Wiki List</button>
          <button onClick={() => onDelete(page.slug)}>Delete Article</button>

        </>
      ) : (
        <>
          <p>{page.shortDescription}</p>
          <button onClick={onReadMore}>Read More</button>
        </>
      )}
    </div>
  );
};


