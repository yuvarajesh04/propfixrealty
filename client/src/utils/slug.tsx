// utils/slug.ts
export const slugify = (text: string) => {
    return text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-")
        .trim();
};

export const seoSlug = (title: string, location: string) => {
  return `${title} plots in ${location}`
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
};
