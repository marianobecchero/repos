db = db.getSiblingDB("mydatabase")
db.createUser({
    user: "mariano",
    pwd: "becchero",
    roles: [{role: "readWrite", db: "mydatabase"}]
})