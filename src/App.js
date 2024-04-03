import React, { Component } from 'react'
import Navigation from './components/Navigation/Navigation'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import Rank from './components/Rank/Rank'
import SignIn from './components/SignIn/SignIn'
import Register from './components/Register/Register'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import ParticlesBg from 'particles-bg'
import './App.css';


const returnClarifaiRequest = (imageUrl) => {

  // Your PAT (Personal Access Token) can be found in the Account's Security section
  const PAT = '333530e44a694033b6efb5108ece22f7';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'jackosei';
  const APP_ID = 'face-detection-app';
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'face-detection';
  const IMAGE_URL = imageUrl;

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
      route: 'signin'
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

  onRouteChange = (route) => {
    this.setState({ route: route })
  }

  render() {
    // destructure this.state to avoid repeatition
    const { onButtonSubmit, onInputChange, onRouteChange, state } = this
    const { route, box, imageUrl } = state

    return (
      <div className="App">
        <ParticlesBg type="lines" num={7} bg={true} />
        <Navigation routeStatus={route} onRouteChange={onRouteChange} />
        {
          route === 'home' ?
            <>
              <Rank />
              <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </>
            : (
              route === 'signin'
                ? <SignIn onRouteChange={onRouteChange} />
                : <Register onRouteChange={onRouteChange} />
            )

        }
      </div >
    );
  }
}

export default App;
