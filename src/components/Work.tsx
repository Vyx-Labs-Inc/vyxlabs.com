const projects = [
  {
    name: 'Brain OS',
    category: 'Personal Automation',
    status: 'Active',
    description: 'Headless AI-powered personal automation server controlled via iMessage. Claude-powered intelligent assistant for home and life automation.',
  },
  {
    name: 'Risi.ai',
    category: 'iOS / Health Tech',
    status: 'Active',
    description: 'Privacy-first wellness companion with on-device AI. Turns Apple Health data into actionable insights without cloud processing.',
  },
  {
    name: 'MCP Federated Agent Mail',
    category: 'Developer Infrastructure',
    status: 'Active',
    description: 'Coordination layer for AI coding agents. Mail-like messaging, file reservations, and Git-backed auditing for multi-agent workflows.',
  },
  {
    name: 'Hourglass Press',
    category: 'AI Publishing',
    status: 'Active',
    description: 'Conversational AI book creation platform. From idea to KDP-ready manuscript and cover in under an hour.',
  },
]

const focusAreas = [
  'AI Agents',
  'On-Device ML',
  'Automation',
  'Privacy',
  'Developer Tools',
  'Publishing',
]

export function Work() {
  return (
    <section id="work" className="py-32 lg:py-40 border-t border-zinc-800/50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 lg:mb-24">
          <div>
            <span className="mono text-xs text-zinc-500 tracking-widest uppercase mb-4 block">
              Work
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
              Current projects
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {focusAreas.map((area, i) => (
              <span
                key={i}
                className="mono text-[10px] px-3 py-1.5 border border-zinc-800 text-zinc-500 tracking-wider uppercase"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Projects list */}
        <div className="space-y-px">
          {projects.map((project, i) => (
            <div
              key={i}
              className="group relative grid lg:grid-cols-12 gap-4 lg:gap-8 py-8 lg:py-10 border-t border-zinc-800/50 hover:bg-zinc-900/30 transition-colors duration-300 cursor-default"
            >
              {/* Number */}
              <div className="lg:col-span-1">
                <span className="mono text-xs text-zinc-600">0{i + 1}</span>
              </div>

              {/* Name */}
              <div className="lg:col-span-3">
                <h3 className="text-lg font-medium group-hover:text-zinc-300 transition-colors">
                  {project.name}
                </h3>
              </div>

              {/* Category */}
              <div className="lg:col-span-2">
                <span className="text-sm text-zinc-500">{project.category}</span>
              </div>

              {/* Description */}
              <div className="lg:col-span-4">
                <p className="text-sm text-zinc-500 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Status */}
              <div className="lg:col-span-2 flex items-start justify-end">
                <span className="mono text-[10px] px-2 py-1 bg-zinc-800/50 text-zinc-400 tracking-wider uppercase">
                  {project.status}
                </span>
              </div>

              {/* Hover line */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-white scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="mt-16 pt-8 border-t border-zinc-800/30">
          <p className="text-sm text-zinc-600 max-w-xl">
            Projects are developed internally and spun out when ready.
            Interested in collaboration or early access? <a href="#contact" className="text-zinc-400 hover:text-white transition-colors underline underline-offset-4">Get in touch</a>.
          </p>
        </div>
      </div>
    </section>
  )
}
