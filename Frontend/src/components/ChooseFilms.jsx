import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChooseFilms = () => {
  const [films, setFilms] = useState([]);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/films`)
      .then((res) => res.json())
      .then((data) => setFilms(data))
      .catch((err) => console.error("Film çekme hatası:", err));
  }, []);

  const toggleSelect = (film) => {
    if (selected.find((f) => f._id === film._id)) {
      setSelected(selected.filter((f) => f._id !== film._id));
    } else {
      if (selected.length < 3) {
        setSelected([...selected, film]);
      } else {
        alert("Sadece 3 film seçebilirsiniz.");
      }
    }
  };

  const calculateAverages = () => {
    const keys = ["romance", "action", "adventure", "horror", "thriller", "sciFi", "imdb"];
    const avg = {};
    keys.forEach((key) => {
      const total = selected.reduce((sum, film) => sum + (film[key] || 0), 0);
      avg[key] = parseFloat((total / selected.length).toFixed(2));
    });
    return avg;
  };

  const handleSubmit = async () => {
  if (selected.length !== 3) {
    alert("Lütfen 3 film seçin.");
    return;
  }

  console.log("🎬 Gönderilecek favoriler:", selected);

  const preference = calculateAverages();
  const token = localStorage.getItem("token");

  try {
    const userRes = await fetch(`${process.env.REACT_APP_API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = await userRes.json();
    console.log("👤 Kullanıcı ID:", user._id);

    const favRes = await fetch(`${process.env.REACT_APP_API_URL}/users/${user._id}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ favorites: selected }),
    });

    const favResult = await favRes.json();
    console.log("✅ Favori gönderildi:", favResult);

    const prefRes = await fetch(`${process.env.REACT_APP_API_URL}/users/${user._id}/preferences`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ preference }),
    });

    const prefResult = await prefRes.json();
    console.log("✅ Tercihler gönderildi:", prefResult);

    navigate("/home");
  } catch (err) {
    console.error("🔥 Global HATA:", err);
    alert("Kayıt sırasında bir hata oluştu.");
  }
};

  

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>🎯 3 favori filmini seç</h2>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
        {films.map((film) => (
          <div
            key={film._id}
            onClick={() => toggleSelect(film)}
            style={{
              width: "200px",
              border: selected.find((f) => f._id === film._id) ? "3px solid #00ffff" : "1px solid #ccc",
              borderRadius: "8px",
              padding: "1rem",
              cursor: "pointer",
              backgroundColor: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
            }}
          >
            <img
              src={film.photo}
              alt={film.name}
              style={{ width: "100%", height: "260px", objectFit: "cover", borderRadius: "6px" }}
            />
            <h4 style={{ marginTop: "0.5rem" }}>{film.name}</h4>
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        style={{ marginTop: "2rem", padding: "0.75rem 2rem", fontSize: "1rem", cursor: "pointer" }}
      >
        Kaydet ve Devam Et
      </button>
    </div>
  );
};

export default ChooseFilms;
