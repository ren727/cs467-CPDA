from google.cloud import datastore

client = datastore.Client()


key = client.key("TaskTest1")
entity = datastore.Entity(key)
entity['description'] = "Buy bread and milk"
entity['username'] = "User1"
client.put(entity)

id = 5704574033503115
key = client.key("TaskTest1", id)
entity = client.get(key)
print(entity)
print(entity.get("username"))
print(entity["username"])