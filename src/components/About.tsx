const capabilities = [
  {
    number: '01',
    title: 'Product Incubation',
    description: 'From concept to production. Rapid prototyping with a focus on scalable architecture.',
  },
  {
    number: '02',
    title: 'AI Transformation',
    description: 'Helping businesses adopt agentic workflows and integrate AI into their operations for measurable productivity gains.',
  },
  {
    number: '03',
    title: 'Systems & Automation',
    description: 'Internal tooling, infrastructure, and decision systems that reduce friction and increase organizational throughput.',
  },
]

const principles = [
  'First principles thinking',
  'Falsifiable hypotheses',
  'Iteration over speculation',
  'Clarity over hype',
]

export function About() {
  return (
    <section id="about" className="py-32 lg:py-40 border-t border-zinc-800/50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-20 lg:mb-28">
          <span className="mono text-xs text-zinc-500 tracking-widest uppercase mb-4 block">
            What we do
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight max-w-2xl">
            From <span className="text-zinc-500">x</span> to <span className="text-zinc-500">y</span>—mapping inputs to outcomes.
          </h2>
        </div>

        {/* Capabilities grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 mb-32">
          {capabilities.map((cap, i) => (
            <div
              key={i}
              className="group p-8 border border-zinc-800/50 hover:border-zinc-700 transition-colors duration-300"
            >
              <span className="mono text-xs text-zinc-600 mb-6 block">{cap.number}</span>
              <h3 className="text-xl font-medium mb-4 group-hover:text-zinc-300 transition-colors">
                {cap.title}
              </h3>
              <p className="text-zinc-500 text-sm leading-relaxed">
                {cap.description}
              </p>
            </div>
          ))}
        </div>

        {/* Principles */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <span className="mono text-xs text-zinc-500 tracking-widest uppercase mb-4 block">
              How we work
            </span>
            <p className="text-xl lg:text-2xl text-zinc-300 leading-relaxed">
              We decompose problems to their foundations before building solutions.
              Every assumption is tested. Every decision is measured.
            </p>
          </div>
          <div className="flex flex-col justify-center">
            <ul className="space-y-4">
              {principles.map((p, i) => (
                <li key={i} className="flex items-center gap-4 text-zinc-400">
                  <span className="w-6 h-px bg-zinc-700" />
                  <span className="text-sm">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
