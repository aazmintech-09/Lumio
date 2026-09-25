"""Authentication Service - Handle auth logic, tokens, and user verification"""

from datetime import datetime, timedelta
from typing import Optional, Tuple
from jose import JWTError, jwt
from passlib.context import CryptContext
import os
from sqlalchemy.orm import Session

from app.models.student import User

class AuthService:
    """Authentication business logic"""
    
    def __init__(self):
        self.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
        self.secret_key = os.getenv("SECRET_KEY", "lumio-secret-key-for-testing")
        self.algorithm = "HS256"
        self.access_token_expire_days = 7
    
    def hash_password(self, password: str) -> str:
        """Hash a password using bcrypt"""
        return self.pwd_context.hash(password)
    
    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """Verify a plain password against a hash"""
        try:
            return self.pwd_context.verify(plain_password, hashed_password)
        except Exception:
            return False
    
    def create_access_token(
        self, 
        user_id: str, 
        expires_delta: Optional[timedelta] = None
    ) -> str:
        """
        Create a JWT access token.
        
        Args:
            user_id: The user's ID
            expires_delta: Optional custom expiration time
        
        Returns:
            JWT token string
        """
        to_encode = {"sub": user_id}
        
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(days=self.access_token_expire_days)
        
        to_encode.update({"exp": expire, "iat": datetime.utcnow()})
        
        try:
            encoded_jwt = jwt.encode(
                to_encode, 
                self.secret_key, 
                algorithm=self.algorithm
            )
            return encoded_jwt
        except Exception as e:
            raise Exception(f"Failed to create token: {str(e)}")
    
    def verify_token(self, token: str) -> Optional[str]:
        """
        Verify a JWT token and return the user_id.
        
        Args:
            token: JWT token string
        
        Returns:
            User ID if valid, None if invalid
        """
        try:
            payload = jwt.decode(
                token, 
                self.secret_key, 
                algorithms=[self.algorithm]
            )
            user_id: str = payload.get("sub")
            
            if user_id is None:
                return None
            
            return user_id
        
        except JWTError:
            return None
        except Exception:
            return None
    
    def register_user(
        self,
        db: Session,
        email: str,
        password: str,
        full_name: str,
        education_level: str = "primary_6"
    ) -> Tuple[bool, str, Optional[User]]:
        """
        Register a new user.
        
        Args:
            db: Database session
            email: User's email
            password: Plain text password
            full_name: User's full name
            education_level: Nigerian education level
        
        Returns:
            (success: bool, message: str, user: Optional[User])
        """
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == email).first()
        if existing_user:
            return False, "Email already registered", None
        
        # Validate inputs
        if not email or not password or not full_name:
            return False, "Missing required fields", None
        
        if len(password) < 6:
            return False, "Password must be at least 6 characters", None
        
        if len(full_name) < 2:
            return False, "Full name must be at least 2 characters", None
        
        try:
            # Create new user
            new_user = User(
                email=email.lower().strip(),
                full_name=full_name.strip(),
                password_hash=self.hash_password(password),
                education_level=education_level,
                created_at=datetime.utcnow()
            )
            
            db.add(new_user)
            db.commit()
            db.refresh(new_user)
            
            return True, "User registered successfully", new_user
        
        except Exception as e:
            db.rollback()
            return False, f"Registration failed: {str(e)}", None
    
    def login_user(
        self,
        db: Session,
        email: str,
        password: str
    ) -> Tuple[bool, str, Optional[User], Optional[str]]:
        """
        Authenticate a user and return access token.
        
        Args:
            db: Database session
            email: User's email
            password: Plain text password
        
        Returns:
            (success: bool, message: str, user: Optional[User], token: Optional[str])
        """
        # Find user by email
        user = db.query(User).filter(User.email == email.lower().strip()).first()
        
        if not user:
            return False, "Invalid email or password", None, None
        
        # Verify password
        if not self.verify_password(password, user.password_hash):
            return False, "Invalid email or password", None, None
        
        # Create token
        try:
            access_token = self.create_access_token(user_id=user.id)
            return True, "Login successful", user, access_token
        
        except Exception as e:
            return False, f"Token creation failed: {str(e)}", None, None
    
    def refresh_token(self, db: Session, user_id: str) -> Tuple[bool, Optional[str]]:
        """
        Create a new access token for an existing user.
        
        Args:
            db: Database session
            user_id: The user's ID
        
        Returns:
            (success: bool, token: Optional[str])
        """
        # Verify user exists
        user = db.query(User).filter(User.id == user_id).first()
        
        if not user:
            return False, None
        
        try:
            new_token = self.create_access_token(user_id=user_id)
            return True, new_token
        except Exception:
            return False, None
    
    def get_user_by_id(self, db: Session, user_id: str) -> Optional[User]:
        """
        Retrieve a user by ID.
        
        Args:
            db: Database session
            user_id: The user's ID
        
        Returns:
            User object or None
        """
        try:
            user = db.query(User).filter(User.id == user_id).first()
            return user
        except Exception:
            return None
    
    def get_user_by_email(self, db: Session, email: str) -> Optional[User]:
        """
        Retrieve a user by email.
        
        Args:
            db: Database session
            email: User's email
        
        Returns:
            User object or None
        """
        try:
            user = db.query(User).filter(
                User.email == email.lower().strip()
            ).first()
            return user
        except Exception:
            return None
    
    def update_user_profile(
        self,
        db: Session,
        user_id: str,
        full_name: Optional[str] = None,
        education_level: Optional[str] = None
    ) -> Tuple[bool, str, Optional[User]]:
        """
        Update user profile information.
        
        Args:
            db: Database session
            user_id: The user's ID
            full_name: Optional new full name
            education_level: Optional new education level
        
        Returns:
            (success: bool, message: str, user: Optional[User])
        """
        try:
            user = db.query(User).filter(User.id == user_id).first()
            
            if not user:
                return False, "User not found", None
            
            if full_name:
                user.full_name = full_name.strip()
            
            if education_level:
                user.education_level = education_level
            
            user.updated_at = datetime.utcnow()
            
            db.commit()
            db.refresh(user)
            
            return True, "Profile updated successfully", user
        
        except Exception as e:
            db.rollback()
            return False, f"Update failed: {str(e)}", None
    
    def change_password(
        self,
        db: Session,
        user_id: str,
        old_password: str,
        new_password: str
    ) -> Tuple[bool, str]:
        """
        Change a user's password.
        
        Args:
            db: Database session
            user_id: The user's ID
            old_password: Current password (plain text)
            new_password: New password (plain text)
        
        Returns:
            (success: bool, message: str)
        """
        try:
            user = db.query(User).filter(User.id == user_id).first()
            
            if not user:
                return False, "User not found"
            
            # Verify old password
            if not self.verify_password(old_password, user.password_hash):
                return False, "Current password is incorrect"
            
            # Validate new password
            if len(new_password) < 6:
                return False, "New password must be at least 6 characters"
            
            if old_password == new_password:
                return False, "New password must be different from current password"
            
            # Update password
            user.password_hash = self.hash_password(new_password)
            user.updated_at = datetime.utcnow()
            
            db.commit()
            
            return True, "Password changed successfully"
        
        except Exception as e:
            db.rollback()
            return False, f"Password change failed: {str(e)}"
    
    def delete_user(self, db: Session, user_id: str) -> Tuple[bool, str]:
        """
        Delete a user account.
        
        Args:
            db: Database session
            user_id: The user's ID
        
        Returns:
            (success: bool, message: str)
        """
        try:
            user = db.query(User).filter(User.id == user_id).first()
            
            if not user:
                return False, "User not found"
            
            db.delete(user)
            db.commit()
            
            return True, "User account deleted successfully"
        
        except Exception as e:
            db.rollback()
            return False, f"Deletion failed: {str(e)}"
    
    def validate_email_format(self, email: str) -> bool:
        """Check if email format is valid"""
        if not email or "@" not in email or "." not in email:
            return False
        return True
    
    def validate_password_strength(self, password: str) -> Tuple[bool, str]:
        """
        Validate password meets security requirements.
        
        Returns:
            (is_valid: bool, message: str)
        """
        if len(password) < 6:
            return False, "Password must be at least 6 characters"
        
        if len(password) > 128:
            return False, "Password must be less than 128 characters"
        
        return True, "Password is strong"