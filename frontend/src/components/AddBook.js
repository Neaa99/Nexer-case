import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { BackIcon } from "./BackIcon";

export const AddBook = () => {

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");

    const navigate = useNavigate()

    const onBackButtonClick = () => {
        navigate(-1);
      };

    const add = (e) => {
        e.preventDefault();
        fetch(`https://nexer-case-linneafrisk.herokuapp.com/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            author
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success === false) {
              res.json('Could not save book')
            } else {
              navigate("/");
            }
          });
      };

    return (
        <section className="form-container">
          <button className="backLink" onClick={onBackButtonClick}>
            <BackIcon />
          </button>

          <form className="add-form" onSubmit={(e) => add(e)}>
            <h2 className="main-title">Add a book here</h2>

            <div className="detailsInput">
                  <label>Title:</label>
                  <input
                    className="writeInput"
                    placeholder="Enter title of the book here"
                    type="text"
                    autoFocus={true}
                    value={title}
                    required
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <label>Author:</label>
                  <input
                    className="writeInput"
                    placeholder="Enter author of the book here"
                    type="text"
                    autoFocus={true}
                    value={author}
                    required
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>
              <button className="writeSubmit" type="submit">
              Post
            </button>
          </form>
        </section>
    )
}