interface FilterProps {
    tags: string[];
    activeTag: string | null;
    onTagSelect: (tag: string | null) => void;
}

export default function Filter({ tags, activeTag, onTagSelect }: FilterProps) {
    if (tags.length === 0) return null;

    return (
        <div className="flex flex-wrap max-w-[680px] justify-center lg:justify-start gap-2 mb-8">
            <button
                onClick={() => onTagSelect(null)}
                className={`px-4 py-2 rounded-full label-s transition-colors ${activeTag === null
                    ? "bg-[var(--content-primary)] text-[var(--content-primary-inverse)]"
                    : "bg-[var(--background-secondary)] text-[var(--content-secondary)] hover:bg-[var(--background-tertiary)]"
                    }`}
            >
                All
            </button>
            {tags.map((tag) => (
                <button
                    key={tag}
                    onClick={() => onTagSelect(tag === activeTag ? null : tag)}
                    className={`px-4 py-2 rounded-full label-s transition-colors ${activeTag === tag
                        ? "bg-[var(--content-primary)] text-[var(--content-primary-inverse)]"
                        : "bg-[var(--background-secondary)] text-[var(--content-secondary)] hover:bg-[var(--background-tertiary)]"
                        }`}
                >
                    {tag}
                </button>
            ))}
        </div>
    );
}
