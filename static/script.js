const moodColors = {
    "happy": "#FFD700",
    "sad": "#87CEEB",
    "energetic": "#FF4500",
    "relaxed": "#98FB98",
    "romantic": "#FF69B4",
    "focus": "#1E90FF",
    "party": "#FF1493",
    "chill": "#40E0D0",
    "nostalgic": "#D2B48C",
    "angry": "#FF0000",
    "sleepy": "#9370DB",
    "adventurous": "#FFA500",
    "meditative": "#00FA9A",
    "sad but cozy": "#F5DEB3",
    "hype": "#FF6347",
    "dramatic": "#8B008B",
    "bollywood": "#FF8C00",
    "bored": "#FF69B4"
};

function playMood() {
    const mood = document.getElementById("mood-input").value.toLowerCase();
    if (!mood) return;

    fetch("/get_playlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mood })
    })
    .then(res => res.json())
    .then(data => {
        const iframe = document.getElementById("spotify-embed");
        const desc = document.getElementById("playlist-description");
        const container = document.querySelector(".container");
        const heading = document.querySelector("h2");
        const button = document.querySelector("button");

        if(data.embed_url) {
            iframe.src = data.embed_url;
            desc.textContent = "Mood Playlist: " + data.description;
        } else {
            desc.textContent = data.description;
            iframe.src = "";
        }

        // Mood accent color
        const color = moodColors[mood] || "#ff4081";
        heading.style.color = color;
        desc.style.color = color;
        button.style.backgroundColor = color;
        container.style.boxShadow = `0 0 25px ${color}80`;

        // Dynamic gradient background
        document.body.style.background = `linear-gradient(135deg, #121212 0%, ${color}30 80%)`;
    });
}
