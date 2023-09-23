import React from "react";

export const ImageGalleryItem = ({src, alt, largeImageURL, openModal}) => {
   
    return (
        <li onClick={() => openModal(largeImageURL)}>
       <img src={src} 
            alt={alt} 
            width={320} 
            height={240}/>
    </li>
    )
}

