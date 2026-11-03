import { groq } from "next-sanity";

const listFields = groq`
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  readTime,
  featured,
  mainImage { asset, alt },
  author-> { name, role },
  category-> { title, "slug": slug.current },
  seo { metaTitle, metaDescription, focusKeyword }
`;

export const allPostsQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**"))]
  | order(publishedAt desc) {
    ${listFields}
  }
`;

export const latestPostsQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**"))]
  | order(publishedAt desc)
  [0...$limit] {
    ${listFields}
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    ${listFields},
    body,
    author-> { name, role, image, bio },
    seo,
    articleType,
    relatedPosts[]-> {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      readTime,
      mainImage { asset, alt },
      category-> { title, "slug": slug.current }
    }
  }
`;

export const draftPostBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ${listFields},
    body,
    author-> { name, role, image, bio },
    seo,
    articleType,
    relatedPosts[]-> {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      readTime,
      mainImage { asset, alt },
      category-> { title, "slug": slug.current }
    }
  }
`;

export const allSlugsQuery = groq`
  *[_type == "post" && !(_id in path("drafts.**")) && defined(slug.current)]
  { "slug": slug.current }
`;
