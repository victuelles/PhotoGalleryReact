import React from 'react';
import {db,firebase,auth} from '../firebase'

import '@progress/kendo-theme-bootstrap/dist/all.css';
//import Gallery from 'react-photo-gallery';
import Gallery from 'react-grid-gallery';

import CheckButton from './CheckButton';
import PropTypes from 'prop-types';
class GridPage extends React.Component {
    constructor(props) {
        super(props);
       
        this.state = {currentImage: 0,
     
            album:props.album,
            images:[],

            selectAllChecked: false
        };


        this.onSelectImage = this.onSelectImage.bind(this);
        this.getSelectedImages = this.getSelectedImages.bind(this);
        this.onClickSelectAll = this.onClickSelectAll.bind(this);
    }

  
    allImagesSelected (images){
        var f = images.filter(
            function (img) {
                return img.isSelected == true;
            }
        );
        return f.length == images.length;
    }
      onSelectImage (index, image) {
        var images = this.state.images.slice();
        var img = images[index];
        if(img.hasOwnProperty("isSelected"))
            img.isSelected = !img.isSelected;
        else
            img.isSelected = true;

        this.setState({
            images: images
        });

        if(this.allImagesSelected(images)){
            this.setState({
                selectAllChecked: true
            });
        }
        else {
            this.setState({
                selectAllChecked: false
            });
        }
    }

    getSelectedImages () {
        var selected = [];
        for(var i = 0; i < this.state.images.length; i++)
            if(this.state.images[i].isSelected == true)
                selected.push(i);
        return selected;
    }
    onClickSelectAll () {
        var selectAllChecked = !this.state.selectAllChecked;
        this.setState({
            selectAllChecked: selectAllChecked
        });

        var images = this.state.images.slice();
        if(selectAllChecked){
            for(var i = 0; i < this.state.images.length; i++)
                images[i].isSelected = true;
        }
        else {
            for(var i = 0; i < this.state.images.length; i++)
                images[i].isSelected = false;

        }
        this.setState({
            images: images
        });
    }

    componentDidMount(){
        console.log("props",this.props)
        firebase.auth.onAuthStateChanged(authUser=>{
            //retrieve from database the users/uid
            console.log("authUser",authUser)
            if(!authUser){

                 auth.doSignOut;
            }else{
                db.getUser(authUser.uid).then(snapshot=>this.setState(()=>(snapshot.val()))).then(()=>{

                    console.log(this.state)
                    this.userID=this.state.id
                    this.getPhotoSet(this.state.album.id)
                    })
                }
        });
           
    }
    getPhotoSet=(eventId)=>{
        console.log('getPhotoSet',eventId,this.state.id)
        db.getEventPhotos(this.state.id,this.state.album.id).then(snapshot=>{

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
                let thumbnailUrl=data[item].thumbnailUrl;
                let filename=data[item].originalname;
                let height=data[item].height
                let width=data[item].width
                console.log('url',url)

                console.log('thumbnailUrl',thumbnailUrl)
             //   let event={src:thumbnailUrl,width: width, height: height,filename:filename}
            
             let event={src:url,thumbnail:thumbnailUrl,thumbnailWidth: width, thumbnailHeight: height,caption:filename}
             

                photosData.push(event)
                });
                this.setState({images:photosData})
            }else{
                this.setState({images:[]})
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
        let {images}=this.state;
        console.log('images',images)
        return (
            <div className="container" >
                <CheckButton
                    index={0}
                    isSelected={this.state.selectAllChecked}
                    onClick={this.onClickSelectAll}
                    parentHover={true}
                    color={"rgba(0,0,0,0.54)"}
                    selectedColor={"#4285f4"}
                    hoverColor={"rgba(0,0,0,0.54)"}/>
                    <div style={{
                        height: "36px",
                        display: "flex",
                        alignItems: "center"
                    }}>
                    select all
                    </div>
                    <div style={{
                        padding: "2px",
                        color: "#666"
                    }}>Selected images: {this.getSelectedImages().toString()}</div>

                    <Gallery images={images}    
                             onSelectImage={this.onSelectImage}
                             showLightboxThumbnails={true} />
            </div>
        );
    }
}

GridPage.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequired,
            thumbnail: PropTypes.string.isRequired,
            srcset: PropTypes.array,
            caption: PropTypes.string,
            thumbnailWidth: PropTypes.number.isRequired,
            thumbnailHeight: PropTypes.number.isRequired,
            isSelected: PropTypes.bool
        })
    ).isRequired
};

export default GridPage;
