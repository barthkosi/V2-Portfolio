import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Head from '../components/Head';
import { getPostBySlug, ContentItem, ContentType } from '../lib/content';

interface PostProps {
    type: ContentType;
}

export default function Post({ type }: PostProps) {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<ContentItem | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadPost = async () => {
            if (!slug) return;

            const item = await getPostBySlug(type, slug);
            setPost(item || null);
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

            {(post.bannerImage || post.coverImage) && (
                <div className="w-full overflow-hidden bg-[var(--background-primary)] -mt-[64px] md:-mt-[102px]">
                    <img src={post.bannerImage || post.coverImage} alt={post.title} className="w-full aspect-[16/9] lg:aspect-[1500/300] object-cover" />
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
                    </div>
                </div>

                <article className="w-full max-w-[640px]">
                    <ReactMarkdown
                        components={{
                            p: (props) => <p className="blog-text mb-4 lg:mb-6 text-[var(--content-primary)]" {...props} />,
                            a: (props) => <a className="blog-text mb-4 lg:mb-6 text-[var(--content-link)] hover:text-[var(--content-link-hover)] transition-colors" {...props} />,
                            img: (props) => <img className="rounded-[var(--radius-lg)] w-[calc(100%+80px)] max-w-[720px] -ml-[40px]" {...props} />,
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
            </div>
        </main>
    );
}
