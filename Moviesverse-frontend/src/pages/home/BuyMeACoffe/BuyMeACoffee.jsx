import React from "react";
import "./BuyMeACoffeeBanner.css";

export default function BuyMeACoffeeBanner({ onClose }) {
  return (
    <section className="bmc-main-wrapper">
      <div className="bmc-mini-wrapper">
        <div className="bmc-mini-content">
          <p className="bmc-mini-text">
            Love <span>Moviesverse</span>? Support this passion-driven project by <strong>Moviesverse Team</strong>.
            Your coffee helps us build more ✨
          </p>

          <a
            href="https://buymeacoffee.com/moviesverse"
            target="_blank"
            rel="noopener noreferrer"
            className="bmc-mini-cta"
          >
            ☕ Buy Me a Coffee
          </a>
        </div>

        {/* <button className="bmc-mini-close" onClick={onClose}>
        ✕
      </button> */}
      </div>
    </section>
  );
}
