/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function Search() {
  const [sidebardata, setsidebardata] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  console.log(sidebardata);

  const [posts, setposts] = useState([]);
  const [loading, setloading] = useState(false);
  const [showMore, setshowMore] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromURL = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromURL) {
      setsidebardata({
        ...sidebardata,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromURL,
      });
    }
    const fetchPosts = async () => {
      setloading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setloading(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setposts(data.posts);
        console.log(posts);
        setloading(false);
        if (data.posts.length === 9) {
          setshowMore(true);
        } else {
          setshowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setsidebardata({ ...sidebardata, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setsidebardata({ ...sidebardata, sort: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setsidebardata({ ...sidebardata, category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("category", sidebardata.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const noOfPosts = posts.length;
    const startIndex = noOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setposts({ ...posts, ...data.posts });
      if (data.posts.length === 9) {
        setshowMore(true);
      } else {
        setshowMore(false);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form action="" className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label htmlFor="" className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="font-semibold">
              Sort:
            </label>
            <Select
              className=""
              onChange={handleChange}
              value={sidebardata.sort}
              id="sort"
            >
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="font-semibold">
              Category:
            </label>
            <Select
              className=""
              onChange={handleChange}
              value={sidebardata.category}
              id="category"
            >
              <option value="uncategorized">Uncategorized</option>
              <option value="reactjs">React.js</option>
              <option value="nextjs">Next.js</option>
              <option value="javascript">Javascript</option>
            </Select>
          </div>
          <Button type="submit" outline gradientDuoTone="purpleToPink">
            Search
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">
          Posts results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && posts.length === 0 && (
            <p className="text-lg text-gray-500">No Posts Found</p>
          )}
          {loading && <p className="text-lg text-gray-500">Loading....</p>}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-teal-500 text-lg hover:underline p-7 w-full"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
