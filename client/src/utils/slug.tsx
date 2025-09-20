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
  const format = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")          // replace spaces with dash
      .replace(/[^\w-]+/g, "")       // remove invalid chars
      .replace(/--+/g, "-")          // remove multiple dashes
      .replace(/^-+|-+$/g, "");      // remove leading/trailing dashes

  return `${format(title)}-${format(location)}`;
};

