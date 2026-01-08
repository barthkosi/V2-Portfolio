import { Helmet } from 'react-helmet-async';

interface HeadProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
}

export default function Head({
    title = "Barth - Portfolio",
    description = "Design & Development",
    image = "https://res.cloudinary.com/barthkosi/image/upload/opengraph.webp",
    url = "https://barthkosi.xyz"
}: HeadProps) {
    const fullTitle = title === "Barth - Portfolio" ? title : `${title} `;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
        </Helmet>
    );
}
