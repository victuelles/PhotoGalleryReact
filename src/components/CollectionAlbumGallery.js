import React from 'react';
import {db,firebase,auth} from '../firebase'
import { Button } from '@progress/kendo-react-buttons';
import {Row,Col,Progress  } from 'reactstrap';
import kendo from '@progress/kendo-ui';
import '@progress/kendo-theme-bootstrap/dist/all.css';
//import Gallery from 'react-photo-gallery';
import Gallery from 'react-grid-gallery';
import { Upload } from '@progress/kendo-upload-react-wrapper';
import CheckButton from './CheckButton';
import PropTypes from 'prop-types';
import {UPLOAD_URL} from '../constants/server'
import axios from  'axios'

import ReactGA from 'react-ga';

ReactGA.initialize('UA-121414075-1');
ReactGA.pageview(window.location.pathname + window.location.search);


class GridPage extends React.Component {
    constructor(props) {
        super(props);
       
        this.state = {currentImage: 0,
            loadingProgress:0,
            album:props.album,
            images:[],
            showUpload:false,
            selectAllChecked: false
        };
        this.async = {
            saveUrl: UPLOAD_URL,
            removeUrl: "http://my-app.localhost/remove",
            autoUpload: false
        }
        this.dropZone = ".dropZoneElement"
        this.validation = {
            allowedExtensions: [".jpg", ".png"]
        }

    }

  
    allImagesSelected (images){
        var f = images.filter(
            function (img) {
                return img.isSelected == true;
            }
        );
        return f.length == images.length;
    }
      onSelectImage= (index, image)=> {
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

    getSelectedImages = ()=> {
        var selected = [];
        for(var i = 0; i < this.state.images.length; i++)
            if(this.state.images[i].isSelected == true)
                selected.push(i);
        return selected;
    }
    onClickSelectAll  = ()=> {
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
                let height=(data[item].height?data[item].height:3)
                let width=(data[item].width?data[item].width:4)
             //   console.log('url',url)

               // console.log('thumbnailUrl',thumbnailUrl)
             //   let event={src:thumbnailUrl,width: width, height: height,filename:filename}
            
             let event={src:url,thumbnail:thumbnailUrl,thumbnailWidth: width, thumbnailHeight: height,caption:filename}
             

                photosData.push(event)
                });
                this.setState({images:photosData})
                this.setState({showUpload:false})
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
    addPhotos=()=>{
        console.log("addPhotos")
        this.setState({showUpload:true})
    }
    cancelAddPhotos=()=>{
        console.log("cancelAddPhotos")
        this.setState({showUpload:false})
    }

    onUpload=(e)=>{
        // e.preventDefault();
        console.log("onUpload e.files.length: " + e.files.length);
        console.log("JSON.stringify( e.files: " +JSON.stringify( e.files));
        
         Object.keys(e.files).map((index, value) => {
             console.log("name: " + e.files[index].name);
             console.log("extension: " +  e.files[index].extension.toString());
             console.log("size: " + e.files[index].size + " bytes");
             console.log("uid: " + e.files[index].uid);
          
           });
           
 
 
           const fd= new FormData();
           const newFN= e.files[0].name;//this.userID+'_ID.'+e.files[0].extension
           fd.append('content-type', 'multipart/form-data')
           fd.append('eventID',this.state.album.id)
         //  fd.append('image', this.state.selectedFile)
           fd.append('uid',this.userID)
        /*   console.log("onUpload userID",this.userID)
           console.log("onUpload newFN",newFN)
           console.log("onUpload fd",fd)*/
          fd.append( 'name','image');
           fd.append( 'crossdomain',true);
         const config = { headers: { 'Content-Type': 'multipart/form-data' } };
           axios.post(UPLOAD_URL,
           fd,{
             onUploadProgress:progressEvent =>{
               console.log('Upload progress: '+Math.round((progressEvent.loaded/progressEvent.total)*100)+"%")
              // this.loadingProgress= Math.round((progressEvent.loaded/progressEvent.total)*100)
             this.setState({
                 loadingProgress: Math.round((progressEvent.loaded/progressEvent.total)*100)
               });
             }
           }).then(res=>{
             console.log("response ",res)
 
           
       
           }).catch(err=>{
             let reader = new FileReader();
             let file = e.files[0];
         
             console.log("file",file);
         
         
             reader.onloadend = () => {
                 this.setState({
                 file: file,
                 imagePreviewUrl: reader.result
                 });
             }
             reader.readAsDataURL(file.rawFile)
             e.preventDefault();
                 this.setState({
                 selectedFile:e.files[0].rawFile,
                 isButtonDisabled: false
             })
           })
 
     };

    onSuccess = (e) => {
        console.log("event :: success");
        console.log(e);
    }
    onComplete = (e) => {
        console.log("event :: onComplete");
        console.log(e);
        this.getPhotoSet(this.state.album.id)
      
    }
    render() {
        //  data={this.state.gridData}>
        let {images,showUpload,loadingProgress}=this.state;
        console.log('showUpload',showUpload)
        return (
            <div className="container" >

             <Row>
                <Col sm="10" lg="10" md="10" xs="12" style={{paddingTop:"10px"}}>
                <h2>Photos </h2>
                </Col>
                <Col sm="2" lg="2" md="2" xs="12" style={{paddingTop:"10px"}}>
                <Button className={!showUpload?'show':'hidden'}  primary={true} icon="plus" onClick={this.addPhotos}>Add Photos</Button>
                <Button className={showUpload?'show':'hidden'} primary={false} icon="cancel" onClick={this.cancelAddPhotos}>Cancel</Button>
                </Col>
            </Row>
            <div className={!showUpload?'show':'hidden'}>
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
            <div className={showUpload?'show':'hidden'}>
             <Row>
                <Col sm="12" lg="12" md="12" xs="12" style={{paddingTop:"10px"}}>
                <br/>
                <h1>  Upload Photos </h1>
                <div className="dropZoneElement">Drag and drop file here</div>
                        <Upload async={this.async} dropZone={this.dropZone}
                            upload={this.onUpload}  success={this.onSuccess} complete={this.onComplete}/>

                        <div className="text-center">{loadingProgress}%</div>
                        <Progress value={loadingProgress}/>
                </Col>
             </Row>
            </div>
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
