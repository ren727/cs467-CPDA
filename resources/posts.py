from google.cloud import datastore

# establish the connection
client = datastore.Client()


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


def store_new_post(post_data):
    if len(post_data) == 0:
        msg = {
            'Error': 'The post can not be empty!'
        }
    elif len(post_data) > 255:
        msg = {
            'Error': 'The post is longer than 255 characters!'
        }
    entity = datastore.Entity(key=client.key('posts'))
    entity.update({
        "user": post_data['user'],
        "content": post_data['content']
    })
    client.put(entity)
    msg = {
        'Sucess': 'Post was added to the database.'
    }
    return msg


def fetch_data(entity, id):
    data_key = client.key(entity, int(id))
    data_found = client.get(key=data_key)
    return data_found


def fetch_single_post(post_id, self_url):
    post_found = fetch_data('posts', post_id)
    if post_found:
        post_found['id'] = str(id)
        post_found['self'] = self_url
        return post_found
    else:
        msg = {
            "Error": "No post with this id exists"
        }
        return msg


def delete_single_post(post_id):
    post_key = client.key("posts", int(post_id))
    client.delete(post_key)
    msg = {
        'Sucess': 'Post was deleted from the database.'
    }
    return msg


def get_comments_for_post(post_id):
    post_found = fetch_data('posts', post_id)
    if not post_found:
        msg = {
            "Error": "No post with this id exists."
        }
        return msg

    comments_for_post = []
    if post_found['commments']:
        for comment_id in post_found['comments']:
            comment_found = fetch_data("comments", comment_id)
            comments_for_post.append(comment_found)
        return comments_for_post
    else:
        return []


def validate_post_and_comment(post_id, comment_id):
    post_found = fetch_data('posts', post_id)
    comment_found = fetch_data('comments', comment_id)
    if not post_found and not comment_found:
        msg = {
            "Error": "Both post and comment are not found."
        }
    elif not post_found:
        msg = {
            "Error": "No post with this id exists."
        }
    elif not comment_found:
        msg = {
            "Error": "No post with this id exists."
        }
    else:
        msg = {
            "Found": "Both post and comment exist."
        }

    return msg


def add_comment_to_post(post_id, comment_id):
    post_found = fetch_data('posts', post_id)
    comment_found = fetch_data('comments', comment_id)
    if comment_found['post']:
        if comment_found['post'] == post_id:
            msg = {
                "Error": "This comment is already attached to this post."
            }
        else:
            msg = {
                "Error": "This comment had been attached to another post."
            }
    else:
        comment_found['post'] = post_id
        client.put(comment_found)

    if post_found['comments']:
        post_found['comments'].append(comment_id)
    else:
        post_found['comments'] = [comment_id]
    client.put(post_found)
    msg = {
        'Sucess': 'Comment was attached to the post.'
    }
    return msg


def remove_comment_from_post(post_id, comment_id):
    post_found = fetch_data('posts', post_id)
    comment_found = fetch_data('comments', comment_id)
    if post_found['comments']:
        if comment_id in post_found['comments']:
            post_found['comments'].remove(comment_id)
            comment_found['post'] = None
            client.put(post_found)
            client.put(comment_found)
            msg = {
                'Sucess': 'Comment was attached to the post.'
            }
        else:
            msg = {
                'Error': "This comment is not for this post."
            }
    return msg
