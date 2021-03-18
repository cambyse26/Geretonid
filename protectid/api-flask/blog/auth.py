from .models import User, db, user_serialize
from .utils import generate_token
import logging
from werkzeug.security import check_password_hash

def login (data): 
    email = data['email']
    password = str(data['password'])
    user = User.query.filter_by(email=email).first()
    
    if isinstance(user, User): 
        if check_password_hash(user.password, password):   
            token = generate_token(80)
            user.token = token
            db.session.commit()
            
            return {"token" : token}       
        
        return {"errors": "Bad credentials !"}
        
    else :
        return {"errors" : 'No user found'} 
    
def checkToken(provided_token):
    
    user = User.query.filter_by(token=provided_token).first()
    
    if isinstance(user, User):
        return True
    return False
    