import React from "react";
import DocumentCard from "./DocumentCard";

const Document = () => {
  return (
    <div className="bg-black w-full min-h-screen px-4 py-8">
        <div className="border-b font-semibold text-2xl text-white my-2 text-[12px] sm:text-[16px]">
          Settings / <span className="opacity-80">Documents</span>
        </div>
        <DocumentCard />
    </div>
  );
};

export default Document;
