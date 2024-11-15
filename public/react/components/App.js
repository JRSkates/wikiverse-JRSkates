import React, { useEffect, useState } from 'react'
import { PagesList } from './PagesList'
import { Page } from './Page'
import { ArticleForm } from './ArticleForm'
import apiURL from '../api'

export const App = () => {
  const [pages, setPages] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [isAddingArticle, setIsAddingArticle] = useState(false)

  async function fetchPages() {
    try {
      const response = await fetch(`${apiURL}/wiki`);
      const pagesData = await response.json();
      setPages(pagesData);
    } catch (err) {
      console.log('Oh no an error!', err);
    }
  }

  async function fetchAuthors() {
    try {
      const response = await fetch(`${apiURL}/users`);
      const authorsData = await response.json();
      setAuthors(authorsData);
    } catch (err) {
      console.log('Oh no an error!', err);
    }
  }

  useEffect(() => {
    fetchPages();
    fetchAuthors();
  }, []);

  const onReadMore = async (page) => {
    try {
      const response = await fetch(`${apiURL}/wiki/${page.slug}`);
      const fullPageData = await response.json();
      setSelectedPage(fullPageData); // Set the fully loaded article as the selected page
    } catch (err) {
      console.log('Error fetching full article details:', err);
    }
  };
  
  const handleFormSubmit = async (articleData) => {
    try {
      const response = await fetch(`${apiURL}/wiki`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(articleData),
      });
      
      if (response.ok) {
        await fetchPages(); // Re-fetch all articles after successful submission
        setIsAddingArticle(false); // Switch back to list view
      } else {
        console.log('Failed to submit article');
      }
    } catch (err) {
      console.log('Error submitting article:', err);
    }
  };


  return (
    <main>
      <h1>WikiVerse</h1>
      <h2>An interesting 📚</h2>

      {isAddingArticle ? (
        <ArticleForm onFormSubmit={handleFormSubmit} onCancel={() => setIsAddingArticle(false)} />
      ) : selectedPage ? (
        <Page
          page={selectedPage}
          author={authors.find(author => author.id === selectedPage.authorId)}
          onBack={() => setSelectedPage(null)}
          detailed
        />
      ) : (
      <>
        <button onClick={() => setIsAddingArticle(true)}>Add New Article</button>
        <PagesList 
          pages={pages} 
          authors={authors} 
          onReadMore={onReadMore} 
        />
      </>
      )}
    </main>
  );
};

