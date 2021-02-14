import React, { useState } from "react"

import "react-responsive-carousel/lib/styles/carousel.min.css" // requires a loader
import "./App.css"
import { Carousel } from "react-responsive-carousel"
import ReactPlayer from "react-player"

function App() {
  const [playing, setPlaying] = useState(true)
  const [started, setIsStarted] = useState(false)
  const [retries, setRetries] = useState(0)

  let startPlayingTimeout = null
  const images = [
    "http://jpcamara.com/wp-content/uploads/2015/02/carousel.jpg",
    "https://i2.wp.com/www.clixmarketing.com/blog/wp-content/uploads/2018/07/chuhan-z-685734-unsplash.jpg",
  ]

  const setRestartTimer = () => {
    startPlayingTimeout = null
    startPlayingTimeout = setTimeout(() => {
      console.log("restartTimer", started, retries)
      if (!started && retries < 2) {
        setPlaying(false)
        setTimeout(() => {
          setPlaying(true)
        }, 100)

        setRetries(retries + 1)
        setRestartTimer()
      }
    }, 500)
  }
  const onReady = () => {
    console.log("onReady")
    setPlaying(true)
    setRestartTimer()
  }
  const onStart = () => {
    console.log("on start")
    setIsStarted(true)
    startPlayingTimeout && clearTimeout(startPlayingTimeout)
    startPlayingTimeout = null
  }

  const onError = (e) => {
    console.log("onError", e)
    // setPlaying(true)
  }
  const setRef = (ref) => {
    console.log("ref", ref)
  }
  console.log("Vishal playing", playing)
  const createCarouselItemImage = (index, options = {}) => (
    <div key={index}>
      {index === 0 ? (
        <ReactPlayer
          ref={setRef}
          url="https://player.vimeo.com/510204318"
          width="100%"
          height="100%"
          controls={false}
          playsinline={true}
          playing={playing}
          loop={true}
          onReady={onReady}
          onStart={onStart}
          muted={true}
          config={{
            vimeo: {
              url: "https://player.vimeo.com/510204318",
              autoplay: true,
              controls: false,
            },
          }}
        />
      ) : (
        <img src={images[index]} />
      )}
    </div>
  )
  const baseChildren = <div>{[0, 1].map(createCarouselItemImage)}</div>
  return (
    <div className="App">
      <Carousel renderThumbs={() => null}>
        {baseChildren.props.children}
      </Carousel>
    </div>
  )
}

export default App
