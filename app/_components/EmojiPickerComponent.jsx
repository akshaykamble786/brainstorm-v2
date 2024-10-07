import EmojiPicker from 'emoji-picker-react'
import React, { useState } from 'react'

const EmojiPickerComponent = ({ children, setEmojiIcon }) => {
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

    return (
        <div>
            <div onClick={()=>setOpenEmojiPicker(!openEmojiPicker)}>
                {children}
            </div>
            {openEmojiPicker &&
            <div className='absolute z-10'>
                <EmojiPicker onEmojiClick={(e)=>{
                    setEmojiIcon(e.emoji);
                    setOpenEmojiPicker(false);
                    }} 
                />
            </div>
            }
        </div>
    )
}

export default EmojiPickerComponent