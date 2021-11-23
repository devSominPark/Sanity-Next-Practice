import sanityClient from "@sanity/client";

export default function PostAll({ slug }) {
  return (
    <div>
      <h1>Post : {slug}</h1>
    </div>
  );
}

export async function getStaticPaths() {
  const client = sanityClient({
    dataset: "production",
    projectId: "p2n8abpc",
    useCdn: true,
  });

  const posts = await client.fetch(
    `
    *[_type == "post"]{
      title,
      subtitle,
      createdAt,
      "content": content[]{
         ...,
         ...select(_type == "imageGallery" => {"images" : images[]{
         ..., "url" : asset -> url}
        })
      },
      "slug" : slug.current,
      "thumbnail" : {
        "alt" : thumbnail.alt,
        "imageUrl" : thumbnail.asset -> url
      },
      "author" : author -> {
        name,
        role,
        'image' : image.asset -> url
      },
      "tag" : tags -> {
        title,
        "slug" : slug.current
      }
    }
    `
  );

  const paths = posts.map((post) => ({
    params: {
      slug: post.slug,
    },
  }));

  return {
    paths,
    fallback: false,
    //paths에 없으면 404 not found
  };
}

export function getStaticProps({ params }) {
  const { slug } = params;
  return {
    props: {
      slug,
    },
  };
}
