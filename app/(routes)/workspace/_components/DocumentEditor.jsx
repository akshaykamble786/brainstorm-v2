import React, { useState } from "react";
import DocumentHeader from "./DocumentHeader";
import DocumentInfo from "./DocumentInfo";
import RichTextEditor from "./RichTextEditor";
import { Loader2Icon } from "lucide-react";
import { AdvancedEditor } from "@/components/editor/advanced-editor";
import { ClientSideSuspense } from "@liveblocks/react/suspense";

const DocumentEditor = ({ params }) => {
  const [charsCount, setCharsCount] = useState(0);

  return (
    <div className="relative">
      <DocumentHeader />
      <DocumentInfo params={params} charsCount={charsCount} />
      <div className="grid grid-cols-4">
        <div className="col-span-3">
          {/* <RichTextEditor params={params} /> */}
          <ClientSideSuspense fallback={<Loader2Icon className="animate-spin"/>}>
            <AdvancedEditor setCharsCount={setCharsCount} />
          </ClientSideSuspense>
        </div>
      </div>
    </div>
  );
};

export default DocumentEditor;
