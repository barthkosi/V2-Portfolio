import { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
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

    useEffect(() => {
        if (post) {
            document.title = `barthkosi - ${post.title.toLowerCase()}`;
        }
    }, [post]);

    if (loading) return null; // Or a mini spinner if prefered, but main loader covers first load

    if (!post) {
        return <Navigate to="/404" replace />;
    }

    return (
        <main className="flex flex-col">

            {/* Cover Image */}
            {post.coverImage && (
                <div className="w-full aspect-video overflow-hidden bg-[var(--background-primary)]">
                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                </div>
            )}

            <div className="flex flex-col lg:flex-row items-start w-full p-4 md:p-8 mx-auto gap-8">

            {/* Header */}
            <div className="w-full flex flex-col  md:max-w-[320px] gap-4 items-start lg:sticky lg:top-[134px]">
                <h1 className="h2 text-[var(--content-primary)]">{post.title}</h1>
                <div className="flex flex-col gap-1 text-[var(--content-tertiary)] body-s">
                    <span>{new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    {post.author && <span>• {post.author}</span>}
                    {post.tags && post.tags.length > 0 && (
                        <span>• {post.tags.join(', ')}</span>
                    )}
                </div>
            </div>

            {/* Content */}
            <article className="w-full max-w-[720px]">
                <ReactMarkdown
                    components={{
                        p: (props) => <p className="mb-6 text-[var(--content-primary)]" {...props} />,
                        a: (props) => <a className="text-[var(--content-link)] hover:text-[var(--content-link-hover)] transition-colors" {...props} />,
                        img: (props) => <img className="rounded-[var(--radius-lg)] w-full my-8" {...props} />,
                        h1: (props) => <h1 className="text-[var(--content-primary)]" {...props} />,
                        h2: (props) => <h2 className="h2 mb-6 text-[var(--content-primary)]" {...props} />,
                        h3: (props) => <h3 className="h3 mb-6 text-[var(--content-primary)]" {...props} />,
                        ul: (props) => <ul className="list-disc pl-6 mb-6 text-[var(--content-primary)]" {...props} />,
                        ol: (props) => <ol className="list-decimal pl-6 mb-6 text-[var(--content-primary)]" {...props} />,
                        li: (props) => <li className="mb-2 pl-1" {...props} />,
                        blockquote: (props) => <blockquote className="border-l-4 border-[var(--content-primary)] pl-4 italic mb-6 text-[var(--content-tertiary)]" {...props} />,
                    }}
                >
                    {post.content}
                </ReactMarkdown>
            </article>
            </div>
        </main>
    );
}
