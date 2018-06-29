import React, { Component } from 'react';
import CollectionPresentation from './CollectionPresentation'
import {db,firebase} from '../firebase'
import { Button } from '@progress/kendo-react-buttons';
import {Row,Col  } from 'reactstrap';
import withAuthorization from './withAuthorization'
import ReactGA from 'react-ga';

ReactGA.initialize('UA-121414075-1');
ReactGA.pageview(window.location.pathname + window.location.search);


const CollectionsPage = ({history}) => 
<div>
   
    <Collections history={history}/>

</div>

class Collections extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }

    componentDidMount() {
        firebase.auth.onAuthStateChanged(authUser=>{
            //retrieve from database the users/uid
                db.getUser(authUser.uid).then(snapshot=>this.setState(()=>(snapshot.val()))).then(()=>{
                    this.userID=this.state.id
                    db.getAllEvents(this.state.id).then(snapshot=>{
                        let data=snapshot.val();
                        let gridData=[]
                        Object.keys(data).map((item,idx) => {
                            let event={}
                            event.id=item;
                            let details=data[item];
                        
                            details.photo=(details.coverUrl?details.coverUrl:"https://firebasestorage.googleapis.com/v0/b/eventphotogallery-ed881.appspot.com/o/hTpdO2769gco49UpaptUinspThm1%2Fthumb_83cb968d542577888e512297b285b869.jpg?alt=media&token=7f0714c2-d4ae-4502-85db-e312735606fc")
                            details.photoCount="120"
                            event.details=details
                            event.order=++idx;
                             gridData.push(event);
                            });
                            this.setState({collection:gridData})
                            this.setState({activeAlbum:null});
                            console.log(this.state)
                    }).catch(err=>{
                        console.log('error',err);
                    })
                })
            })
    }
    setActiveAlbum =(album)=>{
        const {history}=this.props
        console.log("Collections setActiveAlbum =",album)
        this.setState({activeAlbum:album});
      
       
      }


    render() { 
       // console.log("state",this.state)
       return(
        <section className="wellcome_area2 clearfix" id="home">
          <div className="container h-100" style={{paddingTop:"120px"}}>
          <Row>
            <Col sm="10" lg="10" md="10" xs="12" style={{paddingTop:"10px"}}>
            <h2>Collections </h2>
            </Col>
            <Col sm="2" lg="2" md="2" xs="12" style={{paddingTop:"10px"}}>
             <Button primary={true} icon="plus"> New Collection</Button>
            </Col>
          </Row>
          
            <CollectionPresentation allPhotos={this.state.collection} 
              setActiveAlbum={this.setActiveAlbum} 
              activeAlbum={this.state.activeAlbum}
              />
          </div>
        </section>
        ) 
    }
}

const authCondition =(authUser)=>!!authUser;
export default withAuthorization(authCondition)(CollectionsPage);