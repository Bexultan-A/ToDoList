from sqlmodel import Session, select
from app.models.user import User
from app.auth.utils import get_password_hash

def get_user_by_username(session: Session, username: str) -> User | None:
    statement = select(User).where(User.username == username)
    return session.exec(statement).first()

def create_user(session: Session, user_data: dict) -> User:
    hashed_password = get_password_hash(user_data["password"])
    new_user = User(
        username=user_data["username"],
        email=user_data["email"],
        hashed_password=hashed_password
    )
    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return new_user