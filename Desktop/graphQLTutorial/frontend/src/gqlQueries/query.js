import {
    gql
} from '@apollo/client'

export const booksQuery = gql `
    {
        books {
            name
            id
        }
    }
`

export const getAuthorsQuery = gql `
    {
        Authors {
            name
            id
        }
    }
`

export const addBookMutation = gql`
    mutation($name:String!, $genre:String!,$authorId:ID!) {
        addBook(name:$name,genre:$genre,authorId:$authorId){
            name
            id
        }
    }
` 

export const getBookQuery = gql`
    query($id:ID){
        book(id: $id){
            id
            name
            genre
            author{
                id
                name
                age
                books{
                    name
                    id
                }
            }
        }
    }
`