import React from 'react'

export const Page = ({ page, authors }) => {
  // Find the author by matching page.authorId with author.id
  const author = authors.find(author => author.id === page.authorId)

  return (
    <>
      <h3>{page.title}</h3>
      <p>{page.content}</p>
      <p>Author: {author ? author.name : 'Unknown'}</p> {/* Display author name if found */}
      <button>Read More</button>
    </>
  )
}

