# 📝 To-Do List with Authentication

A full-stack web application featuring user authentication and task management.

## Tech Stack

- **Backend**: FastAPI + SQLModel (SQLite)
- **Frontend**: Next.js + Mantine UI + TailwindCSS

---

## Features

- User registration and login with JWT authentication
- Complete CRUD operations for tasks
- Tasks linked to logged-in users
- Responsive UI
- Pagination and task filtering
- Docker support for easy deployment

---

## Prerequisites

> Recommended: Use **Docker + Docker Compose**

If running manually:

- Python 3.9+
- Node.js 16+

---

## Quick Start (with Docker)

1. **Clone the repository:**

```bash
git clone https://github.com/Bexultan-A/ToDoList.git
cd ToDoList
```

2. **Start the services:**
```bash
docker-compose up --build
```

**UPDATE: docker-compose Error (Docker doesn't see Dockerfile files). If you face this error:**
```bash
failed to solve: failed to read dockerfile: open Dockerfile: no such file or directory
```
Try do these steps:
- Go to ToDoList/backend/Dockerfile
- Copy file content
- Delete ToDoList/backend/Dockerfile
- Create file named Dockerfile (yes, again)
- Paste copied file content

Same for frontend
- Go to ToDoList/frontend/Dockerfile
- Copy file content
- Delete ToDoList/frontend/Dockerfile
- Create file named Dockerfile (yes, again)
- Paste copied file content

Start the server again
```bash
docker-compose up --build
```
  
3. **Access the application:**


- **Frontend**: http://localhost:3000/sign-in
- **Backend API**: http://localhost:8000/api
- **API Docs**: http://localhost:8000/docs

---

## Manual Installation

### Backend Setup
```bash
cd backend
python -m venv venv
Mac: source venv/bin/activate | On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

| Endpoint                 | Method | Description                |
|--------------------------|--------|----------------------------|
| `/api/users/register`    | POST   | Register a new user        |
| `/api/users/login`       | POST   | Login user (get JWT token) |
| `/api/tasks/`            | GET    | Get all tasks (paginated)  |
| `/api/tasks/`            | POST   | Create new task            |
| `/api/tasks/{task_id}`   | GET    | Get single task            |
| `/api/tasks/{task_id}`   | PUT    | Update task                |
| `/api/tasks/{task_id}`   | DELETE | Delete task                |

---

## Example API Requests

### Register a User

```bash
curl -X POST "http://localhost:8000/api/users/register" \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "email": "test@example.com", "password": "password123"}'
```

### Login

```bash
curl -X POST "http://localhost:8000/api/users/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=testuser&password=password123"
```

### Create a Task (Authenticated)

```bash
curl -X POST "http://localhost:8000/api/tasks/" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title": "My first task", "description": "Remember to test the API"}'
```
