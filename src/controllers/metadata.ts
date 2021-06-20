import metascraper from "metascraper";
import date from "metascraper-date";
import description from "metascraper-description";
import image from "metascraper-image";
import publisher from "metascraper-publisher";
import title from "metascraper-title";
import url from "metascraper-url";
import fetch from "node-fetch";

export type Metadata = {
    date?: string;
    description?: string;
    image?: string;
    publisher?: string;
    title?: string;
    url: string;
};

const scraper = metascraper([date(), description(), image(), publisher(), title(), url()]);
const getMetadata = async (url: string): Promise<Metadata> => {
    const res = await fetch(url);
    if (!res.ok) {
        throw new Error(`fetch failed: status=${res.status}, url=${res.url}`);
    }

    const meta = await scraper({ url, html: await res.text() });
    return {
        date: meta.date || undefined,
        description: meta.description || undefined,
        image: meta.image || undefined,
        publisher: meta.publisher || undefined,
        title: meta.title || undefined,
        url: meta.url || url,
    };
};

export const metaCrawler = async (url: string) => (getMetadata)(url);