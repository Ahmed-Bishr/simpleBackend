# Task Tracker API

A simple task tracking application with a FastAPI backend and HTML/JavaScript frontend.

## Overview

This project is a full-stack task tracker that allows users to create, read, update, and delete tasks. The backend is built with FastAPI (Python) and provides RESTful API endpoints, while the frontend is a single-page application using vanilla JavaScript and Bootstrap for styling.

## Features

- ✅ Create new tasks with unique IDs
- 📋 View all tasks
- ✔️ Mark tasks as done/undone
- 🗑️ Delete tasks
- 🎨 Clean and responsive UI with Bootstrap
- 🔄 CORS enabled for cross-origin requests

## Tech Stack

**Backend:**
- [FastAPI](https://fastapi.tiangolo.com/) - Modern Python web framework
- [Pydantic](https://docs.pydantic.dev/) - Data validation
- [Uvicorn](https://www.uvicorn.org/) - ASGI server

**Frontend:**
- HTML5
- JavaScript (ES6+)
- [Bootstrap 5.3.2](https://getbootstrap.com/) - CSS framework

## Installation

### Prerequisites

- Python 3.7+
- pip

### Setup

1. Clone the repository:
```bash
git clone https://github.com/Ahmed-Bishr/simpleBackend.git
cd simpleBackend
```

2. Install dependencies:
```bash
pip install fastapi uvicorn pydantic
```

## Usage

### Running the Backend

Start the FastAPI server: 

```bash
uvicorn main:app --reload
```

The API will be available at `http://127.0.0.1:8000`

- API Documentation (Swagger UI): `http://127.0.0.1:8000/docs`
- Alternative Documentation (ReDoc): `http://127.0.0.1:8000/redoc`

### Running the Frontend

Simply open `frontend.html` in your web browser: 

```bash
open frontend.html  # macOS
# or
start frontend.html  # Windows
# or
xdg-open frontend.html  # Linux
```

Alternatively, serve it with a simple HTTP server:

```bash
python -m http.server 8080
```

Then navigate to `http://localhost:8080/frontend.html`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/tasks` | Get all tasks |
| `POST` | `/tasks` | Create a new task |
| `PUT` | `/tasks/{task_id}` | Update task status |
| `DELETE` | `/tasks/{task_id}` | Delete a task |

### Example Requests

**Create a task:**
```bash
curl -X POST "http://127.0.0.1:8000/tasks" \
  -H "Content-Type: application/json" \
  -d '{"id": 1, "title": "Complete project", "done": false}'
```

**Get all tasks:**
```bash
curl "http://127.0.0.1:8000/tasks"
```

**Update a task:**
```bash
curl -X PUT "http://127.0.0.1:8000/tasks/1? done=true"
```

**Delete a task:**
```bash
curl -X DELETE "http://127.0.0.1:8000/tasks/1"
```

## Project Structure

```
simpleBackend/
├── main.py           # FastAPI backend application
├── frontend.html     # Frontend UI
└── test_main.http    # HTTP test requests
```

## Data Model

### Task

```python
{
    "id": int,        # Unique task identifier
    "title": str,     # Task description
    "done": bool      # Completion status (default: false)
}
```

## Development

### Testing with HTTP Client

The `test_main.http` file contains pre-configured HTTP requests for testing the API.  You can use it with REST clients like: 
- VS Code REST Client extension
- IntelliJ HTTP Client
- Postman

## Limitations

⚠️ **Note:** This is a simple demonstration project. Tasks are stored in memory and will be lost when the server restarts.  For production use, consider: 
- Adding a database (PostgreSQL, MongoDB, etc.)
- Implementing user authentication
- Adding data persistence
- Error handling improvements
- Input validation enhancements

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

**Ahmed Bishr**
- GitHub: [@Ahmed-Bishr](https://github.com/Ahmed-Bishr)

## Acknowledgments

- FastAPI for the excellent web framework
- Bootstrap for the UI components
