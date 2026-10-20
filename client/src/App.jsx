import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const subtotal = cart.reduce((total, cookie) => total + cookie.price, 0);
  const [cookies, setCookies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  function removeOne(cookieName) {
    setCart((currentCart) => {
      const cookieIndex = currentCart.findIndex(
        (cookie) => cookie.name === cookieName,
      );

      if (cookieIndex === -1) return currentCart;

      return currentCart.filter((_, index) => index !== cookieIndex);
    });
  }

  useEffect(() => {
    async function loadCookies() {
      try {
        const response = await fetch("http://localhost:3000/api/cookies");

        if (!response.ok) {
          throw new Error("Could not load the cookie menu.");
        }

        const data = await response.json();

        setCookies(
          data.map((cookie) => ({
            ...cookie,
            price: Number(cookie.price),
          })),
        );
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadCookies();
  }, []);

  return (
    <main className="shop">
      <header className="topbar">
        <a className="wordmark" href="#home" aria-label="Khaleb's Cookie home">
          K<span>.</span>
        </a>
        <a className="brand-name" href="#home">
          Khaleb's Cookie
        </a>
        <div className="box-summary" aria-live="polite">
          <span>Your box</span>
          <strong>
            {cart.length} {cart.length === 1 ? "cookie" : "cookies"}
          </strong>
          <strong>${subtotal.toFixed(2)}</strong>
        </div>
        <a className="menu-link" href="#menu">
          The cookie menu <span>↓</span>
        </a>
      </header>

      <section className="intro" id="home">
        <div className="intro-content">
          <p className="eyebrow">BAKED FRESH · MADE TO SHARE</p>
          <h1>
            A little joy,
            <br />
            fresh from the oven.
          </h1>
          <p className="intro-copy">
            Small-batch cookies with crisp edges, soft centers, and absolutely
            no reason to save one for later.
          </p>
          <a className="menu-button" href="#menu">
            Meet the menu <span>↓</span>
          </a>
          <p className="intro-note">Baked with care in Khaleb's kitchen.</p>
        </div>
        <img
          className="intro-image"
          src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=1200&q=90"
          alt="A freshly baked chocolate chip cookie"
        />
      </section>

      <section className="menu-section" id="menu">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE GOOD STUFF</p>
            <h2>Today's cookie box</h2>
          </div>
          <p className="menu-note">Three little reasons to treat yourself.</p>
        </div>

        {isLoading && <p role="status">Loading the cookie menu...</p>}
        {error && <p role="alert">{error}</p>}

        <div className="cookie-grid">
          {cookies.map((cookie, index) => {
            const quantity = cart.filter(
              (item) => item.name === cookie.name,
            ).length;

            return (
              <article className="cookie-card" key={cookie.name}>
                <div className="cookie-image-wrap">
                  <img
                    className="cookie-image"
                    src={cookie.image}
                    alt={cookie.name}
                    loading="lazy"
                  />
                  <span className="cookie-number">0{index + 1}</span>
                </div>
                <p className="cookie-label">{cookie.label}</p>
                <div className="cookie-title-row">
                  <h3>{cookie.name}</h3>
                  <span className="cookie-price">
                    ${cookie.price.toFixed(2)}
                  </span>
                </div>
                <p className="cookie-description">{cookie.description}</p>
                <div className="quantity-control">
                  <button
                    className="quantity-button"
                    type="button"
                    aria-label={`Remove one ${cookie.name} from box`}
                    disabled={quantity === 0}
                    onClick={() => removeOne(cookie.name)}
                  >
                    -
                  </button>
                  <span className="quantity-count" aria-live="polite">
                    {quantity}
                  </span>
                  <button
                    className="quantity-button"
                    type="button"
                    aria-label={`Add one ${cookie.name} to box`}
                    onClick={() =>
                      setCart((currentCart) => [...currentCart, cookie])
                    }
                  >
                    +
                  </button>
                  <span className="quantity-caption">
                    {quantity === 0 ? "Add to box" : "in your box"}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <footer className="footer">
        <span>Khaleb's Cookie</span>
        <span>Made fresh, one batch at a time.</span>
      </footer>
    </main>
  );
}

export default App;
