from flask import Flask, send_from_directory
import os

# Get the absolute path to the frontend build directory
frontend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "../frontend/dist"))

app = Flask(__name__, static_folder=frontend_dir, static_url_path="/")

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    app.run(debug=True, port=5000)


# only to test

#----------------------------------------------------------------------------------------------------------------------------------------
"""
import networkx as nx

class SocialNetwork:
    def __init__(self):
        self.graph = nx.Graph()

    def add_user(self, user):
        "Add a user to the network."
        self.graph.add_node(user)

    def add_friendship(self, user1, user2):
        "Create a friendship between two users."
        self.graph.add_edge(user1, user2)

    def suggest_friends(self, user):
        "Suggest friends based on mutual connections."
        if user not in self.graph:
            return []
        
        # Get the user's direct friends
        friends = set(self.graph.neighbors(user))
        suggestions = {}

        # Check friends of friends (excluding the user and existing friends)
        for friend in friends:
            for mutual in self.graph.neighbors(friend):
                if mutual != user and mutual not in friends:
                    suggestions[mutual] = suggestions.get(mutual, 0) + 1  # Count mutual connections

        # Sort by most mutual connections
        return sorted(suggestions, key=suggestions.get, reverse=True)

# Example Usage
network = SocialNetwork()
network.add_user("Alice")
network.add_user("Bob")
network.add_user("Charlie")
network.add_user("David")
network.add_user("Eve")

network.add_friendship("Alice", "Bob")
network.add_friendship("Bob", "Charlie")
network.add_friendship("Charlie", "David")

# Alice should get Charlie as a suggestion (common friend: Bob)
print("Friend suggestions for Alice:", network.suggest_friends("Alice"))
"""