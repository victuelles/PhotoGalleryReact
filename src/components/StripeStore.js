import React, { Component } from 'react';
import StorePresentation from './StorePresentation'
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
       return(<StorePresentation allPhotos={this.state.allPhotos} 
        setActiveAlbum={this.setActiveAlbum} 
        activeAlbum={this.state.activeAlbum}
          />) 
    }
}
 
export default StripeStore;