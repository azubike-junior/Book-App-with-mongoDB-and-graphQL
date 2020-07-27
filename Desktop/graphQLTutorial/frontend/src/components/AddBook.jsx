import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { getAuthorsQuery, addBookMutation, booksQuery } from '../gqlQueries/query';

function AddBook (){
	const displayAuthors = (loading, error, data) => {
		if (loading) {
			return <span>is Loading books.....</span>;
		}
		if (error) {
			return <span>oooops! something unusual happened</span>;
		}
		return data.Authors.map((author) => {
			return (
				<option key={author.id} value={author.id}>
					{author.name}
				</option>
			);
		}); 
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};
   
	const handleSubmit = (e) => {
		e.preventDefault();
		let { name, genre, authorId } = values;
        if (!name || !genre || !authorId) return;
        addBook({
            variables: { name, genre, authorId },
            refetchQueries: [{query: booksQuery }]
        })
	};

    const [addBook] = useMutation(addBookMutation)
    const { loading, error, data } = useQuery(getAuthorsQuery);
	const [
		values,
		setValues
	] = useState({ name: '', genre: '', authorId: '' });
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<div className='field'>
					<label htmlFor=''>Book name: </label>
					<input type='text' onChange={handleChange} name='name' value={values.name} />
				</div>

				<div className='field'>
					<label htmlFor=''>Genre: </label>
					<input type='text' onChange={handleChange} name='genre' value={values.genre} />
				</div>

				<div className='field'>
					<label htmlFor=''>Author: </label>
					<select value={values.authorId} name='authorId' onChange={handleChange}>
						<option>Select author</option>
						{displayAuthors(loading, error, data)}
					</select>
				</div>
				<br />
				<button>+</button>
			</form>
		</div>
	);
}

export default AddBook;
