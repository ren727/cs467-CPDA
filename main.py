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
        return users.fetch_users(request)

    elif request.method == 'POST':
        return users.store_new_user(request)

    else:
        raise ErrorResponse({"Error": "Method not recognized"}, 405)


@app.route('/users/<id>', methods=['GET', 'PATCH', 'DELETE'])
def resource_user(id):
    if request.method == 'GET':
        return users.fetch_users(request, id)

    elif request.method == 'PATCH':
        return users.edit_user(request, id)

    elif request.method == 'DELETE':
        return users.delete_user(request, id)

    else:
        raise ErrorResponse({"Error": "Method not recognized"}, 405)


@app.route('/posts', methods=['GET', 'POST'])
def resource_posts():
    if request.method == 'GET':
        base_url = request.base_url
        q_limit = int(request.args.get('limit', '10'))
        q_offset = int(request.args.get('offset', '0'))
        return posts.fetch_posts(base_url, q_limit, q_offset)

    elif request.method == 'POST':
        post_data = request.get_json()
        return posts.store_new_post(post_data)

    else:
        raise ErrorResponse({"Error": "Method not recognized"}, 405)


@app.route('/posts/<id>', methods=['GET', 'DELETE'])
def resource_post(id):
    if request.method == 'GET':
        self_url = request.base_url
        return posts.fetch_single_post(id, self_url)

    elif request.method == 'DELETE':
        return posts.delete_single_post(id)

    else:
        raise ErrorResponse({"Error": "Method not recognized"}, 405)


@app.route('/comments', methods=['GET', 'POST'])
def resource_comments():
    if request.method == 'GET':
        return comments.fetch_comments(request)

    elif request.method == 'POST':
        return comments.store_new_comments(request)

    else:
        raise ErrorResponse({"Error": "Method not recognized"}, 405)


@app.route('/comments/<id>', methods=['GET', 'PATCH', 'DELETE'])
def resource_comment(id):
    if request.method == 'GET':
        return comments.fetch_comment(request, id)

    elif request.method == 'PATCH':
        return comments.edit_comment(request, id)

    elif request.method == 'DELETE':
        return comments.delete_comment(request, id)

    else:
        raise ErrorResponse({"Error": "Method not recognized"}, 405)


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
