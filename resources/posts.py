from google.cloud import datastore
from flask import request
import constants
import json


# establish the connection
client = datastore.Client()
posts = "posts"


def get_posts(request):
    query = client.query(kind=posts)
    q_limit = int(request.args.get('limit', '3'))
    q_offset = int(request.args.get('offset', '0'))
    l_iterator = query.fetch(limit=q_limit, offset=q_offset)
    pages = l_iterator.pages
    results = list(next(pages))
    if l_iterator.next_page_token:
        next_offset = q_offset + q_limit
        next_url = request.base_url + "?limit=" + str(q_limit) + "&offset=" + str(next_offset)
    else:
        next_url = None
    for e in results:
        e["id"] = e.key.id
        e['self'] = request.base_url + str(e.key.id)
    output = {"loads": results, 'quantity': len(results)}
    if next_url:
        output["next"] = next_url
    return output


def post_posts(request):
    post_data = request.get_json()
    if len(post_data) == 0:
        error_msg = {
            'Error': 'The post can not be empty!'
        }
        return error_msg
    elif len(post_data) > 255:
        error_msg = {
            'Error': 'The post is longer than 255 characters!'
        }
        return error_msg


def get_post(request, id):
    pass


def delete_post(request, id):
    pass
