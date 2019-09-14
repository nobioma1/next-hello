import Layout from '../../components/Layout';
import fetch from 'isomorphic-unfetch';
import Markdown from 'react-markdown';

const Post = ({ show }) => (
  <Layout>
    <h1>{show.name}</h1>
    <img src={show.image.medium} />
    <p>{show.summary.replace(/<[/]?p>/g, '')}</p>
    <div className="markdown">
      <Markdown
        source={`
### This is a title from a markdown
Yes. We can have a [link](/link).
And we can have a title as well.

And here's the content.
      `}
      />
    </div>
    <style jsx global>{`
      .markdown {
        font-family: 'Arial';
      }

      .markdown a {
        text-decoration: none;
        color: blue;
      }

      .markdown a:hover {
        opacity: 0.6;
      }

      .markdown h3 {
        margin: 0;
        padding: 0;
        text-transform: uppercase;
      }
    `}</style>
  </Layout>
);

Post.getInitialProps = async context => {
  const { id } = context.query;
  const res = await fetch(`https://api.tvmaze.com/shows/${id}`);
  const show = await res.json();

  return { show };
};

export default Post;
