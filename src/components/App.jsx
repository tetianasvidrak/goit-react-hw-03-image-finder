import React from 'react';
import SearchBar from './SearchBar';
import ImageGallery from './ImageGallery';

class App extends React.Component {
  state = {
    imageName: '',
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  render() {
    return (
      <div>
        <SearchBar onSubmit={this.handleFormSubmit} />
        <ImageGallery imageName={this.state.imageName} />
      </div>
    );
  }
}

export default App;
