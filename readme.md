
# 🧾 MERN Inventory Management Tool (with Vite Frontend)

A full-stack inventory management system built using the **MERN stack** (MongoDB, Express, React, Node.js) with a modern and fast **Vite + TailwindCSS** frontend.

---

## 🚀 Features

- 🔐 User registration & JWT-based authentication
- 📦 Add, view, and update products
- 📄 Paginated product listing per user
- 💻 Responsive UI built with React + Vite + TailwindCSS
- 📦 Modular backend architecture (routes, models, controllers, middleware)

---

## 📦 Prerequisites

Ensure the following software is installed:

- **Node.js & npm**: [Download Node.js](https://nodejs.org/)
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **Code Editor** (Recommended: [VS Code](https://code.visualstudio.com/))

---

## 🛠️ Backend Setup

1. **Navigate to Backend Folder**

```bash
cd path/to/your/project/backend
```

2. **Install Dependencies**

```bash
npm install
```

3. **Setup Environment Variables**

Create a `.env` file in the backend root:

```
MONGO_URI=mongodb://localhost:27017/inventory-management
JWT_SECRET=your_super_secret_jwt_key_that_is_long_and_random
PORT=5000
```

4. **Start the Server**

Ensure MongoDB is running, then:

```bash
npm start
# or for development with nodemon
npm run dev
```

> 🌐 Server runs at: `http://localhost:5000`

---

## 🌐 Frontend (Vite) Setup

1. **Navigate to Frontend Folder**

```bash
cd path/to/your/project/frontend
```

2. **Install Dependencies**

```bash
npm install
```

3. **Run the Development Server**

```bash
npm run dev
```

> 🌍 Vite Dev Server: `http://localhost:5173`

---

## 📡 API Endpoints

### 🧑 User Authentication

| Method | Endpoint              | Description             |
|--------|-----------------------|-------------------------|
| POST   | `/api/users/register` | Register a new user     |
| POST   | `/api/users/login`    | Authenticate and get JWT|

### 📦 Product Management *(Auth Required)*

| Method | Endpoint                          | Description                           |
|--------|-----------------------------------|---------------------------------------|
| GET    | `/api/products`                   | Get paginated list of user's products |
| POST   | `/api/products`                   | Add a new product                     |
| PUT    | `/api/products/:id/quantity`      | Update product quantity               |

---

## 🧑‍💻 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT
- **Tooling**: dotenv, cors, nodemon, bcryptjs, etc.

---

## 📁 Project Structure

```bash
inventory-app/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── frontend/
│   ├── src/
│   └── vite.config.js
```

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).

---

## ✨ Author

Built with ❤️ by [Your Name]
