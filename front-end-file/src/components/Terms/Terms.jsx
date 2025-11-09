import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Terms.css";  // Updated to use Terms.css instead of TermsPage.css
import backgroundImg from "../../assets/bg-sverige43.jpeg"; // ✅ Import the correct background image

const TermsPage = () => {
  const [language, setLanguage] = useState("en");

  const content = {
    en: {
      title: "Terms",
      button: "Close and Go Back",
      text: `
BY clicking Invoice Now, you choose to register according to the information you entered 
on this registration page and the terms here, and you accept that the registration is 
completely voluntary. You can use the program for FREE for 14 days.

123 Fakturera is easy and self-explanatory; however, if you need support, we are available 
weekdays between 10-12 and 13-16. Support costs SEK 195/month (billed annually). You may 
cancel anytime within the 14-day trial. After 14 days, pricing applies as stated.

Price: SEK 99/month (US$ 9) or SEK 198/month after the annual Start plan for one year. 
All prices exclude VAT. Inventory Control, Multiuser Version, and English printout are not 
included but can be added separately.

Annual Fee: If you wish to continue using the program, renewals are automatic unless canceled 
before the next billing cycle. Month-by-month payment is possible at a higher rate.

Right to Cancel: You may cancel within 14 days of registration. Failure to pay or late 
payment does not constitute cancellation.

Support: Free via email or customer service. Phone support costs SEK 195/month including VAT.

Data Protection: Customer information is never sold or shared with third parties. We may 
store necessary data to comply with bookkeeping and system maintenance laws.

Contact: S-soft Savings AB, Box 2024, Täby, Sweden.
      `,
    },
    sv: {
      title: "Villkor",
      button: "Stäng och Gå Tillbaka",
      text: `
Genom att klicka på Fakturera Nu väljer du att registrera dig enligt informationen du angett 
på denna registreringssida och dessa villkor, och du accepterar att registreringen är helt frivillig.
Du kan använda programmet GRATIS i 14 dagar.

123 Fakturera är enkelt och självförklarande, men om du behöver support finns vi tillgängliga 
vardagar mellan 10–12 och 13–16. Support kostar 195 SEK/månad (faktureras årligen). Du kan 
avsluta när som helst inom prövotiden på 14 dagar.

Pris: 99 SEK/månad eller 198 SEK/månad efter årsavgiften Start för ett års användning. 
Alla priser exklusive moms. Lagerkontroll, Multiuser-version och engelskt utskrift ingår ej 
men kan läggas till separat.

Årsavgift: Om du vill fortsätta använda programmet förnyas det automatiskt om du inte säger upp 
det före nästa faktureringsperiod. Månad-för-månad betalning är möjlig till högre kostnad.

Ångerrätt: Du kan ångra inom 14 dagar efter registrering. Utebliven eller sen betalning 
räknas inte som avbokning.

Support: Gratis via e-post eller kundtjänst. Telefonsupport kostar 195 SEK/månad inklusive moms.

Dataskydd: Kundinformation säljs eller delas aldrig med tredje part. Vi lagrar endast nödvändig 
data enligt bokföringslagar.

Kontakt: S-soft Savings AB, Box 2024, Täby, Sverige.
      `,
    },
  };

  const t = content[language];

  return (
    <div
      className="terms-page"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      {/* Navbar */}
      <nav className="top-nav">
        <div className="nav-left">
          <img
            src="https://storage.123fakturera.se/public/icons/diamond.png"
            alt="Logo"
            className="logo"
          />
        </div>
        <div className="nav-right">
          <Link to="/">Home</Link>
          <Link to="/">Order</Link>
          <Link to="/">Our Customers</Link>
          <Link to="/pricelist">Pricelist</Link>
          <Link to="/">About Us</Link>
          <Link to="/">Contact Us</Link>

          <select
            className="language-select"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English 🇬🇧</option>
            <option value="sv">Svenska 🇸🇪</option>
          </select>
        </div>
      </nav>

      {/* Terms Header */}
      <div className="terms-header">
        <h1>{t.title}</h1>
      </div>

      {/* Terms Box */}
      <div className="terms-container">
        <div className="terms-box">
          <p>{t.text}</p>
          <button className="back-button" onClick={() => window.history.back()}>
            {t.button}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;