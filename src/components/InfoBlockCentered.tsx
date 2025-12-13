type InfoBlockProps = {
  title: string
  number: string | number
  description: string
}

export default function InfoBlockCentered({ title, number, description }: InfoBlockProps) {
  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <div className="flex items-start gap-0">
        <h2>{title}</h2>
        <span className="h6 text-[var(--content-primary)]">{number}</span>
      </div>

      <p className="body-m text-[var(--content-secondary)]">
        {description}
      </p>
    </div>
  )
}
