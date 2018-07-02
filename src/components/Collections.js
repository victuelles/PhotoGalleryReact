import React, { Component } from 'react';
import CollectionPresentation from './CollectionPresentation'
import {db,firebase} from '../firebase'
import { Button } from '@progress/kendo-react-buttons';
import {Row,Col  } from 'reactstrap';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import moment from 'moment';
import withAuthorization from './withAuthorization'
import CollectionCreate from './CollectionCreate'

import ReactGA from 'react-ga';
import 'react-datepicker/dist/react-datepicker.css';
ReactGA.initialize('UA-121414075-1');
ReactGA.pageview(window.location.pathname + window.location.search);
const MODAL_WIDTH = 500
const MODAL_HEIGHT= 600

const CollectionsPage = ({history}) => 
<div>
   
    <Collections history={history}/>

</div>

const INITIAL_STATE= {
    visible: false,
    startDate:moment(),
    expiryDate:null,
    formData:null
    
}

class Collections extends Component {
    constructor(props){
        super(props)
        this.state = {
            ...INITIAL_STATE
        }
        this.toggleDialog = this.toggleDialog.bind(this);
        this.toggleCreateDialog = this.toggleCreateDialog.bind(this);
    }

    componentDidMount() {
        firebase.auth.onAuthStateChanged(authUser=>{
            //retrieve from database the users/uid
                db.getUser(authUser.uid).then(snapshot=>this.setState(()=>(snapshot.val()))).then(()=>{
                    this.userID=this.state.id
                   this.getAllCollections()
                })
            })
    }
    getAllCollections=()=>{
        db.getAllEvents(this.state.id).then(snapshot=>{
            let data=snapshot.val();
            let gridData=[]
            Object.keys(data).map((item,idx) => {
                let event={}
                event.id=item;
                let details=data[item];
                if(!details.isDeleted){
                    details.photo=(details.coverUrl?details.coverUrl:"https://firebasestorage.googleapis.com/v0/b/eventphotogallery-ed881.appspot.com/o/hTpdO2769gco49UpaptUinspThm1%2Fthumb_83cb968d542577888e512297b285b869.jpg?alt=media&token=7f0714c2-d4ae-4502-85db-e312735606fc")
                    details.photoCount="120"
                    event.details=details
                    event.order=++idx;
                    gridData.push(event);
                }
                });
                this.setState({collection:gridData})
                this.setState({activeAlbum:null});
                console.log(this.state)
        }).catch(err=>{
            console.log('error',err);
        })
    }
    setActiveAlbum =(album)=>{
        const {history}=this.props
        console.log("Collections setActiveAlbum =",album)
        this.setState({activeAlbum:album});
      
       
      }
      setFormData =(data)=>{
    
        console.log("Collections setFormData =",data)
        if(data){
            //
            const {history}=this.props
            this.setState({formData:data});
            //call db createCollection
            console.log('call db createCollection')
            db.updateEvent(this.state.id,
                this.state.collection.length+1,
                data.startDate.format("MMM Do YYYY"),
                data.tags,
                data.locationName,
                data.durationName,
                data.collectionName
            )
            this.getAllCollections()
        }else{
            console.log('createCollection cancelled')
        }
        this.setState({
            visible: !this.state.visible
        });
     
        
       
      }
    toggleDialog=()=> {
        this.setState({
            visible: !this.state.visible
        });
     
            console.log("toggleDialog",this.state)
        
    }
    toggleCreateDialog=()=> {
        this.setState({
            visible: !this.state.visible
        });
      
            console.log("toggleCreateDialog",this.state)
     
    }

    render() { 
       // console.log("state",this.state)
       return(
        <section className="wellcome_area2 clearfix" id="home">
          <div className="container h-100" style={{paddingTop:"120px"}}>
          <Row className={this.state.activeAlbum?'hidden':''}>
            <Col sm="10" lg="10" md="10" xs="12" style={{paddingTop:"10px"}}>
            <h2>Collections </h2>
            </Col>
            <Col sm="2" lg="2" md="2" xs="12" style={{paddingTop:"10px"}}>
             <Button primary={true} icon="plus"  onClick={this.toggleDialog}> New Collection</Button>
            </Col>
          </Row>
          
            <CollectionPresentation allPhotos={this.state.collection} 
              setActiveAlbum={this.setActiveAlbum} 
              activeAlbum={this.state.activeAlbum}
              />

            
            {this.state.visible && <Dialog title={"CREATE NEW COLLECTION"} onClose={this.toggleDialog} width={MODAL_WIDTH} height={MODAL_HEIGHT}>
                        <CollectionCreate  setFormData={this.setFormData}/>

                    </Dialog>}
          </div>
        </section>
        ) 
    }
}



const authCondition =(authUser)=>!!authUser;
export default withAuthorization(authCondition)(CollectionsPage);