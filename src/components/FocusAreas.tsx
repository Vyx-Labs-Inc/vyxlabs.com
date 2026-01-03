const areas = [
  'experimentation platforms',
  'subscription analytics',
  'decision support systems',
  'workflow automation',
  'developer tooling',
  'data infrastructure',
  'publishing pipelines',
  'internal systems',
]

export function FocusAreas() {
  return (
    <section className="py-24 lg:py-32 border-t border-vyx-border/50">
      <div className="section-container">
        <h2 className="section-heading">Focus areas</h2>

        <div className="flex flex-wrap gap-3">
          {areas.map((area, index) => (
            <span key={index} className="chip">
              {area}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
