const capabilities = [
  {
    title: 'Product incubation and rapid prototyping',
    description: 'Building software products from first principles, iterating quickly from concept to functional systems.',
  },
  {
    title: 'Measurement, experimentation, and decision systems',
    description: 'Creating infrastructure for rigorous testing, analysis, and data-driven decision making.',
  },
  {
    title: 'Automation and internal tooling',
    description: 'Developing systems that reduce operational friction and increase organizational throughput.',
  },
]

export function WhatWeDo() {
  return (
    <section className="py-24 lg:py-32 border-t border-vyx-border/50">
      <div className="section-container">
        <h2 className="section-heading">What we do</h2>

        <div className="grid gap-8 lg:gap-12">
          {capabilities.map((item, index) => (
            <div
              key={index}
              className="group"
            >
              <h3 className="text-xl font-medium text-white mb-3">
                {item.title}
              </h3>
              <p className="text-vyx-muted leading-relaxed max-w-2xl">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
