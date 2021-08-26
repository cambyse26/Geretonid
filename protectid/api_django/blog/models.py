from django.db import models
from datetime import datetime
from werkzeug.security import generate_password_hash
from validate_email import validate_email
from .utils import *
from tinymce.widgets import TinyMCE
from django.contrib import admin
from django.http import HttpRequest
from urllib.parse import urljoin
import re
import logging

class Post (models.Model) :
    Titre = models.CharField(max_length=200, null=True)
    Sous_titre = models.TextField(null=True)
    Contenu = models.TextField(null=True)
    Image1 = models.ImageField(max_length=255, null=True, upload_to='blog/static/')
    Image2 = models.ImageField(max_length=255, null=True, blank=True, upload_to='blog/static/')
    Image3 = models.ImageField(max_length=255, null=True, blank=True, upload_to='blog/static/')
    Status = models.CharField(max_length=100, null=True)
    
class textEditor(models.Model): # new

   content = models.TextField() #new    
class textEditorAdmin(admin.ModelAdmin):

   list_display = ["content"]

   formfield_overrides = {

   models.TextField: {'widget': TinyMCE()}

   }
admin.site.register(textEditor, textEditorAdmin)
class User (models.Model) :
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=255)
    token = models.CharField(max_length=120)

    def __init__(self, email, password, token): 
        self.email = email
        self.password = generate_password_hash(password, method='sha256')
        self.token = token

class Upload (models.Model) :
    Image = models.ImageField()

def createUser(data) :
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
    
    User.objects.create(email=email, password=password, token=generate_token)

def updateUser(id, data) :
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
    User.objects.filter(id=id).update(email=email, password=password, token=generate_token)

def deleteUser(id) :
    User.objects.filter(id).delete()

def createUpload(filename):
    base_url = HttpRequest.get_host()
    path = urljoin( base_url + 'static/uploads/', filename)
    Upload.objects.create(path)

def deleteUpload(id) :
    Upload.objects.filter(id).delete()

def deletePost(id) :
    Post.objects.filter(id).delete()

def generateFakePosts() :
    for i in range(2, 20) :
        status = 'draft'
        if i < 15 :
            status = 'published'
        Post.objects.create(title=f'Titre de l\'article {i}', content="Contenu de l'article", excerpt="Résumé de l'article", poster="./yyuuhj/opp.pnl", status=status)

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
