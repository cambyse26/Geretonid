from werkzeug.wrappers import Request, Response, ResponseStream
from flask import request as requests
from .auth import checkToken
import logging as log

class middleware():
    '''
    Simple WSGI middleware
    '''

    def __init__(self, app):
        self.app = app

    def __call__(self, environ, start_response):
        request = Request(environ)
        url = str(request.path)
        method = request.method
        
        
        if method != "GET" or (method == "GET" and url.startswith("/api/users") ): 
            
            if url.startswith("/api"): 
            
                # Check if request contains Authorization header
                if "Authorization" not in request.headers:
                    res = Response(f'Access denied', mimetype= 'application/json', status=403)
                    return res(environ, start_response)        
                
                # Check if the Authorization is valid 
                authorization = request.headers['Authorization']
                if checkToken(provided_token=authorization) == False:
                    res = Response(f'Authentification failed', mimetype= 'application/json', status=401)
                    return res(environ, start_response)        

        # Send the intended response 
        return self.app(environ, start_response)