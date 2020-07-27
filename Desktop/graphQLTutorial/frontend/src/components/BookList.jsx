import React from 'react';
import { useQuery } from '@apollo/client';
import { booksQuery } from '../gqlQueries/query';
import BookDetails from './BookDetails';
import { useState } from 'react';

function BookList (){
    const displayBooks = (loading, error, data) => {
        if (loading) {
            return <div>is Loading books.....</div>;
        }
        if (error) {
            console.log(error)
            return <div>oooops! something unusual happened</div>;
        }
        return data.books.map((book) => {
            return (<li key={book.id} onClick={(e)=> setValues({selected: book.id})} >{book.name}</li>)
        })
    }

    const { loading, error, data } = useQuery(booksQuery);
    const [values, setValues] = useState({ selected: '' })
        return (
            <React.Fragment>
			<div className='text-center'>
				<ul className='book-list'>
					{displayBooks(loading, error, data)}
				</ul>
            </div>
                <BookDetails selected={values} />
            </React.Fragment>
		);
}

export default BookList;
