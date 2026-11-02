
import { useEffect, useState } from "react";
import axios from "axios";

function Products() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const fetchProducts = async () => {

            setLoading(true);
            setError("");

            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    throw new Error("Ban chua dang nhap!");
                }

                const response = await axios.get(
                    "http://localhost:3000/api/products",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setData(response.data.products);

            } catch (err) {

                setError(
                    err.response?.data?.message ||
                    err.message
                );

            } finally {
                setLoading(false);
            }
        };

        fetchProducts();

    }, []);

    if (loading) {
        return <h3>Đang tải dữ liệu...</h3>;
    }

    if (error) {
        return <h3 className="error">Lỗi: {error}</h3>;
    }

    return (
        <div className="products-container">

            <h2>DANH SÁCH SẢN PHẨM</h2>

            <ul>
                {data.map((item) => (
                    <li key={item.id}>
                        <strong>{item.ten}</strong>
                        {" - "}
                        Giá: {item.gia.toLocaleString("vi-VN")} VNĐ
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default Products;
