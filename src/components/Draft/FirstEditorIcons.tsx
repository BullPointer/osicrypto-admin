import { Icon } from "@iconify/react";


const FirstEditorIcons = ({ editor }:any) => {
  return (
    <div className="flex flex-row justify-center items-center gap-2">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`${editor.isActive("bold") ? "is-active" : ""} text-[20px]`}
      >
        <Icon icon="octicon:bold-16" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={`${
          editor.isActive("underline") ? "is-active" : ""
        } text-[20px]`}
      >
        <Icon icon="pajamas:underline" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`${
          editor.isActive("italic") ? "is-active" : ""
        } text-[20px]`}
      >
        <Icon icon="octicon:italic-16" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`${
          editor.isActive("strike") ? "is-active" : ""
        } text-[20px]`}
      >
        <Icon icon="octicon:strikethrough-16" />
      </button>
      <button
        className={`text-[20px]`}
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
      >
        <Icon icon="ic:baseline-border-clear" />
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`${
          editor.isActive("paragraph") ? "is-active" : ""
        } text-[20px]`}
      >
        <Icon icon="bi:paragraph" />
      </button>
    </div>
  );
};

export default FirstEditorIcons;
