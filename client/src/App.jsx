import './App.css'

const cookies = [
  {
    name: 'Brown Butter Chocolate Chip',
    description: 'Golden edges, a soft middle, and plenty of dark chocolate.',
    price: 4.5,
    image:
      'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=85',
    label: 'THE CLASSIC',
  },
  {
    name: 'Midnight Double Chocolate',
    description: 'A rich cocoa cookie with pools of melted chocolate.',
    price: 5,
    image:
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85',
    label: 'CHOCOLATE LOVERS',
  },
  {
    name: 'Strawberry Shortcake',
    description: 'Buttery cookie, bright strawberry, and a little vanilla.',
    price: 4.75,
    image:
      'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=900&q=85',
    label: 'SMALL BATCH',
  },
]

function App() {
  return (
    <main className="shop">
      <header className="topbar">
        <a className="wordmark" href="#home" aria-label="Khaleb's Cookie home">
          K<span>.</span>
        </a>
        <a className="brand-name" href="#home">Khaleb's Cookie</a>
        <a className="menu-link" href="#menu">The cookie menu <span>↓</span></a>
      </header>

      <section className="intro" id="home">
        <div className="intro-content">
          <p className="eyebrow">BAKED FRESH · MADE TO SHARE</p>
          <h1>A little joy,<br />fresh from the oven.</h1>
          <p className="intro-copy">
            Small-batch cookies with crisp edges, soft centers, and absolutely
            no reason to save one for later.
          </p>
          <a className="menu-button" href="#menu">Meet the menu <span>↓</span></a>
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

        <div className="cookie-grid">
          {cookies.map((cookie, index) => (
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
                <span className="cookie-price">${cookie.price.toFixed(2)}</span>
              </div>
              <p className="cookie-description">{cookie.description}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="footer">
        <span>Khaleb's Cookie</span>
        <span>Made fresh, one batch at a time.</span>
      </footer>
    </main>
  )
}

export default App
