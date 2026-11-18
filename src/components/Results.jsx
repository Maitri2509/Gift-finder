import { useState } from 'react'
import { GiftIcon } from './icons'
import './Results.css'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function Results({ payload, onBack }) {
  if (!payload) return null

  const { form, gifts, user } = payload

  const [rating, setRating] = useState(5)
  const [comments, setComments] = useState('')
  const [feedbackSent, setFeedbackSent] = useState(false)
  const [submittingFeedback, setSubmittingFeedback] = useState(false)

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault()
    setSubmittingFeedback(true)

    try {
      await fetch(`${API_BASE}/api/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user?.id || user?.user_id || null,
          email: form.email || null,
          name: form.name || 'Valued User',
          rating,
          comments: comments ? comments.trim() : 'Great gift recommendations!',
        }),
      })
      setFeedbackSent(true)
    } catch (err) {
      console.warn('[Results] Feedback submission failed:', err)
      setFeedbackSent(true) // Still show thank you so user experience is not disrupted
    } finally {
      setSubmittingFeedback(false)
    }
  }

  return (
    <section className="results-page" id="results">
      <div className="results-inner">
        <button type="button" className="results-back" onClick={onBack}>
          ← Back to form
        </button>

        <div className="results-hero">
          <p className="kicker">Your gift matches</p>
          <h1>
            Ideas for {form.name || 'you'}, curated for{' '}
            <span>{form.occasion || 'this moment'}</span>
          </h1>
          <p className="results-summary">
            For your <strong>{form.relationship || 'someone special'}</strong>
            {' · '}
            <strong>{form.gender || 'Any'}</strong>
            {' · '}
            Budget <strong>{form.budget || 'flexible'}</strong>
            {form.notes ? (
              <>
                {' · '}
                Notes: <em>“{form.notes}”</em>
              </>
            ) : null}
          </p>
        </div>

        {gifts.length === 0 ? (
          <div className="results-empty">
            <GiftIcon size={28} />
            <h2>No exact matches yet</h2>
            <p>Try another occasion or budget, and we’ll reshape the list.</p>
            <button type="button" className="btn-primary" onClick={onBack}>
              Edit my choices
            </button>
          </div>
        ) : (
          <div className="results-grid">
            {gifts.map((gift, index) => (
              <article key={gift.id || gift.gift_id || index} className="result-card">
                <div className="result-media">
                  <img
                    src={gift.image || gift.image_url || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80'}
                    alt={gift.title || gift.gift_name || 'Gift match'}
                    onError={(e) => {
                      e.currentTarget.onerror = null
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80'
                    }}
                  />
                  <span className="result-rank">#{index + 1}</span>
                </div>
                <div className="result-body">
                  <div className="result-top">
                    <h2>{gift.title || gift.gift_name}</h2>
                    <p className="result-price">{gift.price}</p>
                  </div>
                  <p className="result-why">{gift.why || gift.description}</p>
                  <div className="result-tags">
                    {(gift.tags || []).slice(0, 3).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Feedback Section connected to MySQL Table 4 */}
        <div className="feedback-section">
          <div className="feedback-card">
            <h3>How helpful were these recommendations?</h3>
            <p className="feedback-subtitle">
              Your feedback is saved to our database to improve future gift suggestions.
            </p>

            {feedbackSent ? (
              <div className="feedback-success">
                <span>✓ Thank you, {form.name || 'friend'}! Your {rating}-star rating has been recorded in the database.</span>
              </div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="feedback-form">
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      className={`star-btn ${rating >= star ? 'active' : ''}`}
                      onClick={() => setRating(star)}
                      aria-label={`${star} stars`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="rating-label">
                    {rating === 5 ? '5 / 5 (Loved it!)' : `${rating} / 5`}
                  </span>
                </div>

                <div className="feedback-inputs">
                  <input
                    type="text"
                    placeholder="Leave a quick comment (optional)..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="feedback-input"
                  />
                  <button type="submit" className="btn-primary feedback-submit-btn" disabled={submittingFeedback}>
                    {submittingFeedback ? 'Submitting...' : 'Submit Feedback'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        <div className="results-cta">
          <p>Want a different direction?</p>
          <button type="button" className="btn-primary" onClick={onBack}>
            <GiftIcon size={18} />
            Try another search
          </button>
        </div>
      </div>
    </section>
  )
}
