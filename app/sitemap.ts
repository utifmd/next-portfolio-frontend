import { MetadataRoute } from 'next';
export const runtime = 'edge'
export default function sitemap(): MetadataRoute.Sitemap {
    const url = process.env.NEXT_PUBLIC_BASE_URL || "https://utif.pages.dev"
    return [
        {
            url,
            lastModified: new Date(),
        },
        {
            url: `${url}/experience`,
            lastModified: new Date(),
        },
        {
            url: `${url}/authentication`,
            lastModified: new Date(),
        },
        {
            url: `${url}/education`,
            lastModified: new Date(),
        }
    ];
}