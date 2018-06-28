import React, { Component } from 'react';
import StorePresentation from './StorePresentation'

import ReactGA from 'react-ga';

ReactGA.initialize('UA-121414075-1');
ReactGA.pageview(window.location.pathname + window.location.search);

class StripeStore extends Component {
    state= {}

    componentDidMount() {
        console.log("componentDidMount",this.state)
      this.fetchPhotoData();

      this.setState({activeAlbum:null});
    }
  
    fetchPhotoData=()=>{
      fetch('/mockdata.json')
      .then(rsp => rsp.json())
      .then(allPhotos =>{
       // console.log(allPhotos)
        this.allPhotos=allPhotos
         this.setState({allPhotos});
       
      })
    }
    setActiveAlbum =(album)=>{
        console.log("setActiveAlbum =",album)
        this.setState({activeAlbum:album});
    
      }


    render() { 
       // console.log("state",this.state)
       return(
        <section className="wellcome_area2 clearfix" id="home">
          <div className="container h-100" style={{paddingTop:"120px"}}>
            <StorePresentation allPhotos={this.state.allPhotos} 
              setActiveAlbum={this.setActiveAlbum} 
              activeAlbum={this.state.activeAlbum}
              />
          </div>
        </section>
        ) 
    }
}
 
export default StripeStore;