import React from 'react';
import Checkout from './Checkout'
import {Media,Row,Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,Badge } from 'reactstrap';
const AlbumHeader = (props) => {
   
    console.log("AlbumCard",props.card)
    const setActive=(e)=>{
        e.preventDefault();
        console.log("row clicked",props.album);
        props.setActiveAlbum(null);
        /* album "details" : {
          "date" : "June 15,2017",
          "description" : "Fundraising for DCANC",
          "no_of_photos" : "100",
          "location" : "Convention center,SSF",
          "time" : "5pm-1a,",
          "title" : "Dagupan Induction Party 2017",
          "photo" :"https://firebasestorage.googleapis.com/v0/b/contentether.appspot.com/o/images%2F20181225_DAGUPENOS%2FDSC00789.jpg?alt=media&token=c9baaef5-aa31-4bc4-ac08-abee3c094457"
       */
    }
    return (
         <Row style={{
            position: 'relative',
            padding: '1em 1em 1em',
            border: '1px solid #d8d8d8',
            margin: '0.5rem 0' }} >
          
            <Col sm="4" xs="12" >
            
            <Card onClick={setActive}> 
           
             <CardImg top width="100%" src={props.card.photo}/>
             <Button color="info" size="md" onClick={setActive}> Go Back</Button>
           </Card>
            </Col>
            <Col sm="8" xs="12" >
                <div  key={props.card.filename}   >
                    <CardBody>
                        <CardTitle>{props.card.title}</CardTitle>
                        <CardText>{props.card.description}</CardText>
                        <Checkout
                            name={props.card.title}
                            description={props.card.description}
                            amount={1}
                        /> {' '}
                        <Button color="secondary" size="md" outline disabled>Download link</Button>
                        {' '} <span style={{paddingLeft:"10px"}}>
                        Photos: <Badge color="secondary" pill>{props.card.no_of_photos}</Badge>
                        </span>
                            
                    </CardBody>
                </div>
            </Col>
        </Row>

   
    
    )
}
 
export default AlbumHeader