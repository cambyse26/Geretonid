from flask_sqlalchemy import SQLAlchemy
import logging
from .views import app 
from datetime import datetime
from slugify import slugify, Slugify, UniqueSlugify
from .utils import *
import re
from validate_email import validate_email
from werkzeug.security import generate_password_hash
import os.path
from os import path
from flask import request 


# Create database connection object
db = SQLAlchemy(app)
custom_slugify = Slugify(to_lower=True)


class Post (db.Model):
    __tablename__ = 'posts'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=True)
    content = db.Column(db.Text, nullable=True)
    excerpt = db.Column(db.Text, nullable=True)
    poster = db.Column(db.String(255), nullable=True)
    status = db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, nullable=True, default=None)
    slug=db.Column(db.String(255), nullable=True)
        
    def __init__(self, title, content, excerpt, poster, status="draft", slug=""): 
        self.title = title
        self.content = content
        self.excerpt = excerpt
        self.poster = poster
        self.status = status
        if slug != "": 
            slug = slug
        else:
            slug = title
        self.slug = custom_slugify(slug)
    

class User (db.Model): 
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(200))
    password = db.Column(db.String(255))
    token = db.Column(db.String(120))
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now())
            
    def __init__(self, email, password, token): 
        self.email = email
        self.password = generate_password_hash(password, method='sha256')
        self.token = token
    

class Upload (db.Model):
    __tablename__ = 'uploads'
    
    id = db.Column(db.Integer, primary_key=True)
    path = db.Column(db.String(100))    
            
    def __init__(self, path): 
        self.path = path  
        

def user_serialize(user):
    return {"id" : user.id, "email" : user.email, "password" : user.password, "token" : user.token, "created_at" : (user.created_at).strftime('%Y-%d-%m %H:%M:%S') }
        

def post_serialize(post):
    if type(post.updated_at) == None:
        post.updated_at = (post.updated_at).strftime('%Y-%d-%m %H:%M:%S')
    else: 
        post.updated_at = ""
        
    return {"id" : post.id, "title" : post.title, "content" : post.content, "excerpt" : post.excerpt, "status" : post.status, "poster" : post.poster, "created_at" : (post.created_at).strftime('%Y-%d-%m %H:%M:%S'), "updated_at" : post.updated_at, "slug" : post.slug }
        

def upload_serialize(upload):
    return {"id" : upload.id, "path" : upload.path}


def createUser(data):
    errors = {"email" : "Cette adresse n'est pas vailde"}
    email = data['email']
    password = str(data['password'])
    match = re.match(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])',password)
    logging.warning(type(password))
    if bool(match) and len(password) >= 8 : 
        pass
    else :
        errors['password'] = 'Le mot de passe doit contenir une minuscule, une majuscule, un chiffre et au moins 8 caractères !'
    
    if validate_email(email) :
        user = User.query.filter_by(email=email).first()
        del errors['email']
        if isinstance(user, User) :
            errors['email'] = "Cette adresse mail est déjà utilisée"
        pass
    
    if len(errors) > 0 :
        return errors
    
    db.session.add(User(email=email, password=password, token=generate_token(80)))
    db.session.commit()
    
    return 'user created'

def updateUser(data, id):
    errors = {"email" : "Cette adresse n'est pas vailde"}
    email = data['email']
    password = str(data['password'])
    match = re.match(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])',password)
    if bool(match) and len(password) >= 8 : 
        pass
    else :
        errors['password'] = 'Le mot de passe doit contenir une minuscule, une majuscule, un chiffre et au moins 8 caractères !'
    
    if validate_email(email) :
        dbUser = User.query.filter_by(email=email).first()
        del errors['email']
        if isinstance(dbUser, User) :
            errors['email'] = "Cette adresse mail est déjà utilisée"
        pass
    
    if len(errors) > 0 :
        return errors
    
    user = User.query.filter_by(id=id).first()
    user.email = email 
    user.password = generate_password_hash(password, method='sha256')
    user.token = generate_token(80)
    db.session.commit()
    
    return 'user updated'

def createUpload (filename):
    base_url = request.host_url
    path = base_url.join(( base_url + 'static/uploads/', filename))
    db.session.add(Upload(path=path)) 
    db.session.commit()
    
    return True      
    

def deleteUser(id):
    user = User.query.filter_by(id=id).first()
    if isinstance(user, User):
        db.session.delete(user)
        db.session.commit()
        return "user deleted"
    return "User not Found"

def deletePost(id):
    post = Post.query.filter_by(id=id).first()
    if isinstance(post, Post) :
        db.session.delete(post)
        db.session.commit()
        return "post deleted"
    return "Post not found"

def deleteUpload(id):
    upload = Upload.query.filter_by(id=id).first()
    if isinstance(upload, Upload) :
        db.session.delete(upload)
        db.session.commit()
        return "upload deleted"
    return "Upload not found"
    
# Generate fake posts
def loopPosts():
    for i in range(2, 150):
        status = "draft"
        if i < 95:
            status = "published"
        db.session.add(Post(title=f'Titre de l\'article {i}', content="Contenu de l'article", excerpt="Résumé de l'article", poster="./yyuuhj/opp.pnl", status=status))
    db.session.commit()
    logging.warning('posts created')
    
def init_db():
    db.drop_all()
    db.create_all()        
    db.session.add(Post(title='Titre de l\'article', content="Contenu de l'article", excerpt="Résumé de l'article", poster="./yyuuhj/opp.pnl"))
    db.session.add(User(email='fagathe77@gmail.com', password="Motdep01", token=generate_token(80)))
    db.session.add(Upload(path="./uploads/toto.png"))
    db.session.commit()
    logging.warning('Query finished')
   