import React from 'react';
import css from './ImageGallery.module.css';
import Loader from '../Loader';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';

const API_KEY = '33501552-afbd1499da91adc0272ece80b';
const PER_PAGE = 12;

class ImageGallery extends React.Component {
  state = {
    images: null,
    error: null,
    status: 'idle',
    page: 1,
    lastPage: false,
  };

  onLoadMoreHandler = async () => {
    await this.setState(prevState => {
      return { page: prevState.page + 1 };
    });

    fetch(
      `https://pixabay.com/api/?key=${API_KEY}&q=${this.props.imageName}&per_page=${PER_PAGE}&page=${this.state.page}`
    )
      .then(res => res.json())
      .then(images =>
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          status: 'resolved',
          lastPage: images.totalHits <= PER_PAGE * this.state.page,
        }))
      )
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;

    if (prevName !== nextName) {
      await this.setState({ status: 'pending', page: 1 });
      fetch(
        `https://pixabay.com/api/?key=${API_KEY}&q=${nextName}&per_page=${PER_PAGE}&page=${this.state.page}`
      )
        .then(res => res.json())
        .then(images =>
          this.setState({
            images: images.hits,
            status: 'resolved',
            lastPage: images.totalHits <= PER_PAGE * this.state.page,
          })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  render() {
    const { images, status } = this.state;

    if (status === 'idle') {
      return <div>Enter image name...</div>;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return (
        <p className={css['error-text']}>
          There are no {this.props.imageName} images
        </p>
      );
    }

    if (status === 'resolved') {
      return (
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
          {this.state.images.length && !this.state.lastPage ? (
            <Button onClickHandler={this.onLoadMoreHandler} />
          ) : undefined}
        </>
      );
    }
  }
}

export default ImageGallery;
