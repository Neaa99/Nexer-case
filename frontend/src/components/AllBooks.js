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
      All books:

      <section>
          {books.map((book) => (
            <>
              <div className="info-details">
                <Link 
                  to={`/${book.title}`} 
                  key={uniqid()}>
                  <h3 className="info-title">{book.title}</h3>   
                </Link>
                <p className="info-date">{book.author}</p>
              </div>
            </>
          ))}
      </section>
    
    </div>
  )
}
