import React from 'react';
import {Button,Row,Col, Card, CardImg, CardText, CardBody } from 'reactstrap';
import {Badge,
        Nav,
        NavItem,
        NavLink,  
        UncontrolledDropdown,
        DropdownToggle,
        DropdownMenu,DropdownItem
        } from 'reactstrap';   
const AlbumRow = (props) => {
    const setActive=(e)=>{
        e.preventDefault();
        console.log("row clicked",props.album);
        props.setActiveAlbum(props.album);
       
    }
//console.log("AlbumRow",props.album)

    return (
        <Col sm="3" key={props.album.key} style={{paddingTop:"20px"}} >
            <Card   key={props.album.key}  >
                <CardImg top width="100%" src={props.album.details.photo} onClick={setActive}/>
                <CardBody>
                  <Row>
                    <Col sm="9">
                        <CardText>
                             {props.album.details.title}
                        </CardText>
                    </Col >
                     <Col sm="2">
                     <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav style={{padding:"0"}}>
                             <Button outline color="link"> <i className="fa fa-ellipsis-h"> </i> </Button>
                            </DropdownToggle>
                            <DropdownMenu right>
                              <DropdownItem>
                                <a ><i className="fa fa-pencil"> </i> Edit</a>
                              </DropdownItem>
                              <DropdownItem>
                                <NavItem>
                                <a ><i className="fa fa-trash"> </i> Delete</a>
                                </NavItem>
                              </DropdownItem>
                             
                            </DropdownMenu>
                          </UncontrolledDropdown>
                    </Col >
                   </Row>
                   <Row>
                        <Col sm="7">
                         <CardText color="primary">{props.album.details.date} </CardText>
                        </Col >
                        <Col sm="4">
                        <Badge> 
                            {props.album.details.photoCount} photos</Badge>
                        </Col >
                    </Row>
                 
                </CardBody>
            </Card>
        </Col>

   
    
    )
}
 
export default AlbumRow