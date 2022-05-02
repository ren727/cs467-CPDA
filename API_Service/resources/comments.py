from google.cloud import datastore
from flask import jsonify
from . import time
from . import posts

from error import ErrorResponse

MIN_LENGTH = 1
MAX_LENGTH = 255

client = datastore.Client()


def comment_exist(comment_id):
    comment_key = client.key("posts", int(comment_id))
    comment_found = client.get(key=comment_key)

    if not comment_found:
        msg = {
            "Error": "No comment with this id exists."
        }
        return False, msg
    else:
        return True, ''


def fetch_post_comments(request, post_id):
    query = client.query(kind="comments")
    query.add_filter('post_id', '=', post_id)
    results = list(query.fetch())

    for e in results:
        e["id"] = e.key.id
        e["self"] = request.url_root + '/comments/' + str(e.key.id)

    return results, 200


def store_new_comment(request, post_id):
    content = request.get_json()
    if validate_comment(content):
        time = time.get_pacific_time()

        entity = datastore.Entity(key=client.key('comments'))
        entity.update({
            "user_id": content['user_id'],
            "post_id": post_id,
            "content": content['content'],
            "created_at": time,
            "vote_score": 0,
            "upvote": 0,
            "downvote": 0,
        })
        client.put(entity)

        entity['id'] = entity.key.id
        entity['self'] = request.url_root + '/comments/' + str(entity.key.id)

        return jsonify(entity), 201


def fetch_comment(request, id):
    entity_key = client.key("comments", int(id))
    entity = client.get(key=entity_key)

    if not entity:
        raise ErrorResponse({"Error": "Comment does not exist"}, 404)

    entity['id'] = entity.key.id
    entity['self'] = request.url_root + '/comments/' + str(entity.key.id)

    return entity


def edit_comment(request, id):
    entity_key = client.key("comments", int(id))
    entity = client.get(key=entity_key)

    if not entity:
        raise ErrorResponse({"Error": "Comment does not exist"}, 404)

    content = request.get_json()

    if not content['content'] or not isinstance(content['content'], str):
        raise ErrorResponse({"Error": "Incorrectly formatted comment"}, 400)

    time = time.get_pacific_time()

    entity.update({"content": content['content']})
    entity['content'] = content['content']
    entity.update({"modified_at": time})
    entity['modified_at'] = time

    client.put(entity)

    entity['id'] = entity.key.id
    entity['self'] = request.url
    return jsonify(entity), 200


def delete_comment(request, id):
    entity_key = client.key("comments", int(id))
    entity = client.get(key=entity_key)

    if not entity:
        raise ErrorResponse({"Error": "Comment does not exist"}, 404)

    entity.update({"content": "[deleted]"})
    client.put(entity)
    return '', 204


def validate_comment(new_comment):
    if "user_id" not in new_comment or "post_id" not in new_comment or "content" not in new_comment:
        raise ErrorResponse({"Error": "Comment missing required fields"}, 400)

    if not isinstance(new_comment['content'], str):
        raise ErrorResponse({"Error": "Incorrectly formatted comment"}, 400)

    return True
