import { motion } from "motion/react"
import { Link } from "react-router-dom"

type CardProps = {
    image: string
    title?: string
    author?: string
    link?: string
    aspectRatio?: string
}

export default function Card({
    image,
    title,
    author,
    link,
    aspectRatio = "aspect-video"
}: CardProps) {
    const content = (
        <>
            <div className="w-full p-2 rounded-[var(--radius-lg)] bg-[var(--background-secondary)]">
                <div className={`relative w-full ${aspectRatio === "auto" ? "" : aspectRatio} overflow-hidden rounded-xl`}>
                    <img
                        src={image}
                        alt={title || ""}
                        className={`${aspectRatio === "auto" ? "w-full h-auto" : "absolute inset-0 w-full h-full"} object-cover`}
                        loading="lazy"
                    />
                </div>
            </div>

            {(title || author) && (
                <div className="w-full flex flex-col p-4 gap-1 rounded-[var(--radius-lg)] bg-[var(--background-secondary)]">
                    {title && <div className="w-full text-[var(--content-primary)] label-m">{title}</div>}
                    {author && <div className="w-full text-[var(--content-tertiary)] body-s">{author}</div>}
                </div>
            )}
        </>
    )

    const wrapperClass = "gap-3 flex flex-col"

    if (link) {
        // Check if link is external (starts with http)
        const isExternal = link.startsWith('http');

        if (isExternal) {
            return (
                <motion.a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={wrapperClass}
                    whileHover={{ scale: 1.03 }}
                    transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 20
                    }}
                >
                    {content}
                </motion.a>
            )
        } else {
            return (
                <motion.div
                    className={wrapperClass}
                    whileHover={{ scale: 1.03 }}
                    transition={{
                        type: 'spring',
                        stiffness: 200,
                        damping: 20
                    }}
                >
                    <Link to={link}>
                        {content}
                    </Link>
                </motion.div>
            )
        }
    }

    return (
        <div className={wrapperClass}>
            {content}
        </div>
    )
}
