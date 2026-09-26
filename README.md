# PromptVault Backend

PromptVault Backend is the Express.js and MongoDB API for the PromptVault application. It handles user authentication, prompt creation, prompt lookup, search, update/delete, download export, and AI-generated tag suggestions using Gemini.

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT authentication
- Cookie-based auth
- Google Gemini API via @google/genai
- Dotenv for environment config

## Project Structure

```bash
Backend/
├── server.js
├── package.json
├── README.md
├── .env
├── src/
│   ├── app.js
│   ├── controllers/
│   │   ├── auth.controllers.js
│   │   ├── json.controllers.js
│   │   └── prompts.controllers.js
│   ├── db/
│   │   └── db.js
│   ├── middlewares/
│   │   └── auth.middlewares.js
│   ├── models/
│   │   ├── prompts.models.js
│   │   └── user.models.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   └── prompts.routes.js
│   ├── Services/
│   │   └── ai.service.js
│   └── app.js
```

## Requirements

- Node.js (recommended latest LTS)
- MongoDB instance or MongoDB Atlas connection string
- Gemini API key

## Environment Variables

Create a `.env` file in the `Backend` directory with the following values:

```env
MONGO_URI=your_mongodb_connection_uri
JWT_TOKEN=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

Example:

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/promptvault
JWT_TOKEN=supersecretjwtkey
GEMINI_API_KEY=your-google-gemini-key
```

## Installation

```bash
npm install
```

## Run the Server

```bash
npm start
```

The server runs on:

```bash
http://localhost:4213
```

## API Endpoints

### Authentication

#### Register User

```http
POST /api/auth/register
```

Request body:

```json
{
  "email": "john@example.com",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "password": "John@123"
}
```

#### Login User

```http
POST /api/auth/login
```

Request body:

```json
{
  "email": "john@example.com",
  "password": "John@123"
}
```

On successful login, the server sets a cookie named `token`.

#### Get Logged-in User

```http
GET /api/auth/me
```

Requires the `token` cookie.

#### Logout User

```http
POST /api/auth/logout
```

Requires the `token` cookie.

### Prompt Management

#### Create Prompt

```http
POST /api/prompt/create
```

Requires authentication cookie.

Request body:

```json
{
  "title": "Write a cold email for SaaS outreach",
  "content": "Write a short, friendly cold email to a founder offering a free product demo for their SaaS team.",
  "description": "This prompt helps generate outreach emails for sales conversations.",
  "isPublic": true
}
```

#### Get All Prompts

```http
GET /api/prompt/getAll
```

Optional query filter:

```http
GET /api/prompt/getAll?tags=saas
```

#### Get Prompt by ID

```http
GET /api/prompt/getById/:id
```

#### Update Prompt

```http
PATCH /api/prompt/update/:id
```

#### Delete Prompt

```http
DELETE /api/prompt/delete/:id
```

#### Download Prompt JSON

```http
GET /api/prompt/download/:id
```

Requires authentication cookie.

## Authentication Flow

The backend uses a JWT stored in a cookie named `token`.

Example:

```http
Cookie: token=eyJhbGciOiJIUzI1NiJ9...
```

This token is validated in the auth middleware before protected prompt routes are accessed.

## AI Tag Generation

The prompt creation flow calls the Gemini service to generate tags automatically from the prompt title and content.

The generated tags are stored in the `tags` array on each prompt.

## Notes

- The app currently uses `cookie-parser` for auth cookies.
- All protected routes require a valid `token` cookie.
- `download` route returns the prompt as a JSON file.

## Troubleshooting

### Server not starting

- Check that MongoDB URI is valid.
- Check that `.env` exists and includes all required keys.
- Ensure dependencies are installed.

### Login fails

- Verify the user exists in MongoDB.
- Confirm the email and password match the registered user.
- Confirm the JWT secret is set correctly.

### Gemini tags are empty

- Check that `GEMINI_API_KEY` is set correctly.
- Ensure the API key is valid and has access to Gemini models.

## License

ISC
