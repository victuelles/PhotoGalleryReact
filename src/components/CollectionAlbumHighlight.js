import React from 'react';
import CollectionAlbumGallery from './CollectionAlbumGallery'
import {Media,Row,Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,Badge } from 'reactstrap';
const AlbumHeader = (props) => {
   
    console.log("AlbumCard",props.album)
    const setActive=(e)=>{
        e.preventDefault();
        console.log("row clicked",props);
        props.setActiveAlbum(null);
     }
     let activeComponent=null;
     if(props.album){
        // user clicked an album, show the contents of it
          console.log(" activeAlbum props",props.activeAlbum)
           const objReturn =
                 <CollectionAlbumGallery album={props.album} images={[]} />
           
                 activeComponent=objReturn;
                
     }
    return (
        
        <Row>
            <Col sm="3" lg="3" md="3" xs="12" style={{paddingTop:"10px"}}>
                <Button onClick={setActive}>  Back </Button>
                <Card > 
                    <CardImg top width="100%" src={props.album.details.photo}/>
                    <CardTitle>{props.album.details.title}</CardTitle>
                    <CardText>{props.album.details.date} {'  ...  '} 
                 {props.album.details.photoCount} photos</CardText>
                </Card>
            </Col>
            <Col sm="9" lg="9" md="9" xs="12" style={{paddingTop:"10px"}}>
            {activeComponent} 
            </Col>
        </Row>

   
    
    )
}
 
export default AlbumHeader