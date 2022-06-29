import React, { useState, useEffect } from 'react'
import { useParams  } from 'react-router-dom'

export const Details = () => {

  const [details, setDetails] = useState([])

  const { title } = useParams()

  useEffect(() => {
    fetch(`https://nexer-case-linneafrisk.herokuapp.com/books/${title}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setDetails(data)
        })
    }, [title])

  return (
    <div>
      All books:

      <section>

              <div className="info-details">

                  <h3 className="info-title">{details.title}</h3>   
                <p className="info-date">{details.author}</p>
              </div>

      </section>
    
    </div>
  )
}
