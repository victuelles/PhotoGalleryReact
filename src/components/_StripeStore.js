import React, { Component } from 'react';
import Checkout from './Checkout'
import './Landing.css';
import myData from '../constants/mockdata.json'
import {Container,Row,Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button,Badge } from 'reactstrap';
  
  
  
class StripeStore extends Component {
    state={}
    componentDidMount() {  
        const data = myData;
        this.setState( data );
        console.log("componentDidMount",data);
    }
    clickHandler(e){
       // e.preventDefault();
       
        const o=e.currentTarget;
        console.log("clickHandler", o.getAttribute('data-item'))
       
      
    }
    render() {
     //   console.log("render",this.state);
        let events={};
        const objReturn = Object.keys(this.state).map((content, idx) => {
            const item =this.state[content];
            console.log(content," item= ",item);
            console.log(" item= ",item.details);

            return (
                <Col sm="6" key={content} >
                    <Card onClick={this.clickHandler} id="item" data-item={content}  >
                        <CardImg top width="100%" src={item.details.photo}/>
                        <CardBody>
                            <CardTitle>{item.details.title}</CardTitle>
                            <CardText>{item.details.description}</CardText>
                           
                            <Checkout
                            name={item.details.title}
                            description={item.details.description}
                            amount={1}
                        /> {' '}
                        <Button color="secondary" size="md" outline disabled>Download link</Button>
                        {' '} <span style={{paddingLeft:"60px"}}>
                        Photos: <Badge color="secondary" pill>{item.details.no_of_photos}</Badge>
                        </span>
                        </CardBody>
                    </Card>
                </Col>
            )
          
        })
       
        return ( 
        <Container >
            <Row style={{padding:"10px"}}>
                {objReturn}
            </Row>
        </Container>
    
    )
}
}
export default StripeStore