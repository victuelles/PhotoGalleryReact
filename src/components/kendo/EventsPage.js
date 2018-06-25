import React from 'react';
import {db,firebase} from '../../firebase'
import { Grid, GridColumn as Column, GridCell } from '@progress/kendo-react-grid';
//
import '@progress/kendo-theme-bootstrap/dist/all.css';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import SelectedImage from './SelectedImage';

class GridPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {currentImage: 0,
            gridData: null,
            photo_set:[],
            selectAll: false 
        };
        this.selectPhoto = this.selectPhoto.bind(this);
        this.toggleSelect = this.toggleSelect.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);

    }
    selectPhoto(event, obj) {
        let photo_set = this.state.photo_set;
        photo_set[obj.index].selected = !photo_set[obj.index].selected;
        this.setState({ photo_set: photo_set });
      }
      toggleSelect() {
        let photo_set = this.state.photo_set.map((photo, index) => { return { ...photo, selected: !this.state.selectAll } });
        this.setState({ photo_set: photo_set, selectAll: !this.state.selectAll });
      }
    openLightbox(event, obj) {
        this.setState({
          currentImage: obj.index,
          lightboxIsOpen: true,
        });
      }
      closeLightbox() {
        this.setState({
          currentImage: 0,
          lightboxIsOpen: false,
        });
      }
      gotoPrevious() {
        this.setState({
          currentImage: this.state.currentImage - 1,
        });
      }
      gotoNext() {
        this.setState({
          currentImage: this.state.currentImage + 1,
        });
      }
    
    componentDidMount(){

        firebase.auth.onAuthStateChanged(authUser=>{
            //retrieve from database the users/uid

          db.getUser(authUser.uid).then(snapshot=>this.setState(()=>(snapshot.val()))).then(()=>{

              console.log(this.state)
              this.userID=this.state.id
              db.getAllEvents(this.state.id).then(snapshot=>{

                let data=snapshot.val();
                let gridData=[]
      
                Object.keys(data).map((item,idx) => {
                    let event=data[item];
                    event.id=item;
                    event.order=++idx;
                    gridData.push(event);
                    });
                    this.setState({gridData:gridData})
             }).catch(err=>{
                 console.log('error',err);
             })
            })
        });
    }
    getPhotoSet=(eventId)=>{
        console.log('getPhotoSet',eventId,this.state.id)
        db.getEventPhotos(this.state.id,eventId).then(snapshot=>{

            let data=snapshot.val();
            /*
            :
        filename:"630e698124b5dd73a38fc8bb997b99e4.jpg"
        originalname:"DSC09221.jpg"
        url:"https://firebasestorage.googleapis.com/v0/b/eventphotogallery-ed881.appspot.com/o/hTpdO2769gco49UpaptUinspThm1%2F630e698124b5dd73a38fc8bb997b99e4.jpg?alt=media&token=266078c3-2482-479a-b7b3-a8135ed4a3aa"
        */
            //  { src: 'https://source.unsplash.com/2ShvY8Lf6l0/800x599', width: 4, height: 3 }
            let photosData=[]
            console.log('getEventPhotos data',data)
            if(data){
            Object.keys(data).map((item) => {
                let url=data[item].url;
                let filename=data[item].originalname;
                console.log('url',url)
                let event={src:url,width: 4, height: 3,filename:filename}
             //   event.id=item;
              //  event.order=++idx;
                photosData.push(event)
                });
                this.setState({photo_set:photosData})
            }else{
                this.setState({photo_set:[]})
            }
            console.log('photoData',photosData)
        }).catch(err=>{
            console.log('error',err);
        })


    }
    onEventRowClick=(e)=>{
        console.log('onEventRowClick',e.dataItem.id)

        this.getPhotoSet(e.dataItem.id)
    }
   
    render() {
        //  data={this.state.gridData}>
        let {gridData,photo_set}=this.state;
        console.log('gridData',gridData)
        return (
            <div className="container" style={{paddingTop:"150px"}}>
            <h2>Events</h2>
                 <div className="row">
                <Grid
                    style={{ height: '400px' }} data={gridData} onRowClick={this.onEventRowClick}>
                  
                    <Column field="id" title="ID" width="80px" />
                    <Column field="title" title="Event Name" width="250px" />
                    <Column field="description" title="Description" />
                    <Column field="date" title="Date" width="180px" />
                    <Column field="time" title="Time" width="180px" />
                    <Column field="location" title="Location" width="150px"  />
                </Grid>
                </div>
                <div>
                <p><button className="toggle-select" onClick={this.toggleSelect}>toggle select all</button></p>
                <Gallery photos={photo_set}   onClick={this.selectPhoto} ImageComponent={SelectedImage}  />
                <Lightbox images={photo_set}
                    onClose={this.closeLightbox}
                    onClickPrev={this.gotoPrevious}
                    onClickNext={this.gotoNext}
                    currentImage={this.state.currentImage}
                    isOpen={this.state.lightboxIsOpen}
                />
                </div>
            </div>
        );
    }
}

export default GridPage;
