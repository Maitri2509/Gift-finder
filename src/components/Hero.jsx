import { GiftIcon, FeatureIcon } from './icons'
import './Hero.css'

const FEATURES = [
  {
    title: 'Unique Ideas',
    text: 'Thoughtful and creative gift suggestions',
    icon: 'heart',
  },
  {
    title: 'For Every Relationship',
    text: 'Family, friends, partners and more',
    icon: 'people',
  },
  {
    title: 'For Every Budget',
    text: 'Amazing gifts at any price range',
    icon: 'tag',
  },
]

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-main">
        <div className="hero-copy">
          <p className="hero-eyebrow">Make every moment special</p>
          <h1 className="hero-title">
            Find the <span>Perfect Gift</span>
          </h1>
          <p className="hero-support">
            Thoughtful gift ideas for your loved ones.
            <br />
            Because every person deserves a smile.
          </p>
          <a href="#find" className="hero-cta">
            <GiftIcon size={18} />
            <span>Find My Perfect Gift</span>
            <span className="hero-cta-arrow" aria-hidden="true">
              →
            </span>
          </a>
        </div>

        <div className="hero-visual">
          <img
            src="/hero-gifts.jpg"
            alt="Stack of pastel pink, lavender, and cream gift boxes with satin ribbons"
            className="hero-image"
            onError={(e) => {
              e.currentTarget.onerror = null
              e.currentTarget.src =
                'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=1200&q=80'
            }}
          />
        </div>
      </div>

      <div className="hero-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 180" preserveAspectRatio="none">
          <path
            className="wave-back"
            d="M0,78 C150,28 250,150 400,88 C540,35 640,155 780,90 C920,30 1040,150 1180,80 C1280,35 1360,120 1440,70 L1440,180 L0,180 Z"
          />
          <path
            className="wave-front"
            d="M0,95 C140,45 260,165 420,105 C560,50 650,165 800,108 C950,50 1040,160 1200,95 C1300,55 1370,130 1440,90 L1440,180 L0,180 Z"
          />
        </svg>
      </div>

      <div className="hero-features">
        <div className="features-row">
          {FEATURES.map((feature) => (
            <article key={feature.title} className="feature">
              <span className="feature-icon">
                <FeatureIcon type={feature.icon} />
              </span>
              <div>
                <h2>{feature.title}</h2>
                <p>{feature.text}</p>
              </div>
            </article>
          ))}
        </div>

        <p className="hero-note" aria-hidden="true">
          Happiness Looks Good On You <span>♥</span>
          <span className="hero-note-arrow">↗</span>
        </p>
      </div>
    </section>
  )
}
