import React from 'react'
import { Page } from './Page'

export const PagesList = ({ pages, authors, onReadMore }) => {
  return (
    <div>
      {pages.map(page => (
        <Page
          key={page.id}
          page={page}
          author={authors.find(author => author.id === page.authorId)}
          onReadMore={() => onReadMore(page)}
        />
      ))}
    </div>
  );
};
