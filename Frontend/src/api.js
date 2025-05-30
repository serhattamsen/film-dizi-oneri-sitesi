import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [films, setFilms] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/films`)
      .then((res) => setFilms(res.data))
      .catch((err) => console.error("Film çekme hatası:", err));
  }, []);

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1 style={{ marginBottom: 20 }}>🎬 Film Listesi</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
        {films.map((film) => (
          <div
            key={film._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 10,
              padding: 15,
              width: 250,
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              background: "#fff",
            }}
          >
            <img
              src={film.posterUrl}
              alt={film.title}
              style={{ width: "100%", height: "auto", borderRadius: 8 }}
            />
            <h3 style={{ marginTop: 10 }}>{film.title}</h3>
            <p style={{ margin: 0, fontSize: 14 }}><b>Yıl:</b> {film.year}</p>
            <p style={{ margin: 0, fontSize: 14 }}>
              <b>Tür:</b> {film.genre?.join(", ")}
            </p>
            <p style={{ fontSize: 13, marginTop: 8 }}>{film.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

