import re
from flask import Response, jsonify 
import string 
import datetime
import random
import json


def is_valid_password(password): 
    match = re.match(r"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])", password)
    
    if bool(match) and len(password):
        return True
    
    return False

def generate_token(length):
    date = datetime.datetime.now()
    char_set = string.ascii_lowercase + string.ascii_uppercase + string.digits
    str_date = date.strftime("%Y%d%m%j%H%M%S%f")
    random_char = ''.join(random.choice(char_set) for _ in range(length))
    return random_char + str_date

def json_response(content):
    return json.dumps(content, ensure_ascii=False).encode('utf8')

def allowed_file(filename):
    allowed_extensions = {'gif', 'jpeg', 'jpg', 'png', 'svg'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in allowed_extensions 

def flashMsg(msg, type="success"):
    return {"type": type, "message": msg}
        
    

# Encrypt and decrypt password
# from argon2 import PasswordHasher
# ph = PasswordHasher()
# password = "P@55W0rd"
# hash = ph.hash(password)
# print(hash)
# print(ph.verify(hash, password))
        