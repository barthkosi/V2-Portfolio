import React from 'react';
import { motion, Variants } from "motion/react";
import { anim, stagger } from "../lib/transitions";

export type MediaType = 'image' | 'video';

export interface BaseMedia {
    type: MediaType;
    src: string;
    className?: string;
}

export interface ImageMedia extends BaseMedia {
    type: 'image';
    alt: string;
}

export interface VideoMedia extends BaseMedia {
    type: 'video';
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    playsInline?: boolean; // Default true usually for background videos
    poster?: string;
}

export type MediaItem = ImageMedia | VideoMedia;

interface ProjectShowcaseProps {
    items: MediaItem[];
    variant?: 'left' | 'right';
}

const containerVariants: Variants = {
    hidden: {},
    visible: stagger(0.2).animate,
};

const itemVariants: Variants = anim.fadeUp;

const MediaRender = ({ item }: { item: MediaItem }) => {
    const baseClasses = "w-full h-full object-cover rounded-[var(--radius-lg)] border-[0.44px] border-[var(--border-primary)]";
    const combinedClasses = `${baseClasses} ${item.className || ''}`.trim();

    if (item.type === 'video') {
        const { autoPlay = true, loop = true, muted = true, playsInline = true, poster } = item;
        return (
            <motion.video
                variants={itemVariants}
                src={item.src}
                className={combinedClasses}
                autoPlay={autoPlay}
                loop={loop}
                muted={muted}
                playsInline={playsInline}
                poster={poster}
            />
        );
    }

    return (
        <motion.img
            variants={itemVariants}
            src={item.src}
            alt={item.alt}
            className={combinedClasses}
        />
    );
};

const SingleColumn = ({ item }: { item: MediaItem }) => (
    <div className="w-full flex flex-col overflow-visible">
        <MediaRender item={item} />
    </div>
);

const StackColumn = ({ topItem, bottomItem }: { topItem: MediaItem; bottomItem: MediaItem }) => (
    <div className="w-full flex flex-col gap-1 md:gap-2 overflow-visible">
        <MediaRender item={topItem} />
        <MediaRender item={bottomItem} />
    </div>
);

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ items, variant = 'left' }) => {
    if (!items || items.length < 3) {
        return null;
    }

    return (
        <motion.div
            className="flex flex-col md:flex-row gap-1 md:gap-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
        >
            {variant === 'left' ? (
                <>
                    <StackColumn topItem={items[0]} bottomItem={items[1]} />
                    <SingleColumn item={items[2]} />
                </>
            ) : (
                <>
                    <SingleColumn item={items[0]} />
                    <StackColumn topItem={items[1]} bottomItem={items[2]} />
                </>
            )}
        </motion.div>
    );
};

export default ProjectShowcase;
