import React from 'react';
import css from './ImageGallery.module.css';
import Loader from '../Loader';
import ImageGalleryItem from './ImageGalleryItem';
import Button from '../Button';
import { getImages } from 'services/api';

const PER_PAGE = 12;

class ImageGallery extends React.Component {
  state = {
    images: null,
    error: null,
    status: 'idle',
    page: 1,
    buttonVisible: false,
  };

  onLoadMoreHandler = async () => {
    await this.setState(prevState => {
      return { page: prevState.page + 1 };
    });

    try {
      const images = await getImages(this.props.imageName, this.state.page);
      this.setState(prevState => ({
        images: [...prevState.images, ...images.hits],
        status: 'resolved',
        buttonVisible:
          images.hits.length && images.totalHits >= PER_PAGE * this.state.page,
      }));
    } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;

    if (prevName !== nextName) {
      await this.setState({ status: 'pending', page: 1 });
      try {
        const images = await getImages(this.props.imageName, this.state.page);
        this.setState(prevState => ({
          images: images.hits,
          status: 'resolved',
          buttonVisible:
            images.hits.length &&
            images.totalHits >= PER_PAGE * this.state.page,
        }));
      } catch (error) {
        this.setState({ error, status: 'rejected' });
      }
    }
  }

  render() {
    const { images, status } = this.state;

    return (
      <>
        {status === 'idle' && <div>Enter image name...</div>}
        {status === 'pending' && <Loader />}{' '}
        {status === 'rejected' && (
          <p className={css['error-text']}>
            There are no {this.props.imageName} images
          </p>
        )}
        {status === 'resolved' && (
          <>
            <ul className={css.gallery}>
              {images.map(image => (
                <ImageGalleryItem
                  key={image.id}
                  smallImage={image.webformatURL}
                  largeImage={image.largeImageURL}
                />
              ))}
            </ul>
            {this.state.buttonVisible && (
              <Button onClickHandler={this.onLoadMoreHandler} />
            )}
          </>
        )}
      </>
    );
  }
}

export default ImageGallery;
