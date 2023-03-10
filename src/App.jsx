import { useState, useEffect } from 'react';
import fetchApi from 'components/API';
import Searchbar from 'components/Searchbar/Searchbar';
import { Layout } from 'App.styled';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import { toast, Toaster } from 'react-hot-toast';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState(null);
  const [imagesOnPage, setImagesOnPage] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentImageTag, setCurrentImageTag] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }

    setIsLoading(true);

    fetchApi(query, page)
      .then(({ hits, totalHits }) => {
        const array = hits.map(hit => ({
          id: hit.id,
          tag: hit.tags,
          smallImage: hit.webformatURL,
          largeImage: hit.largeImageURL,
        }));

        setTotalImages(totalHits);

        if (!totalHits) {
          toast.error(`Sorry,but there is not any data for ${query}`);
          return;
        } else {
          setImages(prevState => [...prevState, ...array]);
          setImagesOnPage(prevState => prevState + array.length);
        }
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, [query, page, error]);

  const getResult = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
    setImagesOnPage(0);
  };

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const onToggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const onOpenModal = event => {
    const currentImageUrl = event.target.dataset.large;
    const currentImageTag = event.target.alt;

    return (
      setShowModal(!showModal),
      setCurrentImageUrl(currentImageUrl),
      setCurrentImageTag(currentImageTag)
    );
  };

  return (
    <Layout>
      <Toaster position="top-right" toastOptions={{ duration: 1500 }} />
      <Searchbar onSearch={getResult} />
      {isLoading && <Loader />}
      {images && <ImageGallery images={images} openModal={onOpenModal} />}
      {imagesOnPage >= 12 && imagesOnPage < totalImages && (
        <Button onLoadMore={onLoadMore} />
      )}
      {showModal && (
        <Modal
          onClose={onToggleModal}
          currentImageUrl={currentImageUrl}
          currentImageTag={currentImageTag}
        />
      )}
    </Layout>
  );
}
