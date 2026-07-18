import { PostMetadata } from "./PostMetadata";
import PostPreview from "./PostPreview";
import { getYear, isScheduled } from "./postDates";
import { muted } from "./styles";

interface PostListProps {
  posts: PostMetadata[];
  /** Include posts dated in the future, rendered dimmed. */
  showScheduled?: boolean;
}

/** Keeps the incoming order, so years come out newest first. */
const groupByYear = (posts: PostMetadata[]) => {
  const byYear: { year: string; posts: PostMetadata[] }[] = [];

  for (const post of posts) {
    const year = getYear(post.date);
    const group = byYear.find((entry) => entry.year === year);

    if (group) {
      group.posts.push(post);
    } else {
      byYear.push({ year, posts: [post] });
    }
  }

  return byYear;
};

/** Posts grouped by year, newest year first. */
export default function PostList({
  posts,
  showScheduled = false,
}: PostListProps) {
  const today = new Date();
  const visible = posts.filter(
    (post) => showScheduled || !isScheduled(post, today)
  );

  return (
    <div id="blog">
      {groupByYear(visible).map(({ year, posts: yearPosts }) => (
        <section key={year} className="mb-2">
          <p className={`${muted} mb-2`}>
            {year} - {yearPosts.length} posts
          </p>
          <div className="flex flex-col gap-2">
            {yearPosts.map((post) => (
              <PostPreview
                key={post.slug}
                {...post}
                dimmed={isScheduled(post, today)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
