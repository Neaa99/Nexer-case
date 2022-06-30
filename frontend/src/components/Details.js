import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { BackIcon } from './BackIcon'
import { DeleteBtn } from './DeleteBtn'

export const Details = () => {

  const [details, setDetails] = useState([])

  const { title } = useParams()

  const navigate = useNavigate()

  const onBackButtonClick = () => {
    navigate(-1);
  };

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
      <div className='details-header'>
        <button className="backLink" onClick={onBackButtonClick}>
          <BackIcon />
        </button>
        <h1 className="main-title">{title}</h1>
      </div>
      <section className="details-container">

              <div className="details">

                <h3 className="details-title">{details.title}</h3>   
                <p className="details-date">{details.author}</p>
                <DeleteBtn/>
              </div>

      </section>
    
    </div>
  )
}
