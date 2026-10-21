import React, { useState } from "react";
import { FiGlobe } from "react-icons/fi";
import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";


const tabsData = [
  "Popular",
  "Arts & culture",
  "Beach",
  "Mountains",
  "Outdoors",
  "Things to do",
  "Travel tips & inspiration",
  "Airbnb-friendly apartments",
];

const destinationsData = [
  { name: "Tokyo", type: "Condo rentals" },
  { name: "Broken Bow", type: "Cabin rentals" },
  { name: "Charlotte", type: "Villa rentals" },
  { name: "San Antonio", type: "House rentals" },
  { name: "Savannah", type: "House rentals" },
  { name: "Manhattan", type: "Monthly Rentals" },
  { name: "Kansas City", type: "Condo rentals" },
  { name: "Honolulu", type: "House rentals" },
  { name: "Santo Domingo", type: "House rentals" },
  { name: "St. Petersburg", type: "Condo rentals" },
  { name: "Barcelona", type: "Monthly Rentals" },
  { name: "London", type: "Monthly Rentals" },
  { name: "Amsterdam", type: "Cottage rentals" },
  { name: "Outer Banks", type: "Monthly Rentals" },
  { name: "Florida Keys", type: "Villa rentals" },
  { name: "Portland", type: "Vacation rentals" },
  { name: "Minneapolis", type: "Apartment rentals" },
];

export default function Footer() {
  const [activeTab, setActiveTab] = useState("Popular");

  return (
    <footer className="airbnb-footer">
      <div className="footer-container">
        {/* ================= 1. SECTION: Inspiration Tabs ================= */}
        <section className="getaways-section">
          <h2>Inspiration for future getaways</h2>

          <div className="tabs-header">
            {tabsData.map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="destinations-grid">
            {destinationsData.map((item, index) => (
              <div key={index} className="destination-item">
                <span className="dest-name">{item.name}</span>
                <span className="dest-type">{item.type}</span>
              </div>
            ))}
            <div className="destination-item show-more">
              <span className="dest-name">Show more ∨</span>
            </div>
          </div>
        </section>

        {/* ================= 2. SECTION: Main Directory Links ================= */}
        <section className="directory-section">
          <div className="directory-col">
            <h3>Support</h3>
            <ul>
              <li><a href="#help">Help Center</a></li>
              <li><a href="#safety">Get help with a safety issue</a></li>
              <li><a href="#aircover">AirCover</a></li>
              <li><a href="#insurance">Travel insurance</a></li>
              <li><a href="#anti-discrim">Anti-discrimination</a></li>
              <li><a href="#disability">Disability support</a></li>
              <li><a href="#cancellation">Cancellation options</a></li>
              <li><a href="#concern">Report neighborhood concern</a></li>
            </ul>
          </div>

          <div className="directory-col">
            <h3>Hosting</h3>
            <ul>
              <li><a href="#airbnb-home">Airbnb your home</a></li>
              <li><a href="#airbnb-exp">Airbnb your experience</a></li>
              <li><a href="#airbnb-service">Airbnb your service</a></li>
              <li><a href="#aircover-hosts">AirCover for Hosts</a></li>
              <li><a href="#resources">Hosting resources</a></li>
              <li><a href="#forum">Community forum</a></li>
              <li><a href="#responsible">Hosting responsibly</a></li>
              <li><a href="#apartments">Airbnb-friendly apartments</a></li>
              <li><a href="#class">Join a free hosting class</a></li>
              <li><a href="#cohost">Find a co-host</a></li>
              <li><a href="#refer">Refer a host</a></li>
            </ul>
          </div>

          <div className="directory-col">
            <h3>Airbnb</h3>
            <ul>
              <li><a href="#release">2026 Summer Release</a></li>
              <li><a href="#newsroom">Newsroom</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#investors">Investors</a></li>
              <li><a href="#giftcards">Gift cards</a></li>
              <li><a href="#emergency">Airbnb.org emergency stays</a></li>
            </ul>
          </div>
        </section>

        {/* ================= 3. SECTION: Bottom Copyright Bar ================= */}
        <section className="bottom-bar">
          <div className="bottom-left">
            <span>© 2026 Airbnb, Inc.</span>
            <span className="dot">·</span>
            <a href="#privacy">Privacy</a>
            <span className="dot">·</span>
            <a href="#terms">Terms</a>
            <span className="dot">·</span>
            <a href="#privacy-choices" className="privacy-choices">
              Your Privacy Choices
              <span className="privacy-icon">✓✕</span>
            </a>
          </div>

          <div className="bottom-right">
            <button className="lang-currency-btn">
              <FiGlobe size={16} />
              <span>English (US)</span>
            </button>
            <button className="lang-currency-btn currency">
              <span>EGP</span>
            </button>

            <div className="social-icons">
              <a href="#facebook" aria-label="Facebook"><FaFacebook size={18} /></a>
              <a href="#x" aria-label="X (Twitter)"><FaXTwitter size={16} /></a>
              <a href="#instagram" aria-label="Instagram"><FaInstagram size={18} /></a>
            </div>
          </div>
        </section>
      </div>
    </footer>
  );
}