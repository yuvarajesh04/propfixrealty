// utils/slug.ts
export const slugify = (text: string) => {
    return text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-")
        .trim();
};

// Generates SEO-friendly slugs
export const seoSlug = (title: string, location: string) => {
  return `${title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")}-${location.toLowerCase()}`;
};
