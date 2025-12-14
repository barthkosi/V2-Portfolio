type InfoBlockProps = { 
  title: string
  number: number
  description: string
}

export default function InfoBlock({ title, number, description }: InfoBlockProps) {
  return (
    <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-2 lg:sticky lg:top-[134px] lg:self-start">
      <div className="flex items-start gap-2">
        <h2 className="whitespace-nowrap flex-shrink-0">
          {title}
        </h2>

        <span className="h6 text-[var(--content-primary)] whitespace-nowrap flex-shrink-0">
          {number}
        </span>
      </div>

      {/* Description */}
      <p className="body-m-medium md:max-w-[480px] lg:max-w-[335px] text-[var(--content-secondary)]">
        {description}
      </p>
    </div>
  )
}
