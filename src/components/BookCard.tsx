import { motion } from "motion/react"

type BookCardProps = {
  image: string
  title: string
  author: string
}

export default function BookCard({ image, title, author }: BookCardProps) {
  return (
    <motion.div
      className="gap-3 flex flex-col"
      whileHover={{ scale: 1.03 }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20
      }}
    >

      <div className="w-full p-2 rounded-[var(--radius-lg)] bg-[var(--background-secondary)]">
        <div className="relative w-full aspect-[2/3] overflow-hidden rounded-xl">
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      </div>

      <div className="w-full flex flex-col p-4 gap-1 rounded-[var(--radius-lg)] bg-[var(--background-secondary)]">
        <div className="w-full text-[var(--content-primary)] label-m">{title}</div>
        <div className="w-full text-[var(--content-tertiary)] body-s">{author}</div>
      </div>
    </motion.div>
  )
}