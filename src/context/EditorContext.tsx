import { createContext, useContext, useState } from "react";

type ContextType = {
  editorMsg: string;
  setEditorMsg: React.Dispatch<React.SetStateAction<string>>;
};

type ContextProps = {
  children: React.ReactNode;
};

const EditorContext = createContext({} as ContextType);

export const EditorContextProvider = ({ children }: ContextProps) => {
  const [editorMsg, setEditorMsg] = useState("");
  
  return (
    <EditorContext.Provider
      value={{ editorMsg: editorMsg, setEditorMsg: setEditorMsg }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export const useEditorContext = () => {
  return useContext(EditorContext);
};
