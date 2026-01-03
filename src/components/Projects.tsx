const projects = [
  {
    name: 'Measurement Stack',
    status: 'In incubation',
  },
  {
    name: 'Workflow Automation',
    status: 'In incubation',
  },
  {
    name: 'Decision Support Tooling',
    status: 'In incubation',
  },
  {
    name: 'Publishing Pipeline',
    status: 'In incubation',
  },
]

export function Projects() {
  return (
    <section id="projects" className="py-24 lg:py-32 border-t border-vyx-border/50 dot-bg scroll-mt-16">
      <div className="section-container">
        <h2 className="section-heading">Projects</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <div key={index} className="card">
              <div className="flex items-start justify-between">
                <h3 className="text-base font-medium text-white">
                  {project.name}
                </h3>
                <span className="text-xs text-vyx-muted bg-vyx-darker px-2 py-1 rounded">
                  {project.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
