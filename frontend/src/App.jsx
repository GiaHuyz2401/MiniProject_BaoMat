
import { useState } from "react";
import Login from "./Login";
import Products from "./Products";
import "./App.css";

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(
        !!localStorage.getItem("token")
    );

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    return (
        <div className="app">

            {isLoggedIn ? (

                <>
                    <div className="header">

                        <h2>QUẢN LÝ SẢN PHẨM</h2>

                        <button onClick={handleLogout}>
                            Đăng xuất
                        </button>

                    </div>

                    <Products />
                </>

            ) : (

                <Login
                    onLogin={() => setIsLoggedIn(true)}
                />

            )}

        </div>
    );
}

export default App;
