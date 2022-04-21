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
        error_msg = {
            'Error': 'The post can not be empty!'
        }
        return error_msg
    elif len(post_data) > 255:
        error_msg = {
            'Error': 'The post is longer than 255 characters!'
        }
        return error_msg
    entity = datastore.Entity(key=client.key('posts'))
    entity.update({
        "user": post_data['user'],
        "content": post_data['content']
    })
    client.put(entity)


def fetch_single_post(id, self_url):
    post_key = client.key("posts", int(id))
    post_found = client.get(key=post_key)
    if post_found:
        post_found['id'] = str(id)
        post_found['self'] = self_url
        return post_found
    else:
        return "No such post was found!"


def delete_single_post(id):
    post_key = client.key("posts", int(id))
    client.delete(post_key)
    return "delete successfully!"
