# 📚 Book Review API

A RESTful API built using **Node.js**, **Express.js**, and **MongoDB** for managing books and reviews. This project is part of a mini-assignment for a Junior Backend Developer role and demonstrates backend fundamentals, clean API design, and JWT-based authentication.

---

## 🔧 Tech Stack

- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT (for authentication)
- bcrypt.js (for password hashing)

---

## 🚀 Project Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/book-review-api.git
cd book-review-api
```

2. **Install dependencies**

```bash
npm install
```

3. **Create a `.env` file** in the root directory:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

4. **Run the server**

```bash
npm run dev
```

Server will start on `http://localhost:5000`

---

## ▶️ How to Run Locally

```bash
npm install
npm run dev
```

Make sure MongoDB Atlas connection is configured correctly in `.env`

---

## 📬 Example API Requests

### 🔐 Auth

**POST /api/auth/signup**

```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test1234"}'
```

**POST /api/auth/login**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"test1234"}'
```

### 📚 Books

**POST /api/books** (Requires Auth)

```bash
curl -X POST http://localhost:5000/api/books \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"title":"Atomic Habits","author":"James Clear","genre":"Self-help","description":"Habit building"}'
```

**GET /api/books?author=James**

```bash
curl http://localhost:5000/api/books?author=James
```

**GET /api/books/:id**

```bash
curl http://localhost:5000/api/books/<BOOK_ID>
```

### ⭐ Reviews

**POST /api/books/:id/reviews**

```bash
curl -X POST http://localhost:5000/api/books/<BOOK_ID>/reviews \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"rating":5,"comment":"Amazing book!"}'
```

**PUT /api/reviews/:id**

```bash
curl -X PUT http://localhost:5000/api/reviews/<REVIEW_ID> \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"rating":4,"comment":"Very helpful."}'
```

**DELETE /api/reviews/:id**

```bash
curl -X DELETE http://localhost:5000/api/reviews/<REVIEW_ID> \
  -H "Authorization: Bearer <TOKEN>"
```

**GET /api/books/search?q=habit**

```bash
curl http://localhost:5000/api/books/search?q=habit
```

---

## 🧠 Design Decisions & Assumptions

- **One review per user per book**: Enforced in the backend to maintain meaningful review data.
- **Pagination**: Implemented on `GET /books` and review listings in `GET /books/:id` to improve scalability.
- **Authentication**: JWT is used for secure user sessions and required for creating, updating, or deleting books and reviews.
- **Error Handling**: Proper error responses are returned for invalid operations (e.g., unauthorized actions).
- **Modularity**: Project follows MVC structure with separate folders for models, routes, controllers, and middleware for clean maintainability.

---

## 🗃️ Database Schema

### users

```json
{
  "_id": ObjectId,
  "username": String,
  "password": String (hashed)
}
```

### books

```json
{
  "_id": ObjectId,
  "title": String,
  "author": String,
  "genre": String,
  "description": String
}
```

### reviews

```json
{
  "_id": ObjectId,
  "book": ObjectId (ref: Book),
  "user": ObjectId (ref: User),
  "rating": Number,
  "comment": String,
  "createdAt": Date,
  "updatedAt": Date
}
```

---

## ✅ Submission

- Push to GitHub: [your-repo-link-here]
- Submit the repo link in the Airtable form as instructed.

---

## ✅ Author

Made with ❤️ for Junior Backend Developer Assignment.
