from flask import Flask, request, jsonify

import resources.users as users
import resources.posts as posts
import resources.comments as comments
from error import ErrorResponse

app = Flask(__name__)


@app.errorhandler(ErrorResponse)
def handle_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response


@app.route('/')
def index():
    return 'Hello World'


@app.route('/users', methods=['GET', 'POST'])
def resource_users():
    if request.method == 'GET':
        return users.get_users(request)

    elif request.method == 'POST':
        return users.post_user(request)

    else:
        raise ErrorResponse({"Error": "Method not recognized"}, 405)


@app.route('/users/<id>', methods=['GET', 'PATCH', 'DELETE'])
def resource_user(id):
    if request.method == 'GET':
        return users.get_user(request, id)

    elif request.method == 'PATCH':
        return users.patch_user(request, id)

    elif request.method == 'DELETE':
        return users.delete_user(request, id)

    else:
        raise ErrorResponse({"Error": "Method not recognized"}, 405)


@app.route('/posts', methods=['GET', 'POST'])
def resource_posts():
    if request.method == 'GET':
        return posts.fetch_posts(request)

    elif request.method == 'POST':
        return posts.store_posts(request)

    else:
        raise ErrorResponse({"Error": "Method not recognized"}, 405)


@app.route('/posts/<id>', methods=['GET', 'DELETE'])
def resource_post(id):
    if request.method == 'GET':
        return posts.get_post(request, id)

    elif request.method == 'DELETE':
        return posts.delete_post(request, id)

    else:
        raise ErrorResponse({"Error": "Method not recognized"}, 405)


@app.route('/comments', methods=['GET', 'POST'])
def resource_comments():
    if request.method == 'GET':
        return comments.get_comments(request)

    elif request.method == 'POST':
        return comments.post_comments(request)

    else:
        raise ErrorResponse({"Error": "Method not recognized"}, 405)


@app.route('/comments/<id>', methods=['GET', 'PUT', 'DELETE'])
def resource_comment(id):
    if request.method == 'GET':
        return comments.get_comment(request, id)

    elif request.method == 'PUT':
        return comments.put_comment(request, id)

    elif request.method == 'DELETE':
        return comments.delete_comment(request, id)

    else:
        raise ErrorResponse({"Error": "Method not recognized"}, 405)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
