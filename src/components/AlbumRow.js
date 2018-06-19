import React from 'react';
import Checkout from './Checkout'
import {Container,Row,Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,Badge } from 'reactstrap';
const AlbumRow = (props) => {
    const setActive=(e)=>{
        e.preventDefault();
        console.log("row clicked",props.album);
        props.setActiveAlbum(props.album);
       
    }
   // console.log("AlbumRow",props.album)

    return (
        <Col sm="4" key={props.album.key} >
            <Card onClick={setActive}  key={props.album.key}  >
                <CardImg top width="100%" src={props.album.details.photo}/>
                <CardBody>
                    <CardTitle>{props.album.details.title}</CardTitle>
                    <CardText>{props.album.details.description}</CardText>
                
                    <Checkout
                    name={props.album.details.title}
                    description={props.album.details.description}
                    amount={1}
                /> {' '}
                <Button color="secondary" size="md" outline disabled>Download link</Button>
                {' '} <span style={{paddingLeft:"60px"}}>
                Photos: <Badge color="secondary" pill>{props.album.details.no_of_photos}</Badge>
                </span>
                </CardBody>
            </Card>
        </Col>

   
    
    )
}
 
export default AlbumRow