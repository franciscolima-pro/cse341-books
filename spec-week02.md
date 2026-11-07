# Books API Week 02 Spec - Version 2

## Feature 1: Book CRUD Operations and Author References

### Goal
Update the existing Week 01 book API so book documents include a reference to an author and the API supports all CRUD operations for books. Every book route must be documented and testable in Swagger.

### Data Model
Book documents will be stored in the `books` collection.

Required book fields:
- `id`: string, required, custom id such as `b1`
- `authorId`: string, required, references the `id` field of an author document
- `title`: string, required
- `publicationDate`: string, required

Books will continue to use custom string ids instead of MongoDB `_id` values for route parameters.

### Relationship to Authors
Each book will identify its author with an `authorId` field. The value of `authorId` must match the custom `id` value of an existing author document.

When creating or updating a book, the API should reject the request with a `400` status code if the submitted `authorId` does not match an existing author.

### Routes

#### GET /books
Purpose: Return all books.

Success:
- Status code: `200`
- Response body: an array of book objects

Errors:
- `500` if an unexpected server or database error occurs

#### GET /books/:id
Purpose: Return one book by its custom id.

Success:
- Status code: `200`
- Response body: the matching book object

Errors:
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

#### POST /books
Purpose: Create a new book.

Request body:

    {
      "id": "b4",
      "authorId": "a1",
      "title": "Example Book Title",
      "publicationDate": "2026-01-15"
    }

Success:
- Status code: `201`
- Response body: the newly created book object

Errors:
- `400` if a required field is missing
- `400` if the `id` already exists
- `400` if the `authorId` does not match an existing author
- `500` if an unexpected server or database error occurs

#### PUT /books/:id
Purpose: Update an existing book.

Request body:

    {
      "authorId": "a2",
      "title": "Updated Book Title",
      "publicationDate": "2026-02-20"
    }

Success:
- Status code: `200`
- Response body: the updated book object

Errors:
- `400` if a required field is missing
- `400` if the `authorId` does not match an existing author
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

#### DELETE /books/:id
Purpose: Delete an existing book.

Success:
- Status code: `204`
- Response body: none

Errors:
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

### Swagger Documentation
Swagger must document every book route.

### Deployment Expectations
After implementation, the book routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every book route from the browser.

# Update Book Collection to reference authors and finish Book API

## Description
- Update the existing Week 01 book API so book documents include a reference to an author.
- Add the remaining CRUD operations for books.
- Validate book request bodies before writing to MongoDB.
- Validate that each submitted `authorId` matches an existing author document.
- Add Swagger documentation for all book routes.
- Test the book routes locally and in the deployed Render application.

## Spec
### Goal
Update the existing Week 01 book API so book documents include a reference to an author and the API supports all CRUD operations for books. Every book route must be documented and testable in Swagger.

### Data Model
Book documents will be stored in the `books` collection.

Required book fields:
- `id`: string, required, custom id such as `b1`
- `authorId`: string, required, references the `id` field of an author document
- `title`: string, required
- `publicationDate`: string, required

Books will continue to use custom string ids instead of MongoDB `_id` values for route parameters.

### Relationship to Authors
Each book will identify its author with an `authorId` field. The value of `authorId` must match the custom `id` value of an existing author document.

When creating or updating a book, the API should reject the request with a `400` status code if the submitted `authorId` does not match an existing author.

### Routes

#### GET /books
Purpose: Return all books.

Success:
- Status code: `200`
- Response body: an array of book objects

Errors:
- `500` if an unexpected server or database error occurs

#### GET /books/:id
Purpose: Return one book by its custom id.

Success:
- Status code: `200`
- Response body: the matching book object

Errors:
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

#### POST /books
Purpose: Create a new book.

Request body:

    {
      "id": "b4",
      "authorId": "a1",
      "title": "Example Book Title",
      "publicationDate": "2026-01-15"
    }

Success:
- Status code: `201`
- Response body: the newly created book object

Errors:
- `400` if a required field is missing
- `400` if the `id` already exists
- `400` if the `authorId` does not match an existing author
- `500` if an unexpected server or database error occurs

#### PUT /books/:id
Purpose: Update an existing book.

