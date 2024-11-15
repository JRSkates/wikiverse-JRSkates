import React, { useEffect, useState } from 'react'
import { PagesList } from './PagesList'

// import and prepend the api url to any fetch calls
import apiURL from '../api'

export const App = () => {
  const [pages, setPages] = useState([])
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    async function fetchPages () {
      try {
        const response = await fetch(`${apiURL}/wiki`)
        const pagesData = await response.json()
        console.log(pagesData)
        setPages(pagesData)
      } catch (err) {
        console.log('Oh no an error! ', err)
      }
    }

    async function fetchAuthors () {
      try {
        const response = await fetch(`${apiURL}/users`)
        const authorsData = await response.json()
        console.log(authorsData)  // logs the fetched authors data to the console for debugging purposes, remove this line in production
        setAuthors(authorsData)
      } catch (err) {
        console.log('Oh no an error! ', err)
      }
    }

    fetchPages()
    fetchAuthors()
  }, [])

  return (
		<main>
      <h1>WikiVerse</h1>
			<h2>An interesting 📚</h2>
			<PagesList pages={pages} authors={authors}/>
		</main>
  )
}
