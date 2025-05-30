import React, { useEffect, useState } from "react";

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/films`)
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 Gelen veri:", data);
        setMovies(data);
      })
      .catch((err) => console.error("Veri çekme hatası:", err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>🎬 Film Listesi</h1>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
        {movies.map((movie, index) => (
          <div
            key={index}
            style={{
              width: "240px",
              padding: "1rem",
              backgroundColor: "#fff",
              borderRadius: "8px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              textAlign: "center",
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
