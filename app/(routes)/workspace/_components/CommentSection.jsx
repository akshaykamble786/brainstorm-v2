"use client";
import { useThreads } from "@liveblocks/react";
import React from "react";
import { Composer, Thread } from "@liveblocks/react-ui";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function CommentBox({children}) {
  const { threads } = useThreads();

  return (
    <Popover>
      <PopoverTrigger>
        {children}
      </PopoverTrigger>
      <PopoverContent className={"h-[350px] w-[350px] overflow-y-auto overflow-x-auto"}>
        {threads?.map((thread) => (
          <Thread key={thread.id} thread={thread} />
        ))}
        <Composer className="z-10">
          <Composer.Submit className="btn-primary h-[350px]" style={{ color: "#030014" }}>
            Reply
          </Composer.Submit>
        </Composer>
      </PopoverContent>
    </Popover>
  );
}

export default CommentBox;
