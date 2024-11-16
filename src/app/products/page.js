"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "../common/Navbar";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Redirect only when status is determined to be unauthenticated
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchProducts();
    }
  }, [status]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setFilteredProducts(products.slice(startIndex, endIndex));
  }, [products, itemsPerPage, currentPage]);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (status === "loading" || loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div style={{ display: "flex", padding: "20px", gap: "20px" }}>
        {/* Left Side: Filter Section */}
        <div
          style={{
            width: "20%",
            border: "1px solid #ddd",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          <h3>Filter</h3>
          <div>
            <p>Items per page:</p>
            <label>
              <input
                type="radio"
                name="itemsPerPage"
                value="5"
                checked={itemsPerPage === 5}
                onChange={handleItemsPerPageChange}
              />
              5
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="itemsPerPage"
                value="10"
                checked={itemsPerPage === 10}
                onChange={handleItemsPerPageChange}
              />
              10
            </label>
            <br />
            <label>
              <input
                type="radio"
                name="itemsPerPage"
                value="15"
                checked={itemsPerPage === 15}
                onChange={handleItemsPerPageChange}
              />
              15
            </label>
          </div>
        </div>

        {/* Right Side: Product List */}
        <div style={{ width: "80%" }}>
          <h1 style={{ textAlign: "center" }}>Our Products</h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  background: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "16px",
                  textAlign: "center",
                }}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  style={{
                    maxWidth: "100%",
                    height: "150px",
                    objectFit: "contain",
                  }}
                />
                <h2 style={{ fontSize: "1rem", margin: "10px 0" }}>
                  {product.title}
                </h2>
                <p style={{ color: "#007bff", fontWeight: "bold" }}>
                  ${product.price}
                </p>
              </div>
            ))}
          </div>

          {/* Pagination Buttons */}
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            {Array.from(
              { length: Math.ceil(products.length / itemsPerPage) },
              (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  style={{
                    padding: "10px 15px",
                    margin: "0 5px",
                    border: "none",
                    borderRadius: "5px",
                    backgroundColor:
                      currentPage === index + 1 ? "#007bff" : "#ddd",
                    color: currentPage === index + 1 ? "#fff" : "#000",
                    cursor: "pointer",
                  }}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
