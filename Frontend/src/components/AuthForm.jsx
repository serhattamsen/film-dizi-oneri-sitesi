import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AuthForm.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bgGif, setBgGif] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const gifList = [
      "https://i.gifer.com/3Yws.gif",
      "https://i.gifer.com/YCZX.gif",
      "https://i.gifer.com/origin/34/34f7fc2208fc7ed7b53b4b12d7858f3a.gif",
      "https://media.giphy.com/media/xT0GqeSlGSRQut4jD6/giphy.gif",
      "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
      "https://media.giphy.com/media/JWuBH9rCO2uZuHBFpm/giphy.gif",
      "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif",
      "https://media.giphy.com/media/q7Up7ioB3Uqzq/giphy.gif"
    ];
    const randomGif = gifList[Math.floor(Math.random() * gifList.length)];
    document.documentElement.style.setProperty("--bg-gif", `url(${randomGif})`);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = isLogin ? "login" : "register";

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Bir hata oluştu.");
        return;
      }

      if (!isLogin) {
        alert("Kayıt başarılı! Giriş yapabilirsiniz.");
        setIsLogin(true);
        return;
      }

      localStorage.setItem("token", data.token);

      // Kullanıcı verisini çek
      const userRes = await fetch(`${process.env.REACT_APP_API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      const user = await userRes.json();

      if (!user.preference || Object.values(user.preference).every(val => val === 0)) {
        navigate("/choose-films");
      } else {
        navigate("/home");
      }

    } catch (err) {
  console.error("🛑 Yakalanan hata:", err);
  alert("Sunucu hatası: " + err.message);
}


    setUsername("");
    setPassword("");
  };

  return (
    <div
      className="auth-body"
      style={{
        background: `url(${bgGif}) no-repeat center center fixed`,
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="auth-container">
        <h2>{isLogin ? "Giriş Yap" : "Kayıt Ol"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Kullanıcı Adı"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isLogin ? "Giriş Yap" : "Kayıt Ol"}</button>
        </form>
        <p>
          {isLogin ? "Hesabınız yok mu?" : "Zaten hesabınız var mı?"}{" "}
          <span
            onClick={() => setIsLogin(!isLogin)}
            style={{ color: "#00ffff", cursor: "pointer" }}
          >
            {isLogin ? "Kayıt Ol" : "Giriş Yap"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