Request body:

    {
      "authorId": "a2",
      "title": "Updated Book Title",
      "publicationDate": "2026-02-20"
    }

Success:
- Status code: `200`
- Response body: the updated book object

Errors:
- `400` if a required field is missing
- `400` if the `authorId` does not match an existing author
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

#### DELETE /books/:id
Purpose: Delete an existing book.

Success:
- Status code: `204`
- Response body: none

Errors:
- `404` if no book exists with that id
- `500` if an unexpected server or database error occurs

### Swagger Documentation
Swagger must document every book route.

### Deployment Expectations
After implementation, the book routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every book route from the browser.

## Test Plan
- Existing `GET /books` responses include `authorId`.
- Existing `GET /books/:id` responses include `authorId`.
- `POST /books` creates a book and returns status 201.
- `POST /books` returns 400 when required fields are missing.
- `POST /books` returns 400 when `authorId` does not match an existing author.
- `PUT /books/:id` updates an existing book.
- `PUT /books/:id` returns 400 when `authorId` does not match an existing author.
- `PUT /books/:id` returns 404 when the book does not exist.
- `DELETE /books/:id` deletes an existing book.
- `DELETE /books/:id` returns 404 when the book does not exist.
- All book routes are documented in Swagger.
- All book routes can be tested locally from `/api-docs`.
- All book routes can be tested from the deployed Render `/api-docs` page.

## Feature 2: Author CRUD Operations

### Goal
Create an authors collection that stores author information and provide all CRUD operations for authors. Every author route must be documented and testable in Swagger.

### Data Model
Author documents will be stored in the `authors` collection.

Required author fields:
- `id`: string, required, custom id such as `a1`
- `name`: string, required
- `birthYear`: number, required

Authors will use custom string ids instead of MongoDB `_id` values for route parameters.

### Relationship to Books
Books will identify their author using the `authorId` field. The value of a book's `authorId` must match the custom `id` value of an existing author document.

An author cannot be deleted if one or more books still reference that author's `id`. The API should reject the request to prevent books from having invalid author references.

### Routes

#### GET /authors
Purpose: Return all authors.

Success:
- Status code: `200`
- Response body: an array of author objects

Errors:
- `500` if an unexpected server or database error occurs

#### GET /authors/:id
Purpose: Return one author by its custom id.

Success:
- Status code: `200`
- Response body: the matching author object

Errors:
- `404` if no author exists with that id
- `500` if an unexpected server or database error occurs

#### POST /authors
Purpose: Create a new author.

Request body:

    {
      "id": "a1",
      "name": "Example Author",
      "birthYear": 1980
    }

The request body must include all required author fields. The `id` and `name` must be strings, and the `birthYear` must be a valid number. Fields that are not part of the author data model should be rejected.

Success:
- Status code: `201`
- Response body: the newly created author object

Errors:
- `400` if a required field is missing
- `400` if the `id` already exists
- `400` if a field has an invalid value or data type
- `400` if the request contains fields that are not part of the author data model
- `500` if an unexpected server or database error occurs

#### PUT /authors/:id
Purpose: Update an existing author using the custom id provided in the route parameter.

Request body:

    {
      "name": "Updated Author Name",
      "birthYear": 1985
    }

The request body must include all required author fields. The `name` must be a string and the `birthYear` must be a valid number. Fields that are not part of the author data model should be rejected.

Success:
- Status code: `200`
- Response body: the updated author object

Errors:
- `400` if a required field is missing
- `400` if a field has an invalid value or data type
- `400` if the request contains fields that are not part of the author data model
- `404` if no author exists with the id provided in the route parameter
- `500` if an unexpected server or database error occurs

#### DELETE /authors/:id
Purpose: Delete an existing author.

Success:
- Status code: `204`
- Response body: none

Errors:
- `400` if one or more books still reference the author's id
- `404` if no author exists with that id
- `500` if an unexpected server or database error occurs

### Swagger Documentation
Swagger must document every author route.

### Deployment Expectations
After implementation, the author routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every author route from the browser.

# Create Author Collection and Implement Author API

## Description

