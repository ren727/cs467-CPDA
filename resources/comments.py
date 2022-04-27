from google.cloud import datastore
from flask import jsonify
from datetime import datetime
from pytz import timezone

from error import ErrorResponse

MIN_LENGTH = 1
MAX_LENGTH = 255

client = datastore.Client()


def fetch_comments(request):
    content = request.get_json()
    post_id = content["post_id"]
    query = client.query(kind="comments")
    query.add_filter('post', '=', post_id)
    results = list(query.fetch())

    for e in results:
        e["id"] = e.key.id
        e["self"] = request.url + '/' + str(e.key.id)

    output = {"comments": results}
    return output

def store_new_comment(request):
    content = request.get_json()
    if validate_comment(content):
        timezone = timezone('US/Pacific') 
        time = datetime.now(timezone)

        entity = datastore.Entity(key=client.key('comments'))
        entity.update({
            "user_id": content['user_id'],
            "post_id": content['post_id'],
            "content": content['content'],
            "created_at": time,
            "vote_score": 0
        })
        client.put(entity)

        entity['id'] = entity.key.id
        entity['self'] = request.url + '/' + str(entity.key.id)

        return jsonify(entity), 201


def fetch_comment(request, id):
    entity_key = client.key("comments", int(id))
    entity = client.get(key=entity_key)

    if not entity:
        raise ErrorResponse({"Error": "Comment does not exist"}, 404)
    
    entity['id'] = entity.key.id
    entity['self'] = request.url

    return jsonify(entity), 200

def edit_comment(request, id):
    entity_key = client.key("comments", int(id))
    entity = client.get(key=entity_key)

    if not entity:
        raise ErrorResponse({"Error": "Comment does not exist"}, 404)
    
    content = request.get_json()

    if not content['content'] or not isinstance(content['content'], str):
        raise ErrorResponse({"Error": "Incorrectly formatted comment"}, 400)
    
    timezone = timezone('US/Pacific') 
    time = datetime.now(timezone)
    
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
    try:
        user_id = new_comment["user_id"]
        post_id = new_comment["post_id"]
        content = new_comment["content"]
    
    except: 
        raise ErrorResponse({"Error": "Comment missing required fields"}, 400)

    if not isinstance(content, str):
        raise ErrorResponse({"Error": "Incorrectly formatted comment"}, 400)

    return True
