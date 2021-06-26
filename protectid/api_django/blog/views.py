from django.shortcuts import render
from django.http import HttpRequest, JsonResponse
from .models import *
import os
from werkzeug.utils import secure_filename
from.auth import login
from .apps import BlogConfig

def docs(request) :
    return render(request, 'docs.html', None)

def api_posts(request):
    if request.method == "GET":
        posts = Post.objects.all()
        context = {
            'posts': posts
        }
        return render(request, 'posts_list.html', context)
    if request.method == "POST":
        print("here")
        data = request.readline()
        print(data)
        data = data.decode("utf-8")
        print(data)
        data = str(data)
        title = ""
        content = ""
        excerpt = ""
        poster = ""
        char = 0
        i = 0
        v = 0
        utf8 = {
            "+": " ",
            "%21": "!",
            "%22": "\"",
            "%23": "#",
            "%24": "$",
            "%25": "%",
            "%26": "&",
            "%E2%80%99": "'",
            "%28": "(",
            "%29": ")",
            "%2A": "*",
            "%2B": "+",
            "%2C": ",",
            "%2D": "-",
            "%2E": ".",
            "%2F": "/",
            "%3A": ":",
            "%3B": ";",
            "%3C": "<",
            "%3D": "=",
            "%3E": ">",
            "%3F": "?",
            "%40": "@",
            "%5B": "[",
            "%5C": "\\",
            "%5D": "]",
            "%5E": "^",
            "%5F": "_",
            "%60": "`",
            "%7B": "{",
            "%7C": "|",
            "%7D": "}",
            "%7E": "~",
            "%C2%A9": "©",
            "%C2%AE": "®",
            "%C3%80": "À",
            "%C3%82": "Â",
            "%C3%84": "Ä",
            "%C3%87": "Ç",
            "%C3%88": "È",
            "%C3%89": "É",
            "%C3%8A": "Ê",
            "%C3%8B": "Ë",
            "%C3%8E": "Î",
            "%C3%8F": "Ï",
            "%C3%A0": "à",
            "%C3%A2": "â",
            "%C3%A4": "ä",
            "%C3%A7": "ç",
            "%C3%A8": "è",
            "%C3%A9": "é",
            "%C3%AA": "ê",
            "%C3%AB": "ë",
            "%C3%AE": "î",
            "%C3%AF": "ï",
            "%C3%B9": "ù",
            "%0D%0A": "\n",
            "%C3%B4": "ô"
        }
        while char != len(data):
            if data[char] == "&" and data[char + 1] == "t" and data[char + 2] == "i" and data[char + 3] == "t" and data[char + 4] == "l" and data[char + 5] == "e" and data[char + 6] == "=":
                response = data[char + 7]
                print(response)
                i = char
                while data[i + 7] != "&":
                    i += 1
                    v += 1
                title = data[char + 7:char + 7 + v]
                print(title)
                for u,charResponse in utf8.items() :
                    if title.__contains__(u):
                        title = title.replace(u, charResponse)
                print("Nouveau titre : ", title)
                v = 0
            if data[char] == "&" and data[char + 1] == "p" and data[char + 2] == "o" and data[char + 3] == "s" and data[char + 4] == "t" and data[char + 5] == "e" and data[char + 6] == "r" and data[char + 7] == "=":
                response = data[char + 8]
                print(response)
                i = char
                while data[i + 8] != "&":
                    i += 1
                    v += 1
                poster = data[char + 8:char + 8 + v]
                print(poster)
                for u , charResponse in utf8.items() :
                    if poster.__contains__(u):
                        poster = poster.replace(u, charResponse)
                print("Nouveau poster : ", poster)
                v = 0
            if data[char] == "&" and data[char + 1] == "e" and data[char + 2] == "x" and data[char + 3] == "c" and data[char + 4] == "e" and data[char + 5] == "r" and data[char + 6] == "p" and data[char + 7] == "t" and data[char + 8] == "=":
                response = data[char + 9]
                print(response)
                i = char
                while data[i + 9] != "&":
                    i += 1
                    v += 1
                excerpt = data[char + 9:char + 9 + v]
                print(excerpt)
                for u, charResponse in utf8.items():
                    if excerpt.__contains__(u):
                        excerpt = excerpt.replace(u, charResponse)
                print("Nouveau sous-titre : ", excerpt)
                v = 0
            if data[char] == "&" and data[char + 1] == "c" and data[char + 2] == "o" and data[char + 3] == "n" and data[char + 4] == "t" and data[char + 5] == "e" and data[char + 6] == "n" and data[char + 7] == "t" and data[char + 8] == "=":
                response = data[char + 9]
                print(response)
                i = char
                while data[i + 9] != "&":
                    i += 1
                    v += 1
                content = data[char + 9:char + 9 + v]
                print(content)
                for u, charResponse in utf8.items():
                    if content.__contains__(u):
                        content = content.replace(u, charResponse)
                print("Nouveau contenu : ", content)
                v = 0
            char += 1
        print(title)
        print(content)
        print(poster)
        print(excerpt)
        if len(data) > 0:
            print("création du posts")
            post = Post(None, title, content, excerpt, poster)
            post.save()
            print("post créé")
        posts = Post.objects.all()
        context = {
            'posts': posts
        }
        print("redirection posts_list")
        return render(request, 'posts_list.html', context)



# select one  post (not used)
def api_post(id):
    if HttpRequest.method == 'GET': 
        post = Post.query.filter_by(id=id).first()
        if isinstance(post, Post) != True:
            return json_response('post not found'), 404
        return json_response(post_serialize( post))
    if HttpRequest.method == "PUT":
        data = HttpRequest.form
        poster = ""
        post = Post.query.filter_by(id=id).first()
        if isinstance(post, Post) != True:
            return json_response('post not found'), 404
        if len(data) > 0 : 
            if "poster" in HttpRequest.files :
                file = HttpRequest.files['poster']
                # if user does not select file, browser also
                # submit an empty part without filename
                if file.filename != '':
                    filename = secure_filename(file.filename) + '_' +  (datetime.datetime.now()).strftime("%Y%d%m%j%H%M%S%f")
                    file.save(os.path.join(BlogConfig.uploads_dir, filename)) 
                    createUpload(filename)
                    poster = ''.join('/static/uploads/' + filename)
            post.content=data.get('content')
            post.title=data.get('title')
            post.excerpt=data.get('excerpt')
            post.poster=poster
            post.status=data.get('status')
            post.slug=data.get('slug')
            post.updated_at = datetime.datetime.now()
            post.save()
            return json_response("post updated"), 201
        return json_response('No data received'), 400  
    if HttpRequest.method == 'DELETE': 
        post = Post.query.filter_by(id=id).first()
        if isinstance(post, Post) != True:
            return json_response('post not found'), 404
        response = deletePost(id=id)   
        return json_response(response), 200


