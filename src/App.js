import React, { Component } from 'react'
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import ParticlesBg from 'particles-bg'
import './App.css';


const returnClarifaiRequest = (imageUrl) => {

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  // In this section, we set the user authentication, user and app ID, model details, and the URL
  // of the image we want as an input. Change these strings to run your own example.
  //////////////////////////////////////////////////////////////////////////////////////////////////

  // Your PAT (Personal Access Token) can be found in the Account's Security section
  const PAT = '333530e44a694033b6efb5108ece22f7';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'jackosei';
  const APP_ID = 'face-detection-app';
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'face-detection';
  const IMAGE_URL = imageUrl;
  // console.log(imageUrl)
  ///////////////////////////////////////////////////////////////////////////////////
  // YOU DO NOT NEED TO CHANGE ANYTHING BELOW THIS LINE TO RUN THIS EXAMPLE
  ///////////////////////////////////////////////////////////////////////////////////

  const raw = JSON.stringify({
    "user_app_id": {
      "user_id": USER_ID,
      "app_id": APP_ID
    },
    "inputs": [
      {
        "data": {
          "image": {
            "url": IMAGE_URL
          }
        }
      }
    ]
  });

  const requestOptions = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Key ' + PAT
    },
    body: raw
  };

  return requestOptions
}




class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      user: '',
    }
  }

  calculateFaceLocation = (regions) => {
    let bTopRow, bLeftCol, bBottomRow, bRightCol;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    // regions.forEach(region => {
    //   // Accessing and rounding the bounding box values
    //   const boundingBox = region.region_info.bounding_box;
    //   console.log(boundingBox);
    //   bTopRow = boundingBox.top_row.toFixed(3);
    //   bLeftCol = boundingBox.left_col.toFixed(3);
    //   bBottomRow = boundingBox.bottom_row.toFixed(3);
    //   bRightCol = boundingBox.right_col.toFixed(3);

    //   region.data.concepts.forEach(concept => {
    //     // Accessing and rounding the concept value
    //     const name = concept.name;
    //     const value = concept.value.toFixed(4);

    //     console.log(`${name}: ${value} BBox: ${bTopRow}, ${bLeftCol}, ${bBottomRow}, ${bRightCol}`)
    //   });
    // });
    // const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box


    const boundingBox = regions[0].region_info.bounding_box;
    // console.log(boundingBox);
    bTopRow = boundingBox.top_row.toFixed(3);
    bLeftCol = boundingBox.left_col.toFixed(3);
    bBottomRow = boundingBox.bottom_row.toFixed(3);
    bRightCol = boundingBox.right_col.toFixed(3);




    return {
      leftCol: bLeftCol * width,
      topRow: bTopRow * height,
      rightCol: width - (bRightCol * width),
      bottomRow: height - (bBottomRow * height)
    };

    // return {
    //   leftCol: bLeftCol,
    //   topRow: bTopRow,
    //   rightCol: width,
    //   bottomRow: height
    // };
  };


  displayFaceBox = (box) => box && Object.keys(box).length > 0 ?
    this.setState({ box }) :
    console.log('No face detected.'); // Handle no face detected case


  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input })

    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", returnClarifaiRequest(this.state.input))
      .then(response => response.json())
      .then(result => {
        const regions = result.outputs[0].data.regions
        // console.log(regions)

        this.displayFaceBox(this.calculateFaceLocation(regions))
      })
      .catch(error => console.log('error', error))
  }

  render() {
    return (
      <div className="App">
        <ParticlesBg type="lines" num={7} bg={true} />
        <Navigation />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
