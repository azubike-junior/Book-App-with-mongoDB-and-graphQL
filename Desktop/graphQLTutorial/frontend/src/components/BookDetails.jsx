import React from 'react';
import { useQuery } from '@apollo/client';
import { getBookQuery } from '../gqlQueries/query';

function BookDetails(props) {
    let id = props.selected.selected
    const { data } = useQuery(getBookQuery, {
        variables: { id},
    })
    const displayBook = (data) => {
        if (data) {
            const { book } = data
            return (
                <div>
                    <h3>{book.name}</h3>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <h4>Books by Author</h4>
                    <ul className="author-booklist">
                        {book.author.books.map(book => {
                            return <li key={book.id}>{book.name}</li>
                        })}
                    </ul>
                </div>
            )
        }
        return (
            <div>
               No book selected
            </div>
        )
    }
    return (
        <div className='book-details'>
            <p>Book Details</p>
            {displayBook(data)}
        </div>
    )
}

export default BookDetails
