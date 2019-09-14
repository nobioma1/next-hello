import Layout from '../components/Layout';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';

const PostLink = ({ post }) => (
  <li>
    <Link href="/p/[id]" as={`/p/${post.id}`}>
      <a>{post.name}</a>
    </Link>
  </li>
);

const Blog = ({ shows }) => (
    <Layout>
    <h1>Batman TV Shows</h1>
      <ul>
      {shows.map(show => (
        <PostLink key={show.id} post={show} />
      ))}
      </ul>
    </Layout>
  );
Blog.getInitialProps = async function() {
  const res = await fetch('https://api.tvmaze.com/search/shows?q=batman');
  const data = await res.json();

  return {
    shows: data.map(entry => entry.show),
  };
};
