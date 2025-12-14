type BookCardProps = {
image: string
title: string
author: string
}

export default function BookCard({ image, title, author }: BookCardProps) {
    return (
      <div className="gap-3 flex flex-col">
        <div className="w-full flex flex-col p-2 rounded-[var(--radius-lg)] bg-[var(--background-secondary)]">
          <img
            src={image}
            alt={title}
            className="w-full h-auto object-cover rounded-xl"
          />
        </div>
  
        <div className="w-full flex flex-col p-4 gap-1 rounded-[var(--radius-lg)] bg-[var(--background-secondary)]">
          <div className="w-full text-[var(--content-primary)] label-m">{title}</div>
          <div className="w-full text-[var(--content-tertiary)] body-s">{author}</div>
        </div>
      </div>
    )
  }
  