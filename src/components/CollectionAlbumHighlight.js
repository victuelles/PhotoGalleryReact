import React, { Component } from 'react';
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
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import CollectionCoverChange from './CollectionCoverChange'

const MODAL_WIDTH = 500
const MODAL_HEIGHT= 600




class CollectionAlbumHighlight extends Component {
    constructor(props){
        super(props)
        this.state = {visible:false,
                    activeComponent:null,
                    isUploading: false,
                    progress: 0}
     
      
    }


   
    setActive=(e)=>{
        e.preventDefault();
        console.log("row clicked",this.props);
        this.props.setActiveAlbum(null);
     }
     componentDidMount() {
            if( this.props.album){
                // user clicked an album, show the contents of it
                console.log(" activeAlbum props", this.props)
                const objReturn =
                        <CollectionAlbumGallery album={ this.props.album} images={[]} />
                this.setState({activeComponent:objReturn});
            }
     }
    setCoverPhoto=(data)=>{
        console.log(" setCoverPhoto data=",data)
        this.setState({visible:false})
    }
    showDialog=()=>{
        console.log(" showDialog data")
        this.setState({visible:true})
    }
    toggleDialog=()=>{
        console.log(" toggleDialog ",this.state.visible)
        this.setState({visible:!this.state.visible})
    }

    render() { 
        /*
                   <button type="button" className="k-button" onClick={this.toggleDialog}>Cancel</button> &nbsp;
                    <button type="button" className="k-button k-primary" onClick={this.toggleDialog} disabled={this.state.collectionName===''}>Submit</button>

        */
        return (
            <section>  
            <Row>
                <Col sm="3" lg="3" md="3" xs="12" style={{paddingTop:"10px"}}>
                    <Button color="primary" onClick={this.setActive}>  Back </Button>
                    <Card > 
                        <CardImg onClick={this.toggleDialog} top width="100%" src={ this.props.album.details.photo}/>
                     
                            <Row>
                                <Col sm="9" style={{paddingTop:"10px"}}>
                                    
                                        { this.props.album.details.title}
                                    
                                </Col >
                                <Col sm="2">
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav style={{padding:"0"}}>
                                        <Button outline color="link"> <i className="fa fa-ellipsis-h"> </i> </Button>
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                        <DropdownItem>
                                            <a onClick={this.showDialog}><i className="fa fa-picture-o"> </i> Change Cover</a>
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
                                 { this.props.album.details.date}  
                                </Col >
                                <Col sm="4">
                                 <Badge> 
                                    { this.props.album.details.photoCount} photos</Badge>
                                </Col >
                            </Row>
                        { this.props.album.details.photoCount} photos
                  
                    </Card>
                </Col>
                <Col sm="9" lg="9" md="9" xs="12" style={{paddingTop:"10px"}}>
                     {this.state.activeComponent} 
                </Col>
            </Row>
    
                {this.state.visible && 
                    <Dialog title={"CHANGE COVER PHOTO"} onClose={this.toggleDialog} width={MODAL_WIDTH} height={MODAL_HEIGHT}>
                            <CollectionCoverChange  album={ this.props.album} setCoverPhoto={this.setCoverPhoto}/>
                            {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
         
                        </Dialog>
                }
            </section>
          )
    }
}
 
export default CollectionAlbumHighlight;