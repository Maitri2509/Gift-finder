import { useState } from 'react'
import { GiftIcon } from './icons'
import { matchGifts } from '../data/gifts'
import './Sections.css'

const OCCASIONS = [
  {
    title: 'Birthday',
    text: 'Warm, personal picks that feel chosen — not last-minute.',
    tone: 'birthday',
  },
  {
    title: 'Anniversary',
    text: 'Quiet luxury and shared memories, without the guesswork.',
    tone: 'anniversary',
  },
  {
    title: 'Housewarming',
    text: 'Beautiful, useful pieces new homes actually want.',
    tone: 'housewarming',
  },
  {
    title: 'Thank You',
    text: 'Small gestures that still feel intentional and kind.',
    tone: 'thankyou',
  },
  {
    title: 'Graduation',
    text: 'Celebrate the milestone — and what comes next.',
    tone: 'graduation',
  },
  {
    title: 'Just Because',
    text: 'For ordinary Tuesdays that deserve a little sparkle.',
    tone: 'justbecause',
  },
]

const IDEAS = [
  {
    title: 'Cozy Comfort Set',
    meta: 'Partner · Under ₹2,000',
    text: 'Soft throw, candle, and a handwritten note moment.',
    image:
      'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Memory Keepsake',
    meta: 'Best friend · Under ₹3,000',
    text: 'A framed moment or custom piece they’ll keep forever.',
    image:
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Self-Care Box',
    meta: 'Family · Under ₹2,500',
    text: 'Bath ritual, tea, and calm — packaged like a hug.',
    image:
      'https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=800&q=80',
  },
]

const STEPS = [
  {
    n: '01',
    title: 'Tell us the occasion',
    text: 'Birthday, anniversary, thank you — start with the moment.',
  },
  {
    n: '02',
    title: 'Share a few details',
    text: 'Who it’s for, budget, and what they love.',
  },
  {
    n: '03',
    title: 'Get curated ideas',
    text: 'A short list of thoughtful gifts that actually fit.',
  },
]

const emptyForm = {
  name: '',
  email: '',
  occasion: '',
  relationship: '',
  gender: '',
  budget: '',
  notes: '',
}

