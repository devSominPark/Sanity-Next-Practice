import styles from "../styles/Home.module.css";
import sanityClient from "@sanity/client";

export default function Home({ home, posts }) {
  console.log(`posts`, posts);
  return (
    <div className={styles.container}>
      <h1> Blog {home.mainPostUrl}</h1>
    </div>
  );
}

export async function getStaticProps() {
  // sanity로부터 데이터를 가져옴.
  const client = sanityClient({
    dataset: "production",
    projectId: "p2n8abpc",
    useCdn: true,
  });

  const home = await client.fetch(
    `*[_type == "home"][0]{"mainPostUrl": mainPost -> slug.current}`
  );

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
    }`
  );

  return {
    props: {
      home,
      posts,
    },
  };
}
