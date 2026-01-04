import { springBase } from "@/lib/transitions"
import { motion } from "motion/react"
import { Link } from "react-router-dom"

type CardProps = {
    image: string
    title?: string
    description?: string
    link?: string
    tags?: string[]
    variant?: 'default' | 'list'
    aspectRatio?: string
}

export default function Card({
    image,
    title,
    description,
    link,
    tags,
    variant = "default",
    aspectRatio = "aspect-video"
}: CardProps) {
    // Default Card Content
    const DefaultContent = (
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

            {(title || description) && (
                <div className="w-full flex flex-col p-4 gap-1 rounded-[var(--radius-lg)] bg-[var(--background-secondary)]">
                    {title && <div className="w-full text-[var(--content-primary)] label-m">{title}</div>}
                    {description && <div className="w-full text-[var(--content-tertiary)] body-s">{description}</div>}
                </div>
            )}
        </>
    );

    // List Card Content
    const ListContent = (
        <div className="w-full gap-3 flex flex-col md:flex-row items-center group">
            <img
                src={image}
                alt={title || ""}
                className="aspect-video w-full md:max-w-[240px] rounded-[12px] h-auto object-cover bg-[var(--background-secondary)]"
            />
            <div className="w-full flex flex-col gap-1">
                {title && <h4 className="text-[var(--content-primary)]">{title}</h4>}
                {description && <div className="label-m text-[var(--content-secondary)]">{description}</div>}
            </div>
            {tags && tags.length > 0 && (
                <div className="w-full lg:max-w-[320px] flex flex-wrap justify-start md:justify-end gap-2">
                    {tags.map((tag) => (
                        <div key={tag} className="px-4 py-2 rounded-full label-s bg-[var(--background-secondary)] text-[var(--content-secondary)]">
                            {tag}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );

    // Determines which content to render
    const content = variant === "list" ? ListContent : DefaultContent;

    // For list view, we don't want the default flex-col gap-3 wrapper from the original card if it interferes, 
    // but the original had `wrapperClass = "gap-3 flex flex-col"`. 
    // The list view manages its own flex layout.
    // However, the wrapping Link or motion.div needs to handle the click.

    // We'll use a simpler wrapper for the list variant if needed, or share if possible.
    // The default card has a specific container style. The list card has its own "w-full ..." class on the root div.
    // So we should let the content be the main container and just wrap it with Link/motion.

    if (link) {
        // Check if link is external (starts with http)
        const isExternal = link.startsWith('http');

        if (isExternal) {
            return (
                <motion.a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block"
                    whileHover={{ scale: variant === "list" ? 1.01 : 1.03 }} // LEss scale for list items
                    transition={springBase}
                >
                    {content}
                </motion.a>
            )
        } else {
            return (
                <motion.div
                    className="w-full"
                    whileHover={{ scale: variant === "list" ? 1.01 : 1.03 }}
                    transition={springBase}
                >
                    <Link to={link}>
                        {content}
                    </Link>
                </motion.div>
            )
        }
    }

    return (
        <div className="w-full">
            {content}
        </div>
    )
}
