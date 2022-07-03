import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import uniqid from 'uniqid';

export const AllBooks = () => {

  const [books, setBooks] = useState([])


    useEffect(() => {
      fetch(`https://nexer-case-linneafrisk.herokuapp.com/books`)
          .then(res => res.json())
          .then(data => {
            setBooks(data)
          })
      }, [])

  return (
    <div>
      <h1 className="main-title">All books:</h1>

      <div className='buttons'>
        <Link 
              to={`/add`} 
              key={uniqid()}
              className="btn">
                <p>Add a book</p>
        </Link>

        <Link 
              to={`/search`} 
              key={uniqid()}
              className="btn">
                <p>Search for a book</p>
        </Link>
      </div>

      <section className='all-books'>
          {books.map((book) => (
            <Link 
            to={`/${book.title}`} 
            key={uniqid()}>
          
              <div className="info-details">
                <h3 className="info-title">{book.title}</h3>   
                <p className="info-date">{book.author}</p>
                </div>
              </Link>
          ))}
      </section>

    </div>
  )
}
