from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

# Load moods data
with open("data/moods.json", "r") as f:
    moods_data = json.load(f)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/get_playlist", methods=["POST"])
def get_playlist():
    mood = request.json.get("mood", "").lower()
    if mood in moods_data:
        playlist = moods_data[mood]
        embed_url = f"https://open.spotify.com/embed/playlist/{playlist['playlist_id']}"
        response = {"embed_url": embed_url, "description": playlist['description']}
    else:
        response = {"embed_url": None, "description": "Mood not recognized"}
    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)
