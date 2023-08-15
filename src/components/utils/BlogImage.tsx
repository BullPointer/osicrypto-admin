import { useState } from "react";
import { blogInputType } from "./Input";

type ImageProps = {
  blog: blogInputType;
  setBlog: React.Dispatch<React.SetStateAction<blogInputType>>;
};

const BlogImage = ({ blog, setBlog }: ImageProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | null>(null);
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = target as HTMLInputElement;

    if (files) {
      const image = URL.createObjectURL(files[0]);
      setImageName(files[0].name);
      console.log(typeof files[0]);

      setBlog({ ...blog, blogImage: files[0] });
    }
  };

  return (
    <div className="flex flex-col justify-start items-start">
      <input
        onChange={handleChange}
        type="file"
        name="img"
        accept="image/jpg, image/jpeg, image/png"
        className="outline-none w-[21%] bg-transparent text-sm"
      />
      {blog.blogImage && (
        <div className="h-[18rem] w-[100%]">
          <img
            className="w-[100%] md:w-[50%] h-[100%] bg-transparent mt-2 rounded object-cover "
            src={
              typeof blog.blogImage === "object"
                ? URL.createObjectURL(blog.blogImage)
                : blog.blogImage
            }
            alt=""
          />
        </div>
      )}
      <label
        className="text-white opacity-80 mb-2 pt-5 font-semibold font-mono text-[15px] sm:text-xl"
        htmlFor=""
      >
        {!blog.blogImage && imageName && `Image: ${imageName ? imageName : "no image selected"}`}
        
      </label>
    </div>
  );
};

export default BlogImage;
