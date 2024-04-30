import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "../firebase";

const Signup = () => {
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setUserCredentials((prev) => ({ ...prev, [fieldName]: fieldValue }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const { email, password, username } = userCredentials;
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      const uid = userCredential.user.uid;

      await firestore.collection("users").doc(uid).set({
        username: username,
        email: email,
      });

      console.log("User created and data added to Firestore");
      navigate("/");
    } catch (err) {
      setError(err?.message || "Something went wrong!");
      console.log("error", err);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <h1>Signup</h1>
      <div class="center-container">
        <form onSubmit={onSubmit} className="form">
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            value={userCredentials.email}
            onChange={handleOnChange}
          />
          <input
            required
            type="text"
            name="username"
            placeholder="Username"
            value={userCredentials.username}
            onChange={handleOnChange}
          />
          <input
            required
            type="password"
            name="password"
            placeholder="Password"
            value={userCredentials.password}
            onChange={handleOnChange}
          />

          <p className="navigate-text">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Log In</span>{" "}
          </p>

          {error && <p className="error-text">{error}</p>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Loading..." : " Signup"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
