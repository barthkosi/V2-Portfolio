type InfoBlockProps = {
  title: string
  number: string | number
  description: string
}

export default function InfoBlock({ title, number, description }: InfoBlockProps) {
  return (
    <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-2">
      <div className="flex items-start justify-center lg:justify-start">
        <h2>{title}</h2>
        <span className="h6 text-[var(--content-primary)]">{number}</span>
      </div>

      <p className="body-m text-[var(--content-secondary)]">
        {description}
      </p>
    </div>
  )
}

  