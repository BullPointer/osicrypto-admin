import Joi from "joi";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createBlogApi, editByIdApi, getBlogByIdApi } from "../api/BlogApi";
import BlogImage from "./utils/BlogImage";
import Input, { blogInputType } from "./utils/Input";
import Select from "./utils/Select";
import { ErrorDisplayPage } from "./ErrorDisplayPage";

const CrudBlog = () => {
  const blogObj = {
    blogImage: null,
    category: "",
    title: "",
    subtitle: "",
    author: "",
    notes: "",
  };

  const [useParams] = useSearchParams();
  const id = useParams.get("id");
  const [err, setErr] = useState<blogInputType | null>(blogObj);
  const [blogMessage, setBlogMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const [blog, setBlog] = useState<blogInputType>({
    ...blogObj,
    category: "Latest News",
  });

  const getBlogById = async () => {
    if (id) {
      const response = await getBlogByIdApi(id);
      if (response.status == 200) {
        setBlog({
          ...blog,
          blogImage: `http://localhost:3000/${response.data.data.blogImage}`,
          category: response.data.data.category,
          title: response.data.data.title,
          subtitle: response.data.data.subtitle,
          author: response.data.data.author,
          notes: response.data.data.notes,
        });
      }
    }
  };

  useEffect(() => {
    getBlogById();
  }, []);
  useEffect(() => {
    if (blogMessage) {
      console.log("I think it is true now");
    }
  }, []);

  const schema = Joi.object({
    blogImage: Joi.any().allow("").optional(),
    category: Joi.string(),
    title: Joi.string(),
    subtitle: Joi.string(),
    author: Joi.string(),
    notes: Joi.string().min(10),
  });

  const handleChange = ({
    target,
  }:
    | Event
    | React.ChangeEvent<
        HTMLTextAreaElement | HTMLSelectElement | HTMLInputElement
      >) => {
    const { name, value } = target as HTMLInputElement | HTMLTextAreaElement;
    setBlog({ ...blog, [name]: value });
  };

  const handleSubmit = async (e: Event | React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = {} as blogInputType;
    const { error } = schema.validate(blog, { abortEarly: false });
    if (error) {
      for (let index = 0; index < error.details.length; index++) {
        errors[error.details[index].path[0] as keyof typeof blog] =
          error.details[index].message;
      }
      return setErr(errors);
    }
    if (id) {
      try {
        const response = await getBlogByIdApi(id);
        const compareObj: blogInputType = {
          ...blog,
          blogImage: `http://localhost:3000/${response.data.data.blogImage}`,
          category: response.data.data.category,
          title: response.data.data.title,
          subtitle: response.data.data.subtitle,
          author: response.data.data.author,
          notes: response.data.data.notes,
        };
        const editedBlog = {} as blogInputType;
        for (const key in blog) {
          if (blog.hasOwnProperty(key) && compareObj.hasOwnProperty(key)) {
            if (
              blog[key as keyof blogInputType] !==
              compareObj[key as keyof blogInputType]
            ) {
              editedBlog[key as keyof blogInputType] =
                blog[key as keyof blogInputType];
            }
          }
        }
        editByIdApi(editedBlog, id);

        setErr(null);
        setBlogMessage("Blog edited sucessfully!");
        setTimeout(() => {
          setBlogMessage(null);
          navigate("/admin/blog");
        }, 3000);
      } catch (error) {
        setBlogMessage(
          String(
            "An unexpected error occured, speak with your developer for more details"
          )
        );
        setTimeout(() => {
          setBlogMessage(null);
        }, 3000);
      }
    } else {
      try {
        await createBlogApi(blog);

        setErr(null);
        setBlogMessage("Blog published sucessfully!");
        setTimeout(() => {
          setBlogMessage(null);
          navigate("/admin/blog");
        }, 3000);
      } catch (error: any) {
        setBlogMessage(
          String(
            blog.blogImage === null && "Please select an image to publish blog"
          )
        );
        setTimeout(() => {
          setBlogMessage(null);
        }, 3000);
      }
    }
  };

  return (
    <div className="bg-black w-full min-h-screen px-4 py-8 text-white">
      {blogMessage && (
        <ErrorDisplayPage color={"text-blue-400"} message={blogMessage} />
      )}
      <div className="font-semibold text-2xl text-white py-2 border-b">
        Create ( <span className="opacity-80">Blog</span> )
      </div>
      <form
        onSubmit={handleSubmit}
        action=""
        method="post"
        className="w-full p-5 rounded-lg border mt-8 mb-2"
      >
        <BlogImage setBlog={setBlog} blog={blog} />
        <Select
          handleChange={handleChange}
          listArr={[
            {
              option: "Latest News",
              value: "Latest News",
            },
            {
              option: "For You",
              value: "For You",
            },
            {
              option: "Price Predictions",
              value: "Price Predictions",
            },
            {
              option: "Crypto Updates",
              value: "Crypto Updates",
            },
            {
              option: "Trending News",
              value: "Trending News",
            },
            {
              option: "Top Stories",
              value: "Top Stories",
            },
          ]}
          label={"Category"}
          name={"category"}
        />
        <Input
          onChange={handleChange}
          objectValue={blog}
          label="Title"
          type="text"
          name="title"
        />
        {err?.title && <div className="text-sm text-red-400">{err.title}</div>}
        <Input
          onChange={handleChange}
          objectValue={blog}
          label="Subtitle"
          type="text"
          name="subtitle"
        />
        {err?.title && (
          <div className="text-sm text-red-400">{err.subtitle}</div>
        )}
        <Input
          onChange={handleChange}
          objectValue={blog}
          label="Author"
          type="text"
          name="author"
        />
        {err?.author && (
          <div className="text-sm text-red-400">{err.author}</div>
        )}
        {/* <Select
          handleChange={handleChange}
          listArr={[
            {
              option: "Active",
              value: true,
            },
            {
              option: "Deactive",
              value: false,
            },
          ]}
          label={"Activation Status"}
          name={"status"}
        />
        {err?.author && (
          <div className="text-sm text-red-400">{err.author}</div>
        )} */}
        <div className="flex flex-col justify-start items-start w-full">
          <label
            className="text-white pt-5 font-semibold font-mono text-xl"
            htmlFor=""
          >
            Write article
          </label>
          <textarea
            onChange={handleChange}
            value={blog["notes"]}
            name="notes"
            className="outline-none resize-none w-[50%] bg-transparent border-b-2"
          ></textarea>
          {err?.notes && (
            <div className="text-sm text-red-400">{err.notes}</div>
          )}
        </div>
        <button
          className="bg-[#e7353511] hover:bg-blue-800 px-8 py-2 rounded-lg my-2 font-bold text-lg"
          type="submit"
        >
          {id ? <span>Edit</span> : <span>Publish</span>}
        </button>
      </form>
    </div>
  );
};

export default CrudBlog;
