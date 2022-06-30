import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import uniqid from 'uniqid';

import { BackIcon } from "./BackIcon";


export const Search = () => {

    const [search, setSearch] = useState('')
    const [active, setActive] = useState(false)

    const navigate = useNavigate()

    const onBackButtonClick = () => {
        navigate(-1);
      };

    const btnHandler = () => {
        setActive(!active)
      }

    const handleSubmit = (event) => {
        event.preventDefault();
        btnHandler()

        fetch(`https://nexer-case-linneafrisk.herokuapp.com/books/${search}`)
        .then((res) => res.json())
        .then((data) => {
            setSearch(data)
            console.log(data)
            
        })
    }

   

    return (
        <section className="form-container">
            <button className="backLink" onClick={onBackButtonClick}>
            <BackIcon />
          </button>
        <form className="search-form">
        <label>Search:</label>
            <input
              className='writeInput'
              type="text"
            //   value={search}
              onChange={(event) => setSearch(event.target.value)} />

          <button className="search-button" type="submit" onClick={handleSubmit}>SEARCH</button>
        </form>

        
            <Link
            to={`/${search.title}`} 
            key={uniqid()}>
                <div className={active ? "info-details" : "info-details-closed"}>
                <p>{search.title}</p>
                <p>{search.author}</p>
                </div>
            </Link>
        


        
        </section>
    )
}