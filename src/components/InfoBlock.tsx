type InfoBlockVariant = 'default' | 'centered'

type InfoBlockProps = {
  title: string
  number: string | number
  description: string
  variant?: InfoBlockVariant
}

export default function InfoBlock({
  title,
  number,
  description,
  variant = 'default',
}: InfoBlockProps) {
  const isCentered = variant === 'centered'

  return (
    <div
      className={[
        'flex flex-col gap-2',
        isCentered
          ? 'items-center text-center'
          : 'items-center lg:items-start text-center lg:text-left lg:sticky lg:top-[134px] lg:self-start',
      ].join(' ')}
    >
      <div
        className={[
          'flex items-start',
          isCentered ? 'gap-0' : 'gap-2',
        ].join(' ')}
      >
        <h2 className={!isCentered ? 'whitespace-nowrap flex-shrink-0' : undefined}>
          {title}
        </h2>

        <span
          className={[
            'h6 text-[var(--content-primary)]',
            !isCentered ? 'whitespace-nowrap flex-shrink-0' : '',
          ].join(' ')}
        >
          {number}
        </span>
      </div>

      <p
        className={[
          'text-[var(--content-secondary)]',
          isCentered
            ? 'body-m'
            : 'body-m-medium md:max-w-[480px] lg:max-w-[335px]',
        ].join(' ')}
      >
        {description}
      </p>
    </div>
  )
}
