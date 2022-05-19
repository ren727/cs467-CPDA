from google.cloud import datastore
from flask import jsonify
from . import timezone

from error import ErrorResponse

client = datastore.Client()   ## Instantiates a client


def fetch_users(request):
    query = client.query(kind="users")
    results = list(query.fetch())

    for e in results:
        e['id'] = str(e.key.id)
        e["self"] = request.url + '/' + str(e.key.id)

    output = {'output': results}
    return output


def store_new_user(request):
    content = request.get_json()    #request.get_json() converts the JSON object into Python data.
    if validate_user(content):
        time = timezone.get_pacific_time()

        entity = datastore.Entity(key=client.key('users'))  ### Prepares the new entity
        entity.update({
            "email": content['email'],
            "created_at": time,
            "vote_score": 0,
            "blocked_users": [],
            "posts":[],
            "tags":[],
        })
        client.put(entity)        ## Saves the entity

        entity['id'] = entity.key.id
        entity['self'] = request.url + '/' + str(entity.key.id)

        return jsonify(entity), 201


def fetch_user(request, id):
    entity_key = client.key("users", int(id))
    entity = client.get(key=entity_key)

    if not entity:
        raise ErrorResponse({"Error": "User does not exist"}, 404)
    
    entity['id'] = entity.key.id
    entity['self'] = request.url

    return jsonify(entity), 200


def edit_user(request, id):
    """Allows editing user info, such as allowing a user to block another user"""
    content = request.get_json()

    if "blocked_users" not in content:
        raise ErrorResponse({"Error": "Missing content"}, 400)

    entity_key = client.key("users", int(id))
    entity = client.get(key=entity_key)

    blocked_user_key = client.key("users", int(content['blocked_users']))
    blocked_user = client.get(key=blocked_user_key)
    
    if not entity or not blocked_user:
        raise ErrorResponse({"Error": "User does not exist"}, 404)

    blocked_user_list = entity['blocked_users']
    blocked_user_list.append(blocked_user.key.id)
    entity.update({"blocked_users": blocked_user_list})
    client.put(entity)

    entity['id'] = entity.key.id
    entity['self'] = request.url
    return jsonify(entity), 200


def delete_user(request, id):
    entity_key = client.key("users", int(id))
    entity = client.get(key=entity_key)

    if not entity:
        raise ErrorResponse({"Error": "User does not exist"}, 404)

    client.delete(entity_key)
    return '', 204


def validate_user(new_user):
    if 'email' not in new_user:    
        raise ErrorResponse({"Error": "Comment missing required fields"}, 400)

    if not isinstance(new_user['email'], str):
        raise ErrorResponse({"Error": "E-mail address is not valid"}, 400)

    return True
