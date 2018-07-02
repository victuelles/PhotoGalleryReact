import React from 'react';
import CollectionAlbumGallery from './CollectionAlbumGallery'
import {Media,Row,Col, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';
    import {Badge,
        Nav,
        NavItem,
        NavLink,  
        UncontrolledDropdown,
        DropdownToggle,
        DropdownMenu,DropdownItem
        } from 'reactstrap';  
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
                <Button color="primary" onClick={setActive}>  Back </Button>
                <Card > 
                    <CardImg top width="100%" src={props.album.details.photo}/>
                 
                        <Row>
                            <Col sm="9" style={{paddingTop:"10px"}}>
                                
                                    {props.album.details.title}
                                
                            </Col >
                            <Col sm="2">
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav style={{padding:"0"}}>
                                    <Button outline color="link"> <i className="fa fa-ellipsis-h"> </i> </Button>
                                    </DropdownToggle>
                                    <DropdownMenu right>
                                    <DropdownItem>
                                        <a ><i className="fa fa-picture-o"> </i> Change Cover</a>
                                    </DropdownItem>
                                    <DropdownItem>
                                        <NavItem>
                                        <a ><i className="fa fa-pencil"> </i> Edit Collection</a>
                                        </NavItem>
                                    </DropdownItem>
                                    
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Col >
                        </Row>
                        <Row>
                            <Col sm="7">
                             {props.album.details.date}  
                            </Col >
                            <Col sm="4">
                             <Badge> 
                                {props.album.details.photoCount} photos</Badge>
                            </Col >
                        </Row>
                    {props.album.details.photoCount} photos
              
                </Card>
            </Col>
            <Col sm="9" lg="9" md="9" xs="12" style={{paddingTop:"10px"}}>
                 {activeComponent} 
            </Col>
        </Row>

   
    
    )
}
 
export default AlbumHeader