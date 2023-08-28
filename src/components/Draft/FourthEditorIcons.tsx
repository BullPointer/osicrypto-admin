import { Icon } from "@iconify/react";

const FourthEditorIcons = ({ editor }: any) => {
  return (
    <div className="flex flex-row justify-center items-center gap-2">
      <button
        className="text-[25px]"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <Icon icon="bx:undo" />
      </button>
      <button
        className="text-[25px]"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <Icon icon="bx:redo" />
      </button>
    </div>
  );
};

export default FourthEditorIcons;
