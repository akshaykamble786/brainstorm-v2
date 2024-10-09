import CoverPicker from "@/app/_components/CoverPicker";
import Image from "next/image";
import React, { useState } from "react";

const DocumentInfo = () => {
    const [coverImage, setCoverImage] = useState("/cover.png")
    return(
        <div>
            <CoverPicker setNewCover={(v) => setCoverImage(v)}>
            <div className='relative group cursor-pointer'>
            <h2 className='hidden absolute p-4 w-full h-full items-center justify-center group-hover:flex'>
              Change Cover
            </h2>
            <div className='group-hover:opacity-40'>
              <Image src={coverImage} width={400} height={400} className='w-full h-[180px] object-cover' alt='cover image' />
            </div>
          </div>
            </CoverPicker>
        </div>
    )
}

export default DocumentInfo;