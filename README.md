# BuyerForesight Backend

This is the backend for the BuyerForesight assignment project. It is a Node.js application structured with Express, providing user management features and a database connection.

## Project Structure

```
backend/
├── package.json
└── src/
    ├── server.js
    ├── config/
    │   └── db.js
    ├── controller/
    │   └── userController.js
    └── routes/
        └── userRoutes.js
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (comes with Node.js)
- MongoDB (or your configured database)

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your environment variables (if required) in a `.env` file.

### Running the Server

Start the backend server with:

```bash
npm start
```

The server will run on the port specified in your configuration (default: 3000).

## Main Files

- **src/server.js**: Entry point for the Express server.
- **src/config/db.js**: Database connection setup.
- **src/controller/userController.js**: User-related business logic.
- **src/routes/userRoutes.js**: User API routes.

## API Endpoints


Below are the actual API endpoints provided by this backend (see src/routes/userRoutes.js):

- `GET /users` — Get all users (supports `search`, `sort`, `order` query params)
- `GET /users/:id` — Get a user by ID
- `POST /users` — Create a new user
- `PUT /users/:id` — Update a user by ID
- `DELETE /users/:id` — Delete a user by ID

### Example Requests

**Get all users:**
```
GET /users
```
Optional query params:
- `search` — filter by name or email
- `sort` — sort by `name`, `email`, or `id`
- `order` — `asc` or `desc`

**Get a user by ID:**
```
GET /users/1
```

**Create a user:**
```
POST /users
Content-Type: application/json
{
   "name": "John Doe",
   "email": "john@example.com",
   "age": 25,
   "status": "active"
}
```

**Update a user:**
```
PUT /users/1
Content-Type: application/json
{
   "name": "Jane Doe",
   "email": "jane@example.com"
}
```

**Delete a user:**
```
DELETE /users/1
```

All endpoints return JSON responses. See the controller logic for detailed validation and error handling.

## Scripts

- `npm start` — Start the server
- `npm run dev` — Start the server with nodemon (if configured)

## License

This project is for assignment purposes only.
