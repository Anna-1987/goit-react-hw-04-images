import { useState, useEffect} from "react";
import { fetchImages } from "./ServerAPI/ServerAPI";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Loader } from "./Loader/Loader";
import { animateScroll } from 'react-scroll';
import { Button } from "./Button/Button";
import { Modal } from "./Modal/Modal";

export function App () {

    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const per_page = 12;
    //const [id,setId] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadMore, setLoadMore] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [largeImageURL, setLargeImageURL] = useState('largeImageURL');

  useEffect(() => {
      createImages(searchQuery, page);
  }, [searchQuery, page]);


  const createImages = async (q, page) => {
    if (!q) {
      return;
    }
    setLoading(true);

    try {
      const { hits, totalHits } = await fetchImages(q, page);
      if(hits.length === 0){
        return alert ('Sorry, nothing found');
      }
      setImages(images => [...images, ...hits]);
      setLoadMore(page < Math.ceil(totalHits / per_page));
    } catch (error) {
      setError({error});
    } finally {
      setLoading(false);
    }
  };


 const formSubmit = searchQuery => {
      setSearchQuery(searchQuery);
      setImages([]);
      setPage(1);
      setLoadMore(false);
  };
 
  const onloadMore = () => {
     setLoading(true);
     setPage(page + 1);
     scrollOnMoreButton();
  };

  const scrollOnMoreButton = () => {
    animateScroll.scrollToBottom({
      duration: 1000,
      delay: 10,
      smooth: 'linear',
    });
  };

 const openModal = largeImageURL => {
      setShowModal(true);
      setLargeImageURL(largeImageURL);
  };

  const closeModal = () => {
      setShowModal(false);
  };
  

   // const { error, images, loading, loadMore, page, largeImageURL, showModal} = this.state
  return (
    <div
      style={{
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101'
      }}
    >
      {error && <h1>{error}</h1>}
     <Searchbar onSubmit={formSubmit} />

      {loading ? ( 
      <Loader />
       ) : (
        <ImageGallery images={images} openModal={openModal} />
       )}
     {loadMore && <Button onloadMore={onloadMore} page={page}/>}

     {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={closeModal} />
        )}
    </div>

    
  );
    }

