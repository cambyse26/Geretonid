from flask import Flask, render_template, jsonify, request
from argon2 import PasswordHasher
import json
from .utils import *
import pdb
import pickle
import logging as log
import os
from werkzeug.utils import secure_filename
from datetime import datetime

app = Flask(__name__)

from .middleware import middleware
from .models import *
from .auth import login
 
# Config options - Make sure you created a 'config.py' file.
app.config.from_object('config')
# To get one variable, tape app.config['MY_VARIABLE']
# json_input = request.get_json()

# calling our middleware
app.wsgi_app = middleware(app.wsgi_app)

# Initialiser la base de données
# init_db()

# pdb.set_trace()
@app.route('/api/users', methods=['GET', 'POST'])
def api_users():
    if request.method == "GET":
        users = User.query.all()
        json_users = []
        
        for user in users:
            json_users.append(user_serialize(user))
            
        return json_response(json_users)
    
    if request.method == "POST" :
        data = request.get_json()
        result = createUser(data)
        
        if type(result) is str:
            return json_response(result), 201
        
        return json_response({"errors" : result}), 400
        

@app.route('/api/users/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def api_user(id):
    if request.method == 'GET':
        user = User.query.filter_by(id=id).first()
        
        if isinstance(user, User) != True:
            return json_response('user not found'), 404
        
        return json_response(user_serialize(user)), 200
    
    if request.method == 'PUT': 
        data = request.get_json()
        user = User.query.filter_by(id=id).first()

        if isinstance(user, User) != True:
            return json_response('user not found'), 404

        result = updateUser(data, id)

        if type(result) is str:
            return json_response(result), 201

        return json_response({"errors" : result}), 400
                             
    if request.method == "DELETE" : 
        user = User.query.filter_by(id=id).first()
        
        if isinstance(user, User) != True:
            return json_response('user not found'), 404
        
        response = deleteUser(id=id)
            
        if response != True :            
            return json_response(response), 400      
              
        return json_response(response), 200


@app.route('/api/posts', methods=['GET', "POST"])
def api_posts():
    if request.method == "GET":
        
        args = request.args
        default_items_per_page = 10
        items_per_page = default_items_per_page
        
        if len(args) > 0:
            if args.get('items_per_page') != None:
                items_per_page = args.get('items_per_page')
            page = int(args.get('page'))
            
            posts = Post.query.filter_by(status="published").order_by(Post.created_at.desc()).paginate(page=page, per_page=items_per_page, error_out=True)
            
            json_posts = [] 
            
            for post in posts.items:
                json_posts.append(post_serialize(post))
            
            return json_response(json_posts), 200
        
        posts = Post.query.all()
        json_posts = []
        
        for post in posts:
            json_posts.append(post_serialize(post))
            
        return json_response(json_posts), 200
    
    if request.method == "POST":
        data = request.form
        poster = ""
        
        if len(data) > 0 : 
            
            if "poster" in request.files :
                file = request.files['poster']
                # if user does not select file, browser also
                # submit an empty part without filename
                
                if file.filename != '':
                    filename = secure_filename(file.filename) + '_' +  (datetime.datetime.now()).strftime("%Y%d%m%j%H%M%S%f")
                    file.save(os.path.join(app.config['UPLOAD_DIRECTORY'], filename)) 
                    createUpload(filename)
                    poster = ''.join('/static/uploads/' + filename)
            
            post = Post(content=data.get('content'), title=data.get('title'), excerpt=data.get('excerpt'), poster=poster, status=data.get('status'), slug=data.get('slug') )
            
            db.session.add(post)
            db.session.commit()
            
            return json_response("post created"), 201
        
        return json_response({'errors' : 'No data received'}), 400        
    

@app.route('/api/posts/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def api_post(id):
    if request.method == 'GET': 
        post = Post.query.filter_by(id=id).first()
        
        if isinstance(post, Post) != True:
            return json_response('post not found'), 404
        
        return json_response(post_serialize( post))
    
    if request.method == "PUT":
        data = request.form
        poster = ""
        post = Post.query.filter_by(id=id).first()
            
        if isinstance(post, Post) != True:
            return json_response('post not found'), 404
        
        if len(data) > 0 : 
            if "poster" in request.files :
                file = request.files['poster']
                # if user does not select file, browser also
                # submit an empty part without filename
                if file.filename != '':
                    filename = secure_filename(file.filename) + '_' +  (datetime.datetime.now()).strftime("%Y%d%m%j%H%M%S%f")
                    file.save(os.path.join(app.config['UPLOAD_DIRECTORY'], filename)) 
                    createUpload(filename)
                    poster = ''.join('/static/uploads/' + filename)
            
            post.content=data.get('content')
            post.title=data.get('title')
            post.excerpt=data.get('excerpt')
            post.poster=poster
            post.status=data.get('status')
            post.slug=data.get('slug')
            post.updated_at = datetime.datetime.now()
            
            db.session.commit()
            
            return json_response("post updated"), 201
        
        return json_response('No data received'), 400  
    
    if request.method == 'DELETE': 
        post = Post.query.filter_by(id=id).first()
            
        if isinstance(post, Post) != True:
            return json_response('post not found'), 404
        
        response = deletePost(id=id)   
          
        return json_response(response), 200


@app.route('/api/uploads', methods=['GET', 'POST'])
def api_uploads():
    if request.method == "GET": 
        uploads = Upload.query.all()
        json_uploads = []
        
        for upload in uploads:
            json_uploads.append(upload_serialize(upload=upload))
            
        return json_response(json_uploads), 200
    
    if request.method == "POST":
        if 'file' not in request.files:
            
            return json_response("No file received"), 400
        
        file = request.files['file']
        
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            
            return json_response('No file selected'), 400
        
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename) + '_' +  (datetime.datetime.now()).strftime("%Y%d%m%j%H%M%S%f")
            file.save(os.path.join(app.config['UPLOAD_DIRECTORY'], filename))
            createUpload(filename)
            
            return json_response('File uploaded !'), 201
        
        return json_response("No file received"), 400

@app.route('/api/uploads/<int:id>', methods=['GET', 'DELETE'])
def api_upload():
    if request.method == "GET": 
        upload = Upload.query.filter_by(id=id)
        
        if isinstance(upload, Upload) != True:
            return json_response("Upload not found"), 404
            
        return json_response(upload_serialize(upload)), 200
    
    if request.method == "DELETE":
        upload = Upload.query.filter_by(id=id)
        
        if isinstance(upload, Upload) != True:
            return json_response("Upload not found"), 404
        
        response = deleteUpload(id=id)
            
        if response != True :            
            return json_response(response), 400      
              
        return json_response(response), 200
               
    
@app.route('/post/form', methods=["GET"])
def post_form():
    return render_template('post.html')
 
   
@app.route('/auth/login', methods=["POST"])
def api_login():
    data = request.get_json(force=True)
    
    response = login(data)
    
    if "token" in response.keys():
        return json_response(response), 200
        
    return json_response(response), 403


@app.route('/auth/register', methods=["POST"])
def api_register():
    data = request.get_json()
    result = createUser(data)
    
    if type(result) is str:
        
        return json_response(result), 201
    
    return json_response({"errors" : result}), 400
    

@app.route('/docs')
def docs():
    return render_template('docs.html')    


if __name__ == "__main__":
    app.run()