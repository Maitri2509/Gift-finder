import { GiftIcon } from './icons'
import './Results.css'

export default function Results({ payload, onBack }) {
  if (!payload) return null

  const { form, gifts } = payload

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
              <article key={gift.id} className="result-card">
                <div className="result-media">
                  <img src={gift.image} alt={gift.title} />
                  <span className="result-rank">#{index + 1}</span>
                </div>
                <div className="result-body">
                  <div className="result-top">
                    <h2>{gift.title}</h2>
                    <p className="result-price">{gift.price}</p>
                  </div>
                  <p className="result-why">{gift.why}</p>
                  <div className="result-tags">
                    {gift.tags.slice(0, 3).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

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
