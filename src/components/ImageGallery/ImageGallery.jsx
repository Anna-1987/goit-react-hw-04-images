import React from "react"; 
import css from './Gallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({images, openModal}) => (

<ul className = {css.gallery}>
{images.map(({ id, webformatURL, tags, largeImageURL }) => {
  return (
    <ImageGalleryItem
      key={id}
      src={webformatURL}
      alt={tags}
      largeImageURL={largeImageURL}
      openModal={openModal} />
  );
})}
</ul>
)

