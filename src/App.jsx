import { Component } from 'react';
import fetchApi from 'components/API';
import Searchbar from 'components/Searchbar/Searchbar';
import { Layout } from 'App.styled';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import { toast, Toaster } from 'react-hot-toast';

export default class App extends Component {
  state = {
    query: '',
    page: 1,
    images: null,
    imagesOnPage: 0,
    totalImages: 0,
    currentImageUrl: null,
    currentImageTag: null,
    isLoading: false,
    showModal: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState(({ isLoading }) => ({ isLoading: !isLoading }));
      fetchApi(query, page)
        .then(({ hits, totalHits }) => {
          const array = hits.map(hit => ({
            id: hit.id,
            tag: hit.tags,
            smallImage: hit.webformatURL,
            largeImage: hit.largeImageURL,
          }));

          if (!totalHits) {
            toast.error(`Sorry,but there is not any data for ${query}`);
          }

          return this.setState(({ images, imagesOnPage }) => {
            return {
              images: [...images, ...array],
              imagesOnPage: array.length + imagesOnPage,
              totalImages: totalHits,
            };
          });
        })
        .catch(error => this.setState({ error }))
        .finally(() =>
          this.setState(({ isLoading }) => ({ isLoading: !isLoading }))
        );
    }
  }

  getResult = query => {
    this.setState({
      query,
      page: 1,
      images: [],
      imagesOnPage: 0,
    });
  };

  onLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  onToggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  onOpenModal = event => {
    const currentImageUrl = event.target.dataset.large;
    const currentImageTag = event.target.alt;

    this.setState(({ showModal }) => ({
      showModal: !showModal,
      currentImageUrl: currentImageUrl,
      currentImageTag: currentImageTag,
    }));
  };

  render() {
    const {
      images,
      imagesOnPage,
      totalImages,
      currentImageUrl,
      currentImageTag,
      isLoading,
      showModal,
    } = this.state;

    const getResult = this.getResult;
    const onLoadMore = this.onLoadMore;
    const onOpenModal = this.onOpenModal;
    const onToggleModal = this.onToggleModal;

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
}
