"use client";
import { useState } from "react";
import { PostMetadata } from "../../../components/PostMetadata";
import PostPreview from "../../../components/PostPreview";

interface SearchablePostsProps {
  posts: PostMetadata[];
}

const parseDate = (dateString: string) => {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const getYearFromDate = (dateString: string) => {
  return dateString.split("-")[2];
};

const BlogHome: React.FC<SearchablePostsProps> = ({ posts = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const today = new Date();

  const filteredPosts = posts
    .filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((post) => {
      const postDate = parseDate(post.date);
      return postDate <= today;
    });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Agrupar posts por año
  const postsByYear: {[key: string]: PostMetadata[]} = {};
  filteredPosts.forEach(post => {
    const year = getYearFromDate(post.date);
    if (!postsByYear[year]) {
      postsByYear[year] = [];
    }
    postsByYear[year].push(post);
  });

  // Ordenar años en orden descendente
  const years = Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <span id="blog" className="block">
      {years.map(year => (
        <div key={year} className="mb-2">
          <div>
            <p className="text-black/30 mb-2">{year} - {postsByYear[year].length} posts</p>
          </div>
          <div className="flex flex-col gap-2">
            {postsByYear[year].map(post => (
              <PostPreview key={post.slug} {...post} />
            ))}
          </div>
        </div>
      ))}
    </span>
  );
};

export default BlogHome;
