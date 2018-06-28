import React from 'react';
import Feature2 from '../images/salsa_champs.png';
import AboutPage from './About'
import FeaturesPage from './FeaturesPage'
import VideoPage from './VideoPage'
import ReactGA from 'react-ga';

ReactGA.initialize('UA-121414075-1');
ReactGA.pageview(window.location.pathname + window.location.search);


const Landing = () => 
<div>

  <section className="wellcome_area clearfix" id="home">
        <div className="container h-100">
            <div className="row h-100 align-items-center">
                <div className="col-12 col-md">
                    <div className="wellcome-heading">
                        <h2>Event photos</h2>
                        <h3>Ep</h3>
                        <p>Everything You Need. To Start Selling Online Beautifully (UNDER CONSTRUCTION)</p>
                    </div>
                    <div className="get-start-area">
                      

                            <a href="/signin" className="submit">Get Started</a>
                       
                       
                    </div>
                </div>
            </div>
        </div>
        
        <div className="welcome-thumb wow fadeInDown" data-wow-delay="0.5s">
            <img src={Feature2} alt="" />
        </div>
    </section>
    <AboutPage />
    <FeaturesPage/>
    <VideoPage/>
</div>

 
export default Landing;