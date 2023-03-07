import PropTypes from 'prop-types';
import { LiStyle, ImageStyle } from './ImageGalleryItem.styled';

export default function ImageGalleryItem({
  tag,
  smallImage,
  largeImage,
  openModal,
}) {
  return (
    <LiStyle onClick={openModal}>
      <ImageStyle src={smallImage} alt={tag} data-large={largeImage} />
    </LiStyle>
  );
}

ImageGalleryItem.prototype = {
  tag: PropTypes.string,
  smallImage: PropTypes.string.isRequired,
  largeImage: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