- Create an authors collection that stores author information.
- Add all CRUD operations for authors.
- Validate author request bodies before writing to MongoDB.
- Reject author creation or update requests when required fields are missing, fields have invalid data types or values, or the request contains fields that are not part of the author data model.
- Prevent an author from being deleted if one or more books still reference that author's id.
- Add Swagger documentation for all author routes.
- Test the author routes locally and in the deployed Render application.

## Spec

### Goal

Create an authors collection that stores author information and provide all CRUD operations for authors. Every author route must be documented and testable in Swagger.

### Data Model

Author documents will be stored in the `authors` collection.

Required author fields:

- `id`: string, required, custom id such as `a1`
- `name`: string, required
- `birthYear`: number, required

Authors will use custom string ids instead of MongoDB `_id` values for route parameters.

### Relationship to Books

Books will identify their author using the `authorId` field. The value of a book's `authorId` must match the custom `id` value of an existing author document.

An author cannot be deleted if one or more books still reference that author's `id`. The API should reject the request to prevent books from having invalid author references.

### Routes

#### GET /authors

Purpose: Return all authors.

Success:

- Status code: `200`
- Response body: an array of author objects

Errors:

- `500` if an unexpected server or database error occurs

#### GET /authors/:id

Purpose: Return one author by its custom id.

Success:

- Status code: `200`
- Response body: the matching author object

Errors:

- `404` if no author exists with that id
- `500` if an unexpected server or database error occurs

#### POST /authors

Purpose: Create a new author.

Request body:

    {
      "id": "a1",
      "name": "Example Author",
      "birthYear": 1980
    }

The request body must include all required author fields. The `id` and `name` must be strings, and the `birthYear` must be a valid number. Fields that are not part of the author data model should be rejected.

Success:

- Status code: `201`
- Response body: the newly created author object

Errors:

- `400` if a required field is missing
- `400` if the `id` already exists
- `400` if a field has an invalid value or data type
- `400` if the request contains fields that are not part of the author data model
- `500` if an unexpected server or database error occurs

#### PUT /authors/:id

Purpose: Update an existing author using the custom id provided in the route parameter.

Request body:

    {
      "name": "Updated Author Name",
      "birthYear": 1985
    }

The request body must include all required author fields. The `name` must be a string and the `birthYear` must be a valid number. Fields that are not part of the author data model should be rejected.

Success:

- Status code: `200`
- Response body: the updated author object

Errors:

- `400` if a required field is missing
- `400` if a field has an invalid value or data type
- `400` if the request contains fields that are not part of the author data model
- `404` if no author exists with the id provided in the route parameter
- `500` if an unexpected server or database error occurs

#### DELETE /authors/:id

Purpose: Delete an existing author.

Success:

- Status code: `204`
- Response body: none

Errors:

- `400` if one or more books still reference the author's id
- `404` if no author exists with that id
- `500` if an unexpected server or database error occurs

### Swagger Documentation

Swagger must document every author route.

### Deployment Expectations

After implementation, the author routes must work locally and from the deployed Render application. The deployed Swagger page at `/api-docs` must allow someone to test every author route from the browser.

## Test Plan

- `GET /authors` returns all authors.
- `GET /authors/:id` returns the matching author.
- `GET /authors/:id` returns `404` when the author does not exist.
- `POST /authors` creates an author and returns status `201`.
- `POST /authors` returns `400` when required fields are missing.
- `POST /authors` returns `400` when the `id` already exists.
- `POST /authors` returns `400` when a field has an invalid value or data type.
- `POST /authors` returns `400` when the request contains fields that are not part of the author data model.
- `PUT /authors/:id` updates an existing author.
- `PUT /authors/:id` returns `400` when required fields are missing.
- `PUT /authors/:id` returns `400` when a field has an invalid value or data type.
- `PUT /authors/:id` returns `400` when the request contains fields that are not part of the author data model.
- `PUT /authors/:id` returns `404` when the author does not exist.
- `DELETE /authors/:id` deletes an author who has no books referencing their id.
- `DELETE /authors/:id` returns `400` when one or more books still reference the author's id.
- `DELETE /authors/:id` returns `404` when the author does not exist.
- All author routes are documented in Swagger.
- All author routes can be tested locally from `/api-docs`.
- All author routes can be tested from the deployed Render `/api-docs` page.
- Author documents and changes can be verified in MongoDB Atlas Data Explorer.