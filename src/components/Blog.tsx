import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BlogDetails } from ".";
import { getBlogsApi } from "../api/BlogApi";
import { useAppContext } from "../context/AppContext";

const Blog = () => {
  const [blogData, setBlogData] = useState([]);
  const [confirm, setConfirm] = useState<string | null>(null);

  const getBlogs = async () => {
    const response = await getBlogsApi();
    if (response.status == 200) {
      setBlogData(response.data.blogs);
    }
  };

  useEffect(() => {
    getBlogs();
  }, [confirm]);
  const { showSidebar } = useAppContext();
  const blogsHeaderSmall = [
    { text: "Category", width: "w-[150px]" },
    { text: "Title", width: "w-[400px]" },
    { text: "Status", width: "w-[100px]" },
    { text: "Updated At", width: "w-[180px]" },
    { text: "Actions", width: "w-[150px]" },
  ];
  const blogsHeader = [
    { text: "Category", width: "w-[200px]" },
    { text: "Title", width: "w-[500px]" },
    { text: "Status", width: "w-[200px]" },
    { text: "Updated At", width: "w-[200px]" },
    { text: "Actions", width: "w-[200px]" },
  ];
  return (
    <div className=" bg-black w-full min-h-screen px-4 py-8">
      <div className="flex flex-row justify-between items-center border-b">
        <div className=" font-semibold text-2xl text-white my-2">
          Settings / <span className="opacity-80">Blogs</span>
        </div>
        <Link to={"create-blog"}>
          <div className="bg-[#3e4869] blue-glassmorphism px-2 py-1 cursor-pointer rounded my-2 text-white font-bold">
            Create new blog
          </div>
        </Link>
      </div>
      <BlogDetails
        confirm={confirm}
        setConfirm={setConfirm}
        category={"BLOGS"}
        header={!showSidebar ? blogsHeader : blogsHeaderSmall}
        data={blogData}
      />{" "}
    </div>
  );
};

export default Blog;
