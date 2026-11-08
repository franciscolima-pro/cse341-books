import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  authorExists
} from '../models/books.js';

const getBooksHandler = async (req, res) => {
    try{
        const books = await getAllBooks();
        return res.status(200).json(books);
    }catch(error){
        console.error('Error fetching books:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getBookByIdHandler = async (req, res) => {
    try{
        const bookId = req.params.id;
        const book = await getBookById(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        return res.status(200).json(book);
    }catch(error){
        console.error('Error fetching book:', error.message);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

const createBookHandler = async (req, res) => {
  try {
    const { id, authorId, title, publicationDate } = req.body ?? {};

    if (
      typeof id !== 'string'
      || id.trim() === ''
      || typeof authorId !== 'string'
      || authorId.trim() === ''
      || typeof title !== 'string'
      || title.trim() === ''
      || typeof publicationDate !== 'string'
      || publicationDate.trim() === ''
    ) {
      return res.status(400).json({ message: 'Missing required book fields.' });
    }

    if (await getBookById(id)) {
      return res.status(400).json({ message: 'Book id already exists.' });
    }

    if (!(await authorExists(authorId))) {
      return res.status(400).json({ message: 'Author not found.' });
    }

    const book = await createBook({ id, authorId, title, publicationDate });
    return res.status(201).json(book);
  } catch (error) {
    console.error('Error creating book:', error.message);
    return res.status(500).json({ message: 'Unable to create book.' });
  }
};

const updateBookHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { authorId, title, publicationDate } = req.body ?? {};

    if (
      typeof authorId !== 'string'
      || authorId.trim() === ''
      || typeof title !== 'string'
      || title.trim() === ''
      || typeof publicationDate !== 'string'
      || publicationDate.trim() === ''
    ) {
      return res.status(400).json({ message: 'Missing required book fields.' });
    }

    if (!(await getBookById(id))) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    if (!(await authorExists(authorId))) {
      return res.status(400).json({ message: 'Author not found.' });
    }

    const book = await updateBook(id, { authorId, title, publicationDate });
    return res.status(200).json(book);
  } catch (error) {
    console.error('Error updating book:', error.message);
    return res.status(500).json({ message: 'Unable to update book.' });
  }
};

const deleteBookHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await getBookById(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    await deleteBook(id);
    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting book:', error.message);
    return res.status(500).json({ message: 'Unable to delete book.' });
  }
};

export {
  getBooksHandler,
  getBookByIdHandler,
  createBookHandler,
  updateBookHandler,
  deleteBookHandler
};