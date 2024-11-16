"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = useSession(); // Fetch user session
  const router = useRouter();
  console.log(session, "session");

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/login" });
    router.push("/login"); // Redirect to login page
  };

  return (
    <nav
      style={{
        backgroundColor: "#007bff",
        color: "white",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1 style={{ margin: 0 }}>Fakestore Products</h1>
      {session ? (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <p style={{ margin: 0 }}>Hello, {session.session.user?.name}</p>
          <button
            onClick={handleSignOut}
            style={{
              backgroundColor: "white",
              color: "#007bff",
              border: "none",
              borderRadius: "5px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <p style={{ margin: 0 }}>Not signed in</p>
      )}
    </nav>
  );
};

export default Navbar;
