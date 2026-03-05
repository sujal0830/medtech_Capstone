import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import logo from "../assets/MedTech.png";
import "./AuthPage.css";

export default function AuthPage() {

    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="auth-container">

            {/* LEFT SIDE */}
            <div className="auth-left">

                <img src={logo} className="auth-logo" />

                <h1>MedTech Healthcare Platform</h1>

                <p>
                    Manage appointments, patient records and doctor
                    consultations securely.
                </p>

                <ul className="feature-list">
                    <li>⚡ Appointment Scheduling</li>
                    <li>🧾 Patient Records</li>
                    <li>👨‍⚕️ Doctor Consultations</li>
                    <li>🔒 Secure Medical Data</li>
                </ul>

                <img
                    src="/src/assets/medical.svg"
                    className="auth-illustration"
                />

            </div>

            {/* RIGHT SIDE */}
            <div className="auth-right">

                {isLogin ? (
                    <Login switchToRegister={() => setIsLogin(false)} />
                ) : (
                    <Register switchToLogin={() => setIsLogin(true)} />
                )}

            </div>

        </div>
    );
}