export function Occasions() {
  return (
    <section className="section" id="occasions">
      <div className="section-inner">
        <div className="section-heading">
          <p className="kicker">Occasions</p>
          <h2>Every moment has its own gift energy</h2>
          <p className="lead">
            Start with why you’re giving — then find something that feels right
            for them.
          </p>
        </div>

        <div className="occasion-grid">
          {OCCASIONS.map((item) => (
            <article key={item.title} className={`occasion-card tone-${item.tone}`}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <a href="#find" className="text-link">
                Find gifts <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function GiftIdeas() {
  return (
    <section className="section section-soft" id="ideas">
      <div className="section-inner">
        <div className="section-heading">
          <p className="kicker">Gift Ideas</p>
          <h2>A few favorites to get inspired</h2>
          <p className="lead">
            Soft, thoughtful directions — not a random product dump.
          </p>
        </div>

        <div className="idea-grid">
          {IDEAS.map((idea) => (
            <article key={idea.title} className="idea-card">
              <div className="idea-media">
                <img src={idea.image} alt="" />
              </div>
              <div className="idea-body">
                <p className="idea-meta">{idea.meta}</p>
                <h3>{idea.title}</h3>
                <p>{idea.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function HowItWorks() {
  return (
    <section className="section" id="how">
      <div className="section-inner">
        <div className="section-heading section-heading-center">
          <p className="kicker">How It Works</p>
          <h2>Three steps from occasion to gift</h2>
        </div>

        <ol className="steps">
          {STEPS.map((step) => (
            <li key={step.n} className="step-card">
              <span className="step-n">{step.n}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function About() {
  return (
    <section className="section section-soft" id="about">
      <div className="section-inner about-grid">
        <div>
          <p className="kicker">About GiftFinder</p>
          <h2>Gifting should feel joyful — not stressful</h2>
          <p className="lead">
            GiftFinder helps you match the occasion first, then narrows to ideas
            that feel personal, kind, and doable.
          </p>
          <p className="about-copy">
            Whether it’s a birthday, a quiet thank-you, or just because — we
            keep things simple, pretty, and thoughtful.
          </p>
        </div>
        <div className="about-panel">
          <p className="about-quote">
            “The best gifts feel like someone was paying attention.”
          </p>
          <p className="about-note">That’s the GiftFinder way.</p>
        </div>
      </div>
    </section>
  )
}

export function FindGiftForm({ onComplete }) {
  const [form, setForm] = useState(emptyForm)

  const onChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const onSubmit = (event) => {
    event.preventDefault()

    if (
      !form.name ||
      !form.email ||
      !form.occasion ||
      !form.relationship ||
      !form.gender ||
      !form.budget
    ) {
      return
    }

    const gifts = matchGifts(form)
    onComplete?.({ form, gifts })
  }

  return (
    <section className="section" id="find">
      <div className="section-inner find-grid">
        <div className="find-copy">
          <p className="kicker">Find a Gift</p>
          <h2>Tell us about the moment</h2>
          <p className="lead">
            Fill in a few details and we’ll help you land on something they’ll
            actually love.
          </p>
          <ul className="find-points">
            <li>Occasion-first suggestions</li>
            <li>Works for any budget</li>
            <li>Personal without being complicated</li>
          </ul>
        </div>

        <form className="gift-form" onSubmit={onSubmit}>
          <div className="form-row">
            <label>
              Your name
              <input
                name="name"
                type="text"
                placeholder="Alex"
                value={form.name}
                onChange={onChange}
                required
              />
            </label>
            <label>
              Email
              <input
                name="email"
                type="email"
                placeholder="alex@email.com"
                value={form.email}
                onChange={onChange}
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Occasion
              <select
                name="occasion"
                value={form.occasion}
                onChange={onChange}
                required
              >
                <option value="">Select occasion</option>
                <option>Birthday</option>
                <option>Anniversary</option>
                <option>Housewarming</option>
                <option>Thank You</option>
                <option>Graduation</option>
                <option>Just Because</option>
              </select>
            </label>
            <label>
              Who is it for?
              <select
                name="relationship"
                value={form.relationship}
                onChange={onChange}
                required
              >
                <option value="">Select relationship</option>
                <option>Partner</option>
                <option>Best friend</option>
                <option>Family</option>
                <option>Colleague</option>
                <option>Someone special</option>
              </select>
            </label>
          </div>

          <div className="form-row">
            <label>
              Their gender
              <select
                name="gender"
                value={form.gender}
                onChange={onChange}
                required
              >
                <option value="">Select gender</option>
                <option>Women</option>
                <option>Men</option>
                <option>Unisex / Any</option>
              </select>
            </label>
            <label>
              Budget
              <select
                name="budget"
                value={form.budget}
                onChange={onChange}
                required
              >
                <option value="">Select budget</option>
                <option>Under ₹1,000</option>
                <option>₹1,000 – ₹2,500</option>
                <option>₹2,500 – ₹5,000</option>
                <option>₹5,000+</option>
              </select>
            </label>
          </div>

          <label>
            Interests or notes
            <textarea
              name="notes"
              rows="4"
              placeholder="Loves cozy evenings, coffee, soft colors..."
              value={form.notes}
              onChange={onChange}
            />
          </label>

          <button type="submit" className="btn-primary form-submit">
            <GiftIcon size={18} />
            <span>Get My Gift Ideas</span>
            <span aria-hidden="true">→</span>
          </button>
        </form>
      </div>
    </section>
  )
}

export function Contact() {
  const [sent, setSent] = useState(false)

  return (
    <section className="section section-soft" id="contact">
      <div className="section-inner contact-grid">
        <div>
          <p className="kicker">Contact</p>
          <h2>Say hello</h2>
          <p className="lead">
            Questions, collaboration, or gift dilemmas — we’d love to hear from
            you.
          </p>
          <div className="contact-details">
            <p>
              <strong>Email</strong>
              hello@giftfinder.app
            </p>
            <p>
              <strong>Hours</strong>
              Mon–Fri · 9am – 6pm
            </p>
          </div>
        </div>

        <form
          className="gift-form contact-form"
          onSubmit={(event) => {
            event.preventDefault()
            setSent(true)
          }}
        >
          {sent ? (
            <div className="form-success" role="status">
              <h3>Message sent</h3>
              <p>Thanks for reaching out — we’ll get back to you soon.</p>
            </div>
          ) : (
            <>
              <label>
                Name
                <input type="text" name="contactName" placeholder="Your name" required />
              </label>
              <label>
                Email
                <input type="email" name="contactEmail" placeholder="you@email.com" required />
              </label>
              <label>
                Message
                <textarea name="message" rows="4" placeholder="How can we help?" required />
              </label>
              <button type="submit" className="btn-primary form-submit">
                Send message
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <a href="#home" className="brand">
          <span className="brand-icon" aria-hidden="true">
            <GiftIcon size={18} />
          </span>
          <span className="brand-text">GiftFinder</span>
        </a>
        <p>Occasion-wise gift ideas with a soft, thoughtful touch.</p>
        <div className="footer-links">
          <a href="#occasions">Occasions</a>
          <a href="#find">Find a Gift</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  )
}
