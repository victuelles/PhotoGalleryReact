import React from 'react';
import VideoIntro from './VideoIntro'
import Background from '../images/video.jpg';
/*
const videoJsOptions = {
  autoplay: false,
  controls: true,
  sources: [{
    src: 'https://www.youtube.com/watch?v=f5BBJ4ySgpo',
    type: 'video/youtube'
  }]
}
*/

const videoJsOptions = {
    autoplay: false,
    controls: true,
    sources: [{
      src: 'https://firebasestorage.googleapis.com/v0/b/contentether.appspot.com/o/videos%2FDialect101_Intro_15sec.mp4?alt=media&token=038d72b6-a1f4-40cb-bdda-26e96f16df09',
      type: 'video/mp4'
    }]
  }

const VideoPage = () =>    
<div className="video-section">
<div className="container">
    <div className="row">
        <div className="col-12">
            <div className="video-area" style={{ backgroundImage: `url(${Background})`,}}>
                <div className="video-play-btn">
                

                </div>
            </div>
        </div>
    </div>
</div>
</div>
 
export default VideoPage;