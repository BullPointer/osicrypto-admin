import { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import ResizeModule from "@botom/quill-resize-module";

type QuillEditorPropTypes = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const QuillEditor = ({ value, setValue }: QuillEditorPropTypes) => {
  Quill.register("modules/resize", ResizeModule);
  // Quill.register("modules/imageResize", ImageResize);

  const modules = {
    resize: {
      locale: {
        // change them depending on your language
        altTip: "Hold down the alt key to zoom",
        floatLeft: "Left",
        floatRight: "Right",
        center: "Center",
        restore: "Restore",
      },
    },
    toolbar: [
      [{ alingTools: false }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
    // imageResize: {
    //   parchment: Quill.import("parchment"),
    //   modules: ["Resize", "DisplaySize", "Toolbar"],
    //   displaySize: true,
    // },
  };

  return (
    <div className="py-10  ">
      <ReactQuill
        className="min-h-[500px] text-[#000;] bg-[#fff;]"
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
      />
      {/* <div className="" dangerouslySetInnerHTML={{ __html: value }} /> */}
    </div>
  );
};

export default QuillEditor;
