import React, { useMemo } from "react";
import { createEditor } from "slate";
import { Slate, Editable, withReact } from "slate-react";

const Editor = ({ title, value, saveStory, setTitle, setValue }) => {
  const editor = useMemo(() => withReact(createEditor()), []);
  return (
    <div className="w-full">
      <input
        className="border-b w-full font-medium text-3xl text-gray-700 outline-none "
        placeholder="Title"
        value={title}
        onChange={value => setTitle(value.target.value)}
      />
      <div
        style={{ height: "500px" }}
        className="border border-gray-500 rounded-lg p-5 mt-5 overflow-auto"
      >
        <Slate
          editor={editor}
          value={value}
          onChange={value => setValue(value)}
        >
          <Editable spellCheck autoFocus />
        </Slate>
      </div>
    </div>
  );
};

export default Editor;
