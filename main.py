from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI(title="Task Tracker API")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

tasks = []

class Task(BaseModel):
    id: int
    title: str
    done: bool = False

@app.post("/tasks")
def create_task(task: Task):
    for t in tasks:
        if t.id == task.id:
            raise HTTPException(status_code=400, detail="Task ID already exists")
    tasks.append(task)
    return {"message": "Task added", "task": task}

@app.get("/tasks", response_model=List[Task])
def get_tasks():
    return tasks

@app.put("/tasks/{task_id}")
def update_task(task_id: int, done: bool):
    for t in tasks:
        if t.id == task_id:
            t.done = done
            return {"message": "Task updated", "task": t}
    raise HTTPException(status_code=404, detail="Task not found")

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    for t in tasks:
        if t.id == task_id:
            tasks.remove(t)
            return {"message": "Task deleted"}
    raise HTTPException(status_code=404, detail="Task not found")
