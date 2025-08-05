from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlmodel import Session
from typing import List, Optional
from app.models.task import Task
from app.schemas.task import TaskRead, TaskCreate, TaskUpdate
from app.crud.task import (
    create_task,
    get_user_tasks,
    get_task_by_id,
    update_task,
    delete_task
)
from app.auth.dependencies import get_current_user
from app.models.user import User
from app.database import get_session

router = APIRouter()

@router.post("/", response_model=TaskRead)
def create_new_task(
    task: TaskCreate,
    user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    return create_task(session, task.dict(), user.id)

@router.get("/", response_model=List[TaskRead])
def read_tasks(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, le=100),
    completed: Optional[bool] = None,
    user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    tasks = get_user_tasks(session, user.id, skip, limit)
    if completed is not None:
        tasks = [task for task in tasks if task.is_completed == completed]
    return tasks

@router.get("/{task_id}", response_model=TaskRead)
def read_task(
    task_id: int,
    user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    task = get_task_by_id(session, task_id, user.id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@router.put("/{task_id}", response_model=TaskRead)
def update_existing_task(
    task_id: int,
    task: TaskUpdate,
    user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    db_task = get_task_by_id(session, task_id, user.id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return update_task(session, db_task, task.dict(exclude_unset=True))

@router.delete("/{task_id}")
def delete_existing_task(
    task_id: int,
    user: User = Depends(get_current_user),
    session: Session = Depends(get_session)
):
    db_task = get_task_by_id(session, task_id, user.id)
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    delete_task(session, db_task)
    return {"ok": True}