from google.cloud import datastore
from datetime import datetime
from pytz import timezone

# establish the connection
client = datastore.Client()
'''
entity - posts({
        "user_id": post_data['user_id'],
        "title": post_data['title'],
        "content": post_data['content'],
        "categories": post_data['categories'],
        "created_at": time,
        "comments": [],
        "modified_at": None,
    })
'''


def post_exists(post_id):
    post_key = client.key("posts", int(post_id))
    post_found = client.get(key=post_key)

    if not post_found:
        msg = {
            "Error": "No post with this id exists."
        }
        return False, msg
    else:
        return True, ''


def validate_post(post_data):
    # check the required attributes
    required_attri = ['user_id', 'title', 'content', 'categories']
    if any(attr not in post_data for attr in required_attri):
        msg = {
            'Error': "Should include all the required attributes."
        }
    # check the length of the content
    # should be in range [1, 255]
    if len(post_data['content']) == 0:
        msg = {
            'Error': 'The post can not be empty!'
        }
    elif len(post_data['content']) > 255:
        msg = {
            'Error': 'The post is longer than 255 characters!'
        }
    return False, msg if msg else True, None


def fetch_posts(base_url, q_limit, q_offset):
    query = client.query(kind="posts")
    # q_limit = int(request.args.get('limit', '3'))
    # q_offset = int(request.args.get('offset', '0'))
    l_iterator = query.fetch(limit=q_limit, offset=q_offset)
    pages = l_iterator.pages
    results = list(next(pages))
    if l_iterator.next_page_token:
        next_offset = q_offset + q_limit
        next_url = base_url + "?limit=" + str(q_limit) + "&offset=" + \
            str(next_offset)
    else:
        next_url = None
    for e in results:
        e["id"] = e.key.id
        e['self'] = base_url + str(e.key.id)
    output = {"posts": results, 'quantity': len(results)}
    if next_url:
        output["next"] = next_url
    return output


def store_new_post(base_url, post_data):
    new_post = datastore.entity.Entity(key=client.key('posts'))
    # time is set by the system
    pst_timezone = timezone('US/Pacific')
    time = datetime.now(pst_timezone)
    new_post.update({
        "user_id": post_data['user_id'],
        "title": post_data['title'],
        "content": post_data['content'],
        "categories": post_data['categories'],
        "created_at": time,
        "comments": [],
        "modified_at": None,
    })
    client.put(new_post)
    result = {
        "id": str(new_post.key.id),
        "user_id": post_data['user_id'],
        "title": post_data['title'],
        "content": post_data['content'],
        "categories": post_data['categories'],
        "created_at": time,
        "comments": [],
        "modified_at": None,
        "self": base_url + '/' + str(new_post.key.id),

    }
    return result


def fetch_single_post(post_id):
    post_key = client.key('posts', int(post_id))
    post_found = client.get(key=post_key)
    post_found['id'] = str(id)
    return post_found


def delete_single_post(post_id):
    post_key = client.key("posts", int(post_id))
    client.delete(post_key)
    msg = {
        'Sucess': 'Post was deleted from the database.'
    }
    return msg


def edit_post(post_id, edit_data):
    post_found = fetch_single_post(post_id)
    for key, val in edit_data:
        post_found[key] = val
    client.put(post_found)
    return post_found

# def get_comments_for_post(post_id):
#     post_found = fetch_single_post(post_id)
#     comments_for_post = []
#     if len(post_found['commments']) != 0:
#         for comment_id in post_found['comments']:
#             comment_found = fetch_comment(comment_id)
#             comments_for_post.append(comment_found)
#         return comments_for_post
#     else:
#         return []


# def add_comment_to_post(post_id, comment_id):
#     post_found = fetch_single_post(post_id)
#     comment_found = fetch_comment(comment_id)
#     if comment_found['post_id']:
#         if comment_found['post_id'] == post_id:
#             msg = {
#                 "Error": "This comment is already attached to this post."
#             }
#         else:
#             msg = {
#                 "Error": "This comment had been attached to another post."
#             }
#     else:
#         # update comment
#         comment_found['post'] = post_id
#         client.put(comment_found)
#         # update post
#         post_found['comments'].append(comment_id)
#         client.put(post_found)
#     msg = {
#         'Sucess': 'Comment was attached to the post.'
#     }
#     return msg


# def remove_comment_from_post(post_id, comment_id):
#     post_found = fetch_single_post(post_id)
#     comment_found = fetch_comment(comment_id)
#     if comment_id in post_found['comments']:
#         # update post
#         post_found['comments'].remove(comment_id)
#         client.put(post_found)
#         # update comment
#         comment_found['post_id'] = None
#         client.put(comment_found)
#         msg = {
#             'Sucess': 'Comment was attached to the post.'
#         }
#     else:
#         msg = {
#             'Error': "This comment is not for this post."
#         }
#     return msg
