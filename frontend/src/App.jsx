import { useState } from "react";
import "./App.css";

const initialState = {
  fullName: "",
  email: "",
  password: "",
};

function App() {
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    // I am hard coding the backend url here for simplicity, but in a real application, you would want to use an environment variable or configuration file to manage this. Na me write this line.
    try {
      const response = await fetch("https://dis-kv51.onrender.com/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus({ type: "error", message: result.message || "Registration failed." });
        return;
      }

      setStatus({ type: "success", message: "Registration completed successfully." });
      setFormData(initialState);
    } catch {
      setStatus({
        type: "error",
        message: "Could not reach the backend server. Please make sure it is running.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="page">
      <section className="card">
        <h1>Register</h1>
        <p className="subtitle">Fill in your details and submit.</p>

        <form onSubmit={handleSubmit} className="form">
          <label>
            Full Name
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Email
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>

          <label>
            Password
            <div className="password-wrap">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                minLength={6}
                required
              />
              <button
                type="button"
                className="eye-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Registration"}
          </button>
        </form>

        {status.message ? <p className={`message ${status.type}`}>{status.message}</p> : null}
      </section>
    </main>
  );
}

export default App;
