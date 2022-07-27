import UserListItem from "@components/UserListItem";
import JobFeedItem from "@pages/FeedPage/components/JobFeedItem";
import PostCard from "@pages/FeedPage/components/PostFeedItem";
import SchoolResultItem from "./SchoolResultItem";

function SearchResult({ type, data }) {
  const renderResults = () => {
    switch (type) {
      case "School":
        return <SchoolResultItem school={data} />;
      case "Post":
        return <PostCard post={data} />;
      case "Job":
        return <JobFeedItem job={data} />;
      case "User":
        return <UserListItem user={data} />;

      default:
        return <div>Default</div>;
    }
  };

  return <div>{renderResults()}</div>;
}

export default SearchResult;
