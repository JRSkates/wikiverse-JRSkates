import React from 'react'
import { Page } from './Page'

export const PagesList = ({ pages, authors}) => {
  return <>
		{
			pages.map((page, idx) => {
				return <Page page={page} authors={authors} key={idx}/>
			})
		}
		{console.log(authors)}
	</>
}
