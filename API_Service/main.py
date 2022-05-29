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
        return users.fetch_user(request, id)

    elif request.method == 'PATCH':
        return users.edit_user(request, id)

    elif request.method == 'DELETE':
        return users.delete_user(request, id)

    else:
        raise ErrorResponse({"Error": "Method not recognized"}, 405)


@app.route('/users', methods=['POST'])
def resource_user_with_email():
    return users.fetch_user_with_email(request)

@app.route('/posts', methods=['GET', 'POST'])
def resource_posts():
    base_url = request.base_url
    if request.method == 'GET':
        q_limit = int(request.args.get('limit', '10'))    
        q_offset = int(request.args.get('offset', '10'))
        return posts.fetch_posts(base_url, q_limit, q_offset), 200

    elif request.method == 'POST':
        post_data = request.get_json()
        valid, msg = posts.validate_post(post_data)
        if not valid:
            return msg, 400
        return posts.store_new_post(base_url, post_data), 201

    else:
        raise ErrorResponse({"Error": "Method not recognized"}, 405)


@app.route('/posts/<id>', methods=['GET', 'DELETE'])
def resource_post(id):
    self_url = request.base_url
    exist, msg = posts.post_exists(id)
    if not exist:
        return msg, 404
    if request.method == 'GET':
        post_found = posts.fetch_single_post(id)
        post_found['self'] = self_url
        return post_found, 200
    elif request.method == 'DELETE':
        return posts.delete_single_post(id), 200
    elif request.method == "PATCH":
        edit_data = request.get_json()
        post_update = posts.edit_post(id, edit_data)
        post_update['self'] = self_url
        return post_update, 200
    else:
        raise ErrorResponse({"Error": "Method not recognized"}, 405)


@app.route('/comments', methods=['GET', 'DELETE'])
def all_comments():
    if request.method == 'GET':
        return comments.fetch_comments(request)
    
    elif request.method == 'DELETE':
        return comments.wipe_comments()
        
    else:
        raise ErrorResponse({"Error": "Method not recognized"}, 405)


@app.route('/posts/<post_id>/comments', methods=['GET', 'POST'])
def resource_comments(post_id):
    if request.method == 'GET':
        return comments.fetch_comments(request, post_id)

    elif request.method == 'POST':
        return comments.store_new_comment(request, post_id)

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