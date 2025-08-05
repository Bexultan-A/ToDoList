from sqlmodel import Session, select
from typing import List
from app.models.task import Task
from datetime import datetime

def create_task(session: Session, task_data: dict, user_id: int) -> Task:
    new_task = Task(**task_data, user_id=user_id)
    session.add(new_task)
    session.commit()
    session.refresh(new_task)
    return new_task

def get_user_tasks(session: Session, user_id: int, skip: int = 0, limit: int = 100) -> List[Task]:
    statement = select(Task).where(Task.user_id == user_id).offset(skip).limit(limit)
    return session.exec(statement).all()

def get_task_by_id(session: Session, task_id: int, user_id: int) -> Task | None:
    statement = select(Task).where(Task.id == task_id).where(Task.user_id == user_id)
    return session.exec(statement).first()

def update_task(session: Session, db_task: Task, task_data: dict) -> Task:
    for key, value in task_data.items():
        setattr(db_task, key, value)
    db_task.updated_at = datetime.utcnow()
    session.add(db_task)
    session.commit()
    session.refresh(db_task)
    return db_task

def delete_task(session: Session, db_task: Task) -> None:
    session.delete(db_task)
    session.commit()