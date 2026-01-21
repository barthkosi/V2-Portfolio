import { useEffect, useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Head from '../components/Head';
import Card from '../components/Card';
import { getPostBySlug, getContent, ContentItem, ContentType } from '../lib/content';

interface PostProps {
    type: ContentType;
}

export default function Post({ type }: PostProps) {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<ContentItem | null>(null);
    const [allPosts, setAllPosts] = useState<ContentItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPost = async () => {
            if (!slug) return;

            const [item, posts] = await Promise.all([
                getPostBySlug(type, slug),
                getContent(type)
            ]);
            setPost(item || null);
            setAllPosts(posts);
            setLoading(false);
        };

        loadPost();
    }, [slug, type]);



    if (loading) return null;

    if (!post) {
        return <Navigate to="/404" replace />;
    }

    return (
        <main className="flex flex-col">
            <Head
                title={`barthkosi - ${post.title.toLowerCase()}`}
                description={post.description}
                image={post.bannerImage || post.coverImage}
            />

            {post.bannerImage && (
                <div className="w-full overflow-hidden bg-[var(--background-primary)] -mt-[64px] md:-mt-[102px]">
                    <img src={post.bannerImage} alt={post.title} className="w-full aspect-[16/9] lg:aspect-[1500/300] object-cover" />
                </div>
            )}

            <div className="flex flex-col max-w-[720px] items-center lg:items-start w-full p-4 md:p-8 mx-auto gap-8">

                <div className="w-full flex flex-col gap-4 items-start md:items-center">
                    <h1 className="text-start md:text-center text-[var(--content-primary)]">{post.title}</h1>
                    <div className="flex flex-col items-start md:items-center gap-4 text-[var(--content-tertiary)] label-s">
                        <div className="flex flex-col items-start md:items-center gap-2">
                            <span className='label-m'>{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                            {post.author && <span className='label-m'>{post.author}</span>}
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {post.tags && post.tags.length > 0 && post.tags.map(tag => (
                                <span key={tag} className='px-4 py-2 rounded-xl border-[var(--border-primary)] border-[0.4px]'>{tag}</span>
                            ))}
                        </div>
                        {post.buttonText && post.buttonLink && (
                            <a
                                href={post.buttonLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="label-m px-4 py-2 rounded-xl bg-[var(--background-secondary)] text-[var(--content-primary)] hover:bg-[var(--background-tertiary)] transition-colors"
                            >
                                {post.buttonText}
                            </a>
                        )}
                    </div>
                </div>

                <article className="w-full max-w-[640px]">
                    <ReactMarkdown
                        components={{
                            p: (props) => <p className="blog-text mb-4 lg:mb-6 text-[var(--content-primary)]" {...props} />,
                            a: (props) => <a className="blog-text mb-4 lg:mb-6 text-[var(--content-link)] hover:text-[var(--content-link-hover)] transition-colors" {...props} />,
                            img: (props) => <img className="rounded-[var(--radius-lg)] w-full lg:w-[calc(100%+80px)] lg:max-w-[720px] lg:-ml-[40px]" {...props} />,
                            h1: (props) => <h1 className="h3 mb-4 lg:mb-6 text-[var(--content-primary)]" {...props} />,
                            h2: (props) => <h2 className="h4 mb-4 lg:mb-6 text-[var(--content-primary)]" {...props} />,
                            h3: (props) => <h3 className="h5 mb-4 lg:mb-6 text-[var(--content-primary)]" {...props} />,
                            ul: (props) => <ul className="list-disc pl-6 mb-4 lg:mb-6 text-[var(--content-primary)]" {...props} />,
                            ol: (props) => <ol className="list-decimal pl-6 mb-4 lg:mb-6 text-[var(--content-primary)]" {...props} />,
                            li: (props) => <li className="mb-4 lg:mb-6 pl-1" {...props} />,
                            blockquote: (props) => <blockquote className="border-l-5 border-[var(--border-primary)] pl-3 italic mb-6 text-[var(--content-tertiary)]" {...props} />,
                        }}
                    >
                        {post.content}
                    </ReactMarkdown>
                </article>

                {(() => {
                    const currentIndex = allPosts.findIndex(p => p.slug === post.slug);
                    const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
                    const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

                    if (!prevPost && !nextPost) return null;

                    return (
                        <div className="w-full flex justify-between items-center pt-4 md:pt-6 border-t border-[var(--border-primary)]">
                            {prevPost ? (
                                <Link
                                    to={`/${type}/${prevPost.slug}`}
                                    className="flex flex-row label-m text-[var(--content-primary)] hover:text-[var(--content-secondary)] transition-colors"
                                >
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7803 14.7803C12.0732 14.4874 12.0732 14.0126 11.7803 13.7197L8.06066 10L11.7803 6.28033C12.0732 5.98744 12.0732 5.51256 11.7803 5.21967C11.4874 4.92678 11.0126 4.92678 10.7197 5.21967L6.46967 9.46967C6.32902 9.61032 6.25 9.80109 6.25 10C6.25 10.1989 6.32902 10.3897 6.46967 10.5303L10.7197 14.7803C11.0126 15.0732 11.4874 15.0732 11.7803 14.7803Z" fill="currentColor" />
                                    </svg>
                                    Previous
                                </Link>
                            ) : <span />}
                            {nextPost ? (
                                <Link
                                    to={`/${type}/${nextPost.slug}`}
                                    className="flex flex-row label-m text-[var(--content-primary)] hover:text-[var(--content-secondary)] transition-colors"
                                >
                                    Next
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8.21967 14.7803C7.92678 14.4874 7.92678 14.0126 8.21967 13.7197L11.9393 10L8.21967 6.28033C7.92678 5.98744 7.92678 5.51256 8.21967 5.21967C8.51256 4.92678 8.98744 4.92678 9.28033 5.21967L13.5303 9.46967C13.671 9.61032 13.75 9.80109 13.75 10C13.75 10.1989 13.671 10.3897 13.5303 10.5303L9.28033 14.7803C8.98744 15.0732 8.51256 15.0732 8.21967 14.7803Z" fill="currentColor" />
                                    </svg>
                                </Link>
                            ) : <span />}
                        </div>
                    );
                })()}

                {(() => {
                    const otherPosts = allPosts.filter(p => p.slug !== post.slug).slice(0, 3);
                    if (otherPosts.length === 0) return null;

                    return (
                        <div className="w-full flex flex-col gap-5">
                            <h3 className="h4 text-[var(--content-primary)]">More {type}</h3>
                            <div className="flex flex-col gap-4">
                                {otherPosts.map(p => (
                                    <Card
                                        key={p.slug}
                                        image={p.coverImage || ""}
                                        title={p.title}
                                        description={p.description}
                                        link={`/${type}/${p.slug}`}
                                        variant="list"
                                        aspectRatio="aspect-video"
                                    />
                                ))}
                            </div>
                        </div>
                    );
                })()}
            </div>
        </main>
    );
}
