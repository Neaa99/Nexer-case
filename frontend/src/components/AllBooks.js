import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import uniqid from 'uniqid';

export const AllBooks = () => {

  const [books, setBooks] = useState([])


    useEffect(() => {
      fetch(`https://nexer-case-linneafrisk.herokuapp.com/books`)
          .then(res => res.json())
          .then(data => {
            console.log(data)
            setBooks(data)
  
          })
      }, [])

  return (
    <div>
      <h1 className="main-title">All books:</h1>

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
