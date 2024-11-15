import React, { useEffect, useState } from 'react'
import { PagesList } from './PagesList'
import { Page } from './Page'
import apiURL from '../api'

export const App = () => {
  const [pages, setPages] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);

  useEffect(() => {
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


  return (
    <main>
      <h1>WikiVerse</h1>
      <h2>An interesting 📚</h2>

      {selectedPage ? (
        <Page
          page={selectedPage}
          author={authors.find(author => author.id === selectedPage.authorId)}
          onBack={() => setSelectedPage(null)}
          detailed
        />
      ) : (
        <PagesList pages={pages} authors={authors} onReadMore={onReadMore} />
      )}
    </main>
  );
};

