import React from 'react';
import Checkout from './Checkout'
import {Col, Card, CardImg, CardText, CardBody,
    CardTitle, Button,Badge } from 'reactstrap';
const AlbumRow = (props) => {
    const setActive=(e)=>{
        e.preventDefault();
        console.log("row clicked",props.album);
        props.setActiveAlbum(props.album);
       
    }
//console.log("AlbumRow",props.album)

    return (
        <Col sm="4" key={props.album.key} style={{paddingTop:"20px"}} >
            <Card onClick={setActive}  key={props.album.key}  >
                <CardImg top width="100%" src={props.album.details.photo}/>
                <CardBody>
                    <CardTitle>{props.album.details.title}</CardTitle>
                    <CardText>{props.album.details.date} {'  ...  '} 
                 {props.album.details.photoCount} photos</CardText>
                </CardBody>
            </Card>
        </Col>

   
    
    )
}
 
export default AlbumRow