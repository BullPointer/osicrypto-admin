import "./styles.css";
import { Icon } from "@iconify/react";
import parser from "html-react-parser";
import { Color } from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import FirstEditorIcons from "./Draft/FirstEditorIcons";
import SecondEditorIcons from "./Draft/SecondEditorIcons";
import ThirdEditorIcons from "./Draft/ThirdEditorIcons";
import FourthEditorIcons from "./Draft/FourthEditorIcons";
import { useEffect, useState } from "react";

const MenuBar = ({ setDetails, id, value }: any) => {
  const [showColor, setShowColor] = useState(false);
  const { editor } = useCurrentEditor();
  if (editor) {
    const html = editor.getHTML();
    setDetails(html);
  }

  useEffect(() => {
    if (id) {
      editor?.commands.setContent(value);
    }
  }, [value]);

  return (
    <div className="w-full">
      {showColor ? (
        <div className="flex flex-row justify-center lg:justify-end items-center gap-1 py-2">
          {[
            "#ffde59",
            "#8c52ff",
            "#0cc0df",
            "#004aad",
            "#ff3131",
            "#00bf63",
            "#5e17eb",
            "#545454",
            "#958DF1",
            "#fff",
            "#000",
          ].map((color, index) => (
            <div
              style={{ backgroundColor: color }}
              key={index}
              onClick={() => editor?.chain().focus().setColor(color).run()}
              className={`prose w-8 h-8 cursor-pointer border-2`}
            />
          ))}
        </div>
      ) : (
        <div className={`w-8 h-8 cursor-pointer`} />
      )}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-2 border-b-2">
        <FirstEditorIcons editor={editor} />
        <SecondEditorIcons editor={editor} />
        <ThirdEditorIcons
          editor={editor}
          setShowColor={setShowColor}
          showColor={showColor}
        />
        <FourthEditorIcons editor={editor} />
      </div>
    </div>
  );
};

const extensions: any = [
  Document,
  Paragraph,
  Text,
  Heading,
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  Underline.configure({
    HTMLAttributes: {
      class: "my-custom-class",
    },
  }),
  TextStyle.configure({}),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
];

const Editor = ({ items, name, value, setDesc, id }: any) => {
  const content = "";
  const [details, setDetails] = useState("");
  const handleSave = () => {
    console.log("The description message is ", details);
    setDesc({ ...items, [name]: details });
  };

  return (
    <div className="mt-5 bg-[#444] min-h-auto flex flex-col justify-center lg:justify-start items-center gap-3 py-10 ">
      <div className="bg-white min-w-[80%] prose dark:prose-slate border-2 border-[#555] p-2  prose-pre:bg-black text-black rounded-md">
        <EditorProvider
          slotBefore={
            <MenuBar
              id={id}
              setDesc={setDesc}
              items={items}
              name={name}
              value={value}
              setDetails={setDetails}
            />
          }
          extensions={extensions}
          content={content}
          children={undefined}
        />
      </div>
      {/* <div className="prose w-full bg-white">{parser(desc)}</div> */}
      <div className="text-sm">
        Please, make sure to save before you {id ? "Edit" : "Publish"}
      </div>
      <div
        onClick={handleSave}
        className=" cursor-pointer bg-blue-800 min-w-[70%] lg:w-[50%] py-2 px-3 font-bold text-center rounded-md"
      >
        SAVE
      </div>
    </div>
  );
};

export default Editor;
