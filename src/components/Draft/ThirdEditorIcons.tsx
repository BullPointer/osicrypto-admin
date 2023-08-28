import { Icon } from "@iconify/react";

const ThirdEditorIcons = ({ editor, setShowColor, showColor }: any) => {
  return (
    <div className="flex flex-row justify-center items-center gap-2">
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`${
          editor.isActive({ textAlign: "left" }) ? "is-active" : ""
        }text-[20px]`}
      >
        <Icon icon="zondicons:align-left" />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`${
          editor.isActive({ textAlign: "center" }) ? "is-active" : ""
        }text-[20px]`}
      >
        <Icon icon="zondicons:align-center" />
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`${
          editor.isActive({ textAlign: "right" }) ? "is-active" : ""
        }text-[20px]`}
      >
        <Icon icon="zondicons:align-right" />
      </button>

      <button
        className="text-[20px]"
        onClick={() => editor.chain().focus().unsetTextAlign().run()}
      >
        <Icon icon="tabler:row-remove" />
      </button>

      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`${
          editor.isActive("bulletList") ? "is-active" : ""
        } text-[20px]`}
      >
        <Icon icon="ooui:list-bullet-ltr" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`${
          editor.isActive("orderedList") ? "is-active" : ""
        } text-[20px]`}
      >
        <Icon icon="icon-park-outline:ordered-list" />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`${
          editor.isActive("codeBlock") ? "is-active" : ""
        }text-[20px]`}
      >
        <Icon icon="ph:code-block-fill" />
      </button>

      <button
        className="text-[20px] font-bold"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Icon icon="codicon:horizontal-rule" />
      </button>
      <button
        onClick={() => setShowColor(!showColor)}
        className={`${
          editor.isActive("textStyle", { color: "#958DF1" }) ? "is-active" : ""
        }text-[20px]`}
      >
        <Icon icon="fluent:text-color-16-filled" />
      </button>
    </div>
  );
};

export default ThirdEditorIcons;
