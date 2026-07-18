"use client";
import { useState } from "react";
import { PostMetadata } from "../../../components/PostMetadata";
import PostPreview from "../../../components/PostPreview";
import { isScheduled as isScheduledPost } from "../../../components/postDates";

interface SearchablePostsProps {
  posts: PostMetadata[];
  showScheduled?: boolean;
}

const getYearFromDate = (dateString: string) => {
  return dateString.split("-")[2];
};

const BlogHome: React.FC<SearchablePostsProps> = ({
  posts = [],
  showScheduled = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const today = new Date();

  const isScheduled = (post: PostMetadata) => isScheduledPost(post, today);

  const filteredPosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((post) => showScheduled || !isScheduled(post));

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const postsByYear: {[key: string]: PostMetadata[]} = {};
  filteredPosts.forEach(post => {
    const year = getYearFromDate(post.date);
    if (!postsByYear[year]) {
      postsByYear[year] = [];
    }
    postsByYear[year].push(post);
  });

  const years = Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <span id="blog" className="block">
      {years.map(year => (
        <div key={year} className="mb-2">
          <div>
            <p className="text-black/30 dark:text-white/30 mb-2">{year} - {postsByYear[year].length} posts</p>
          </div>
          <div className="flex flex-col gap-2">
            {postsByYear[year].map(post => (
              <span
                key={post.slug}
                className={isScheduled(post) ? "opacity-50" : undefined}
              >
                <PostPreview {...post} />
              </span>
            ))}
          </div>
        </div>
      ))}
    </span>
  );
};

export default BlogHome;
