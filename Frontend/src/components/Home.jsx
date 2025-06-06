import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();
  const [userScore, setUserScore] = useState(0);




  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    fetch(`${process.env.REACT_APP_API_URL}/films`)
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 Gelen veri:", data);
        setMovies(data);
      })
      .catch((err) => console.error("Veri çekme hatası:", err));
  }, []);

  useEffect(() => {
    if (selectedMovie) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedMovie]);
   const handleRating = async (movieId, score) => {
  setUserScore(score);
  const token = localStorage.getItem("token");

  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/rate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ movieId, score })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("❌ Puan gönderme hatası:", data.error);
    } else {
      console.log("✅ Puan kaydedildi:", data);
    }
  } catch (err) {
    console.error("❌ Sunucu hatası:", err);
  }
};


  return (
    <div style={{ padding: "2rem", minHeight: "100vh", overflowY: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>🎬 Film Listesi</h1>

      <button
  onClick={() => navigate("/recommend")}
  style={{
    marginBottom: "2rem",
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  }}
>
  🎯 Öneri Sayfasına Git
</button>


      {selectedMovie && (
        <div style={{
          position: "fixed",
          top: "5%",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          zIndex: 1000,
          width: "80%",
          maxWidth: "900px",
          padding: "2rem",
          display: "flex",
          gap: "2rem",
        }}>
          <img
            src={selectedMovie.photo}
            alt={selectedMovie.name}
            style={{ width: "300px", height: "450px", objectFit: "cover", borderRadius: "8px" }}
          />
          <div style={{ flex: 1, textAlign: "left" }}>
            <h2 style={{ marginBottom: "1rem" }}>{selectedMovie.name}</h2>
            <p><strong>IMDb:</strong> {selectedMovie.imdb}</p>
            <p><strong>Romantik:</strong> {selectedMovie.romance}</p>
            <p><strong>Aksiyon:</strong> {selectedMovie.action}</p>
            <p><strong>Macera:</strong> {selectedMovie.adventure}</p>
            <p><strong>Korku:</strong> {selectedMovie.horror}</p>
            <p><strong>Gerilim:</strong> {selectedMovie.thriller}</p>
            <p><strong>Sci-Fi:</strong> {selectedMovie.sciFi}</p>
            <p><strong>Senin Puanın:</strong></p>
<div style={{ fontSize: "1.5rem" }}>
  {[...Array(10)].map((_, i) => (
    <span
      key={i}
      style={{
        cursor: "pointer",
        color: i < userScore ? "#ffc107" : "#ccc"
      }}
      onClick={() => handleRating(selectedMovie._id, i + 1)}
    >
      ★
    </span>
  ))}
</div>

<select
  value={userScore}
  onChange={(e) => handleRating(selectedMovie._id, parseInt(e.target.value))}
>
  <option value="">Seçiniz</option>
  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
    <option key={n} value={n}>{n}</option>
  ))}
</select>

            <button
              onClick={() => setSelectedMovie(null)}
              style={{
                marginTop: "1.5rem",
                padding: "0.5rem 1.5rem",
                backgroundColor: "#444",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Kapat
            </button>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
        {movies.map((movie, index) => (
          <div
            key={index}
            onClick={() => setSelectedMovie(movie)}
            style={{
              width: "240px",
              padding: "1rem",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              textAlign: "center",
              cursor: "pointer"
            }}
          >
            {movie.photo && (
              <img
                src={movie.photo}
                alt={movie.name}
                style={{
                  width: "100%",
                  height: "320px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  marginBottom: "0.75rem",
                }}
              />
            )}
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>{movie.name}</h3>
            <div style={{ fontSize: "0.9rem", color: "#333", textAlign: "left" }}>
              <p><strong>IMDb:</strong> {movie.imdb}</p>
              <p><strong>Romantik:</strong> {movie.romance}</p>
              <p><strong>Aksiyon:</strong> {movie.action}</p>
              <p><strong>Macera:</strong> {movie.adventure}</p>
              <p><strong>Korku:</strong> {movie.horror}</p>
              <p><strong>Gerilim:</strong> {movie.thriller}</p>
              <p><strong>Sci-Fi:</strong> {movie.sciFi}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
