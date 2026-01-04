// import matter from 'gray-matter';

export type ContentType = 'writing' | 'projects';

export interface ContentItem {
    slug: string;
    type: ContentType;
    title: string;
    date: string;
    description: string;
    coverImage?: string;
    author?: string;
    tags?: string[];
    content: string; // The raw markdown body
}

// Simple frontmatter parser to avoid node dependencies (gray-matter) in browser
const parseFrontmatter = (text: string) => {
    const frontmatterRegex = /^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*[\r\n]+([\s\S]*)$/;
    const match = frontmatterRegex.exec(text);
    if (!match) return { data: {}, content: text };

    const frontMatterBlock = match[1];
    const content = match[2];

    const data: Record<string, any> = {};
    frontMatterBlock.split('\n').forEach(line => {
        const parts = line.split(':');
        if (parts.length < 2) return;

        const key = parts[0].trim();
        let value = parts.slice(1).join(':').trim();

        // Remove quotes
        value = value.replace(/^['"](.*)['"]$/, '$1');

        // Handle array: ["Tag1", "Tag2"]
        if (value.startsWith('[') && value.endsWith(']')) {
            const arrayContent = value.slice(1, -1);
            data[key] = arrayContent.split(',').map(s => s.trim().replace(/^['"](.*)['"]$/, '$1')).filter(Boolean);
        } else {
            data[key] = value;
        }
    });

    return { data, content };
}

// Helper to parse a single file
const parseFile = (path: string, content: string, type: ContentType): ContentItem => {
    const { data, content: body } = parseFrontmatter(content);
    // Extract slug from path (e.g., "/src/content/writing/my-post.md" -> "my-post")
    const slug = path.split('/').pop()?.replace('.md', '') || '';

    return {
        slug,
        type,
        title: data.title || 'Untitled',
        date: data.date || new Date().toISOString(),
        description: data.description || '',
        coverImage: data.coverImage,
        author: data.author,
        tags: data.tags || [],
        content: body || '',
    };
};

export const getContent = async (type: ContentType): Promise<ContentItem[]> => {
    let files: Record<string, unknown>;

    if (type === 'writing') {
        files = import.meta.glob('@/content/writing/*.md', { eager: true, query: '?raw', import: 'default' });
    } else {
        files = import.meta.glob('@/content/projects/*.md', { eager: true, query: '?raw', import: 'default' });
    }

    console.log(`[DEBUG] Loading ${type} content...`);
    console.log(`[DEBUG] Found Files:`, Object.keys(files));

    const items = Object.entries(files).map(([path, content]) => {
        try {
            const result = parseFile(path, content as string, type);
            // console.log(`[DEBUG] Parsed ${path}:`, result.title);
            return result;
        } catch (e) {
            console.error(`[DEBUG] Error parsing ${path}:`, e);
            throw e;
        }
    });

    console.log(`[DEBUG] Total Items Loaded:`, items.length);

    // Sort by date descending
    return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getAllTags = (items: ContentItem[]): string[] => {
    const tags = new Set<string>();
    items.forEach(item => {
        item.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags).sort();
};

export const getPostBySlug = async (type: ContentType, slug: string): Promise<ContentItem | undefined> => {
    const items = await getContent(type);
    return items.find(item => item.slug === slug);
};
