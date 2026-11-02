
import { useState } from "react";
import axios from "axios";

function Login({ onLogin }) {

    const [email, setEmail] = useState("");
    const [matKhau, setMatKhau] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post(
                "http://localhost:3000/login",
                {
                    email: email,
                    matKhau: matKhau
                }
            );

            // Lưu Token vào LocalStorage
            localStorage.setItem(
                "token",
                response.data.token
            );

            onLogin();

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Khong the ket noi Server"
            );
        }
    };

    return (
        <div className="login-container">

            <form className="login-form" onSubmit={handleLogin}>

                <h2>ĐĂNG NHẬP HỆ THỐNG</h2>

                <input
                    type="email"
                    placeholder="Nhập email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Nhập mật khẩu"
                    value={matKhau}
                    onChange={(e) => setMatKhau(e.target.value)}
                    required
                />

                <button type="submit">
                    Đăng nhập
                </button>

                {error && (
                    <p className="error">{error}</p>
                )}

                <p className="hint">
                    Email: admin@gmail.com
                    <br />
                    Mật khẩu: 123456
                </p>

            </form>

        </div>
    );
}

export default Login;