const principles = [
  {
    title: 'First-principles reasoning',
    content: 'We decompose problems to their fundamental elements before building solutions. Understanding the underlying structure of a domain enables more robust and adaptable systems.',
  },
  {
    title: 'Falsifiability and measurement',
    content: 'Every significant assumption should be testable. We build systems with instrumentation and feedback loops that surface whether our hypotheses hold in practice.',
  },
  {
    title: 'Iteration and feedback loops',
    content: 'Complex systems are rarely designed correctly on the first attempt. We build incrementally, learning from each iteration and adjusting course based on evidence.',
  },
  {
    title: 'Clarity over hype',
    content: 'We prefer precise language and honest assessments of uncertainty. Technology should be described in terms of what it actually does, not what it might do in optimistic scenarios.',
  },
]

export function HowWeWork() {
  return (
    <section className="py-24 lg:py-32 border-t border-vyx-border/50 dot-bg">
      <div className="section-container">
        <h2 className="section-heading">How we work</h2>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {principles.map((item, index) => (
            <div key={index}>
              <h3 className="text-lg font-medium text-white mb-3">
                {item.title}
              </h3>
              <p className="text-vyx-muted leading-relaxed">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
