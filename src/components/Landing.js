import React from 'react';
import Background from '../images/welcome-bg.png';
import People from '../images/icon_people_circle.png';
import Navigation from './Navigation'
import Feature1 from '../images/welcome-img.png';
import Feature2 from '../images/salsa_champs.jpg';
import Feature3 from '../images/feature_rewards.png';
import Feature4 from '../images/feature_purchase.png';
import TechLogo from '../images/icon_deep_technology.png'
import * as routes from '../constants/routes'
import VideoIntro from './VideoIntro'

const Landing = () => 
<div>
<Navigation />
<section className="wellcome_area clearfix" id="home">
        <div className="container h-100">
            <div className="row h-100 align-items-center">
                <div className="col-12 col-md">
                    <div className="wellcome-heading">
                        <h2>Event photos</h2>
                        <h3>Ep</h3>
                        <p>Everything You Need. To Start Selling Online Beautifully</p>
                    </div>
                    <div className="get-start-area">
                      
                        <form action="#" method="post" className="form-inline">
                            <input type="email" className="form-control email" placeholder="name@company.com" />
                            <input type="submit" className="submit" value="Get Started"/>
                        </form>
                       
                    </div>
                </div>
            </div>
        </div>
        
        <div className="welcome-thumb wow fadeInDown" data-wow-delay="0.5s">
            <img src={Feature2} alt="" />
        </div>
    </section>
</div>

 
export default Landing;