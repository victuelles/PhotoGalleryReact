import React from 'react';
import AlbumRow from './AlbumRow'
import AlbumCard from './AlbumCard'
import AlbumHeader from './AlbumHeader'
import {Container,Row,Col, CardColumns, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,Badge } from 'reactstrap';
const StorePresentation = (props) => {
    let activeComponent =null;
    let activeAlbumHeader=null;
    if(props.activeAlbum){
        // user clicked an album, show the contents of it
        //   console.log(" activeAlbum props",props.activeAlbum)
            const objReturn = Object.keys(props.activeAlbum.files).map((idx) => {
                const item =props.activeAlbum.files[idx];
                item.key=item.filename;
                return <AlbumCard card={item}  key={item.key}  setActiveAlbum={props.setActiveAlbum}   />
            });
            //activeComponent=objReturn;
            activeComponent=<CardColumns>{objReturn}</CardColumns>

           
       
        activeAlbumHeader =<AlbumHeader card={props.activeAlbum.details}  setActiveAlbum={props.setActiveAlbum}   />
            
         
     } else if(props.allPhotos){
        //   show all Albums
        const objReturn = Object.keys(props.allPhotos).map((content, idx) => {
            const item =props.allPhotos[content];
            item.key=content;
            return <AlbumRow album={item}  key={item.key}  setActiveAlbum={props.setActiveAlbum}  />
        });
        activeComponent=objReturn;
    }


    return (
        <div className="container-fluid">
             <div className="row" style={{paddingTop:'30px'}}>
             {activeAlbumHeader} 
            {activeComponent} 
            </div >
        </div>
    )
}
 
export default StorePresentation;