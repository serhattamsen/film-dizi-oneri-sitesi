import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AuthForm.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin) {
      localStorage.setItem(username, JSON.stringify({ name, password }));
      alert("Kayıt başarılı! Giriş yapabilirsiniz.");
      setIsLogin(true);
    } else {
      const storedUser = localStorage.getItem(username);
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        if (userData.password === password) {
          alert("Giriş başarılı!");
          navigate("/home");
        } else {
          alert("Şifre yanlış!");
        }
      } else {
        alert("Kullanıcı bulunamadı!");
      }
    }
    setName("");
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
          {!isLogin && (
            <input
              type="text"
              placeholder="Ad"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
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
          <button type="submit">
            {isLogin ? "Giriş Yap" : "Kayıt Ol"}
          </button>
        </form>
        <p>
          {isLogin ? "Hesabınız yok mu?" : "Zaten hesabınız var mı?"} {" "}
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
