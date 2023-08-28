import { Icon } from "@iconify/react";


const SecondEditorIcons = ({ editor }: any) => {
  return (
    <div className="flex flex-row justify-center items-center gap-2">
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`${
          editor.isActive("heading", { level: 1 }) ? "is-active" : ""
        } text-[20px]`}
      >
        h1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`${
          editor.isActive("heading", { level: 2 }) ? "is-active" : ""
        } text-[20px]`}
      >
        h2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`${
          editor.isActive("heading", { level: 3 }) ? "is-active" : ""
        } text-[20px]`}
      >
        h3
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={`${
          editor.isActive("heading", { level: 4 }) ? "is-active" : ""
        } text-[20px]`}
      >
        h4
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={`${
          editor.isActive("heading", { level: 5 }) ? "is-active" : ""
        } text-[20px]`}
      >
        h5
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={`${
          editor.isActive("heading", { level: 6 }) ? "is-active" : ""
        } text-[20px]`}
      >
        h6
      </button>
    </div>
  );
};

export default SecondEditorIcons;
