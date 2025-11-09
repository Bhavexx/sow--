import React, { useState } from "react";
import "./Login.css";
import bgImage from "../../assets/bg-sverige43.jpeg";

const translations = {
  en: {
    home: "Home",
    order: "Order",
    customers: "Our Customers",
    about: "About Us",
    contact: "Contact Us",
    loginTitle: "Log in",
    emailLabel: "Enter your email address",
    emailPlaceholder: "Email address",
    passwordLabel: "Enter your password",
    passwordPlaceholder: "Password",
    loginButton: "Log in",
    register: "Register",
    forgot: "Forgotten password?",
    footer: "© Lättfakturå, CRO no. 638537, 2025. All rights reserved.",
    // Registration translations
    registerTitle: "Register",
    nameLabel: "Enter your name",
    namePlaceholder: "Full name",
    confirmPasswordLabel: "Confirm your password",
    confirmPasswordPlaceholder: "Confirm password",
    registerButton: "Register",
    alreadyHaveAccount: "Already have an account?",
    // Password recovery translations
    forgotPasswordTitle: "Forgot Password",
    forgotPasswordInstruction: "Enter your email to receive OTP",
    sendOTP: "Send OTP",
    enterOTP: "Enter OTP",
    otpPlaceholder: "Enter 6-digit code",
    verifyOTP: "Verify OTP",
    newPasswordLabel: "Enter new password",
    newPasswordPlaceholder: "New password",
    confirmNewPasswordLabel: "Confirm new password",
    confirmNewPasswordPlaceholder: "Confirm new password",
    resetPassword: "Reset Password",
    backToLogin: "Back to Login",
    // Success messages
    registrationSuccess: "Registration successful! Please log in with your credentials.",
    loginSuccess: "Login successful!",
    otpSent: "OTP sent to your email address!",
    otpVerified: "OTP verified successfully!",
    passwordResetSuccess: "Password reset successful! Please log in with your new password.",
    // Error messages
    passwordsMismatch: "Passwords do not match!",
    invalidOTP: "Please enter a valid 6-digit OTP!",
    registrationError: "Registration failed. Please try again.",
    loginError: "Login failed. Please check your credentials and try again.",
    forgotPasswordError: "Failed to send OTP. Please try again.",
    resetPasswordError: "Failed to reset password. Please try again.",
  },
  se: {
    home: "Hem",
    order: "Beställ",
    customers: "Våra kunder",
    about: "Om oss",
    contact: "Kontakta oss",
    loginTitle: "Logga in",
    emailLabel: "Ange din e-postadress",
    emailPlaceholder: "E-postadress",
    passwordLabel: "Ange ditt lösenord",
    passwordPlaceholder: "Lösenord",
    loginButton: "Logga in",
    register: "Registrera dig",
    forgot: "Glömt lösenord?",
    footer: "© Lättfakturå, org.nr 638537, 2025. Alla rättigheter förbehållna.",
    // Registration translations
    registerTitle: "Registrera",
    nameLabel: "Ange ditt namn",
    namePlaceholder: "Fullständigt namn",
    confirmPasswordLabel: "Bekräfta ditt lösenord",
    confirmPasswordPlaceholder: "Bekräfta lösenord",
    registerButton: "Registrera",
    alreadyHaveAccount: "Har du redan ett konto?",
    // Password recovery translations
    forgotPasswordTitle: "Glömt lösenord",
    forgotPasswordInstruction: "Ange din e-postadress för att få OTP",
    sendOTP: "Skicka OTP",
    enterOTP: "Ange OTP",
    otpPlaceholder: "Ange 6-siffrig kod",
    verifyOTP: "Verifiera OTP",
    newPasswordLabel: "Ange nytt lösenord",
    newPasswordPlaceholder: "Nytt lösenord",
    confirmNewPasswordLabel: "Bekräfta nytt lösenord",
    confirmNewPasswordPlaceholder: "Bekräfta nytt lösenord",
    resetPassword: "Återställ lösenord",
    backToLogin: "Tillbaka till inloggning",
    // Success messages
    registrationSuccess: "Registrering lyckades! Logga in med dina uppgifter.",
    loginSuccess: "Inloggning lyckades!",
    otpSent: "OTP skickat till din e-postadress!",
    otpVerified: "OTP verifierad framgångsrikt!",
    passwordResetSuccess: "Lösenordsåterställning lyckades! Logga in med ditt nya lösenord.",
    // Error messages
    passwordsMismatch: "Lösenorden matchar inte!",
    invalidOTP: "Ange en giltig 6-siffrig OTP!",
    registrationError: "Registrering misslyckades. Försök igen.",
    loginError: "Inloggning misslyckades. Kontrollera dina uppgifter och försök igen.",
    forgotPasswordError: "Det gick inte att skicka OTP. Försök igen.",
    resetPasswordError: "Det gick inte att återställa lösenordet. Försök igen.",
  },
};

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Registration states
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  // Password recovery states
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  
  // Loading states
  const [loading, setLoading] = useState(false);
  
  // View states
  const [currentView, setCurrentView] = useState("login"); // login, register, forgotPassword

  const t = translations[language];

  // Function to make API requests
  const apiRequest = async (url, method, data) => {
    try {
      const response = await fetch(`http://localhost:5000${url}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || "API request failed");
      }
      
      return result;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await apiRequest("/api/users/login", "POST", {
        email,
        password,
      });
      
      console.log("Login successful:", result);
      alert(t.loginSuccess);
      
      // Call the onLogin function passed from App.jsx
      if (onLogin) onLogin(result.user.email);
    } catch (error) {
      console.error("Login error:", error);
      alert(t.loginError);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // Simple validation
    if (password !== confirmPassword) {
      alert(t.passwordsMismatch);
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await apiRequest("/api/users/register", "POST", {
        name,
        email,
        password,
        confirmPassword,
      });
      
      console.log("Registration successful:", result);
      alert(t.registrationSuccess);
      
      // Switch back to login view
      setCurrentView("login");
      // Reset form fields
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Registration error:", error);
      alert(t.registrationError);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setCurrentView("forgotPassword");
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const result = await apiRequest("/api/users/forgot-password", "POST", {
        email,
      });
      
      console.log("OTP sent:", result);
      setOtpSent(true);
      alert(t.otpSent);
    } catch (error) {
      console.error("Forgot password error:", error);
      alert(t.forgotPasswordError);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    // In a real app, you would verify the OTP with your backend
    // For demo purposes, we'll assume any 6-digit code is valid
    if (otp.length === 6 && /^\d+$/.test(otp)) {
      setOtpVerified(true);
      alert(t.otpVerified);
    } else {
      alert(t.invalidOTP);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    // Simple validation
    if (newPassword !== confirmNewPassword) {
      alert(t.passwordsMismatch);
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await apiRequest("/api/users/reset-password", "POST", {
        email,
        otp,
        newPassword,
        confirmNewPassword,
      });
      
      console.log("Password reset successful:", result);
      alert(t.passwordResetSuccess);
      
      // Switch back to login view
      setCurrentView("login");
      // Reset form fields
      setOtp("");
      setNewPassword("");
      setConfirmNewPassword("");
      setOtpSent(false);
      setOtpVerified(false);
    } catch (error) {
      console.error("Reset password error:", error);
      alert(t.resetPasswordError);
    } finally {
      setLoading(false);
    }
  };

  const switchToRegister = (e) => {
    e.preventDefault();
    setCurrentView("register");
  };

  const switchToLogin = (e) => {
    e.preventDefault();
    setCurrentView("login");
    // Reset all form fields when switching views
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setOtp("");
    setNewPassword("");
    setConfirmNewPassword("");
    setOtpSent(false);
    setOtpVerified(false);
  };

  // Render login form
  const renderLoginForm = () => (
    <div className="login-box">
      <h1 className="title">{t.loginTitle}</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>{t.emailLabel}</label>
          <input
            type="email"
            placeholder={t.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>{t.passwordLabel}</label>
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t.passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              👁️
            </button>
          </div>
        </div>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Loading..." : t.loginButton}
        </button>

        <div className="bottom-links">
          <a href="#" onClick={switchToRegister}>
            {t.register}
          </a>
          <a href="#" onClick={handleForgotPassword}>
            {t.forgot}
          </a>
        </div>
      </form>
    </div>
  );

  // Render registration form
  const renderRegisterForm = () => (
    <div className="login-box">
      <h1 className="title">{t.registerTitle}</h1>
      <form onSubmit={handleRegister}>
        <div className="input-group">
          <label>{t.nameLabel}</label>
          <input
            type="text"
            placeholder={t.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        
        <div className="input-group">
          <label>{t.emailLabel}</label>
          <input
            type="email"
            placeholder={t.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>{t.passwordLabel}</label>
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t.passwordPlaceholder}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              👁️
            </button>
          </div>
        </div>
        
        <div className="input-group">
          <label>{t.confirmPasswordLabel}</label>
          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder={t.confirmPasswordPlaceholder}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="eye-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              👁️
            </button>
          </div>
        </div>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Loading..." : t.registerButton}
        </button>

        <div className="bottom-links">
          <a href="#" onClick={switchToLogin}>
            {t.alreadyHaveAccount}
          </a>
        </div>
      </form>
    </div>
  );

  // Render forgot password form
  const renderForgotPasswordForm = () => (
    <div className="login-box">
      <h1 className="title">{t.forgotPasswordTitle}</h1>
      {!otpSent ? (
        // Step 1: Enter email to receive OTP
        <form onSubmit={handleSendOTP}>
          <div className="input-group">
            <label>{t.emailLabel}</label>
            <input
              type="email"
              placeholder={t.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <p className="instruction-text">{t.forgotPasswordInstruction}</p>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Loading..." : t.sendOTP}
          </button>
          
          <div className="bottom-links">
            <a href="#" onClick={switchToLogin}>
              {t.backToLogin}
            </a>
          </div>
        </form>
      ) : !otpVerified ? (
        // Step 2: Enter and verify OTP
        <form onSubmit={handleVerifyOTP}>
          <div className="input-group">
            <label>{t.enterOTP}</label>
            <input
              type="text"
              placeholder={t.otpPlaceholder}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength="6"
              required
            />
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Loading..." : t.verifyOTP}
          </button>
          
          <div className="bottom-links">
            <a href="#" onClick={switchToLogin}>
              {t.backToLogin}
            </a>
          </div>
        </form>
      ) : (
        // Step 3: Enter new password
        <form onSubmit={handleResetPassword}>
          <div className="input-group">
            <label>{t.newPasswordLabel}</label>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t.newPasswordPlaceholder}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                👁️
              </button>
            </div>
          </div>
          
          <div className="input-group">
            <label>{t.confirmNewPasswordLabel}</label>
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder={t.confirmNewPasswordPlaceholder}
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                👁️
              </button>
            </div>
          </div>
          
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Loading..." : t.resetPassword}
          </button>
          
          <div className="bottom-links">
            <a href="#" onClick={switchToLogin}>
              {t.backToLogin}
            </a>
          </div>
        </form>
      )}
    </div>
  );

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="nav-left">
          <img
            src="https://storage.123fakturera.se/public/icons/diamond.png"
            alt="Logo"
            className="logo"
          />
          <span className="company-name">123 Fakturera</span>
        </div>

        <div className="nav-right">
          <div className="desktop-menu">
            <a href="#">{t.home}</a>
            <a href="#">{t.order}</a>
            <a href="#">{t.customers}</a>
            <a href="#">{t.about}</a>
            <a href="#">{t.contact}</a>
          </div>

          {/* 🌐 Language Switch Button */}
          <div
            className="language-btn"
            onClick={() => setLanguage(language === "en" ? "se" : "en")}
          >
            <span>{language === "en" ? "English" : "Svenska"}</span>
            <img
              src={
                language === "en"
                  ? "https://storage.123fakturere.no/public/flags/GB.png"
                  : "https://storage.123fakturere.no/public/flags/SE.png"
              }
              alt="Flag"
              className="flag"
            />
          </div>

          <div
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}{
        menuOpen && (
          <div className="mobile-menu">
            <a href="#">{t.home}</a>
            <a href="#">{t.order}</a>
            <a href="#">{t.customers}</a>
            <a href="#">{t.about}</a>
            <a href="#">{t.contact}</a>
          </div>
        )}

      {/* Login Form */}{
        <div className="login-container">
          {currentView === "login" && renderLoginForm()}
          {currentView === "register" && renderRegisterForm()}
          {currentView === "forgotPassword" && renderForgotPasswordForm()}
        </div>
      }

      <footer className="footer">
        <div className="footer-links">
          <a href="#">{t.home}</a>
          <span>•</span>
          <a href="#">{t.order}</a>
          <span>•</span>
          <a href="#">{t.contact}</a>
        </div>
        <p>{t.footer}</p>
      </footer>
    </div>
  );
};

export default Login;