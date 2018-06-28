import React, { Component } from 'react';
import kendo from '@progress/kendo-ui';
import { Upload } from '@progress/kendo-upload-react-wrapper';
import { AutoComplete, ComboBox, DropDownList, MultiSelect } from '@progress/kendo-dropdowns-react-wrapper';
import {db,firebase} from '../../firebase'
import {UPLOAD_URL} from '../../constants/server'
import { Container,Row,Col, Button, Form, FormGroup, Label, Input, FormText,Progress,Fade } from 'reactstrap';
import axios from  'axios'

import ReactGA from 'react-ga';

ReactGA.initialize('UA-121414075-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const INITIAL_STATE= {
    id:null,
    loadingProgress:0,
   listData:[],
   showUpload:false
  }
class UploadContainer extends Component {

    constructor(props) {
        super(props);
        this.async = {
            saveUrl: UPLOAD_URL,
            removeUrl: "http://my-app.localhost/remove",
            autoUpload: false
        }
        this.dropZone = ".dropZoneElement"
        this.validation = {
            allowedExtensions: [".jpg", ".png"]
        }
        //
        this.userID=null;
        this.placeholder = "Select Event"
        this.loadingProgress=0
        this.state = {...INITIAL_STATE}

    }
    componentDidMount(){

        firebase.auth.onAuthStateChanged(authUser=>{
            //retrieve from database the users/uid

          db.getUser(authUser.uid).then(snapshot=>this.setState(()=>(snapshot.val()))).then(()=>{
              console.log(this.state)
              this.userID=this.state.id
          //    this.fetchData();
                db.getAllEvents(this.state.id).then(snapshot=>{

                    let data=snapshot.val();
                  //  let gridData=[]
                    let listData=[]
                    Object.keys(data).map((item,idx) => {
                        let event=data[item];
                        event.id=item;
                        event.order=++idx;
                     //   gridData.push(event);
                        listData.push( {'text':event.title,'value':event.id})

                        });
                  //      this.setState({gridData:gridData})
                        this.setState({listData:listData})
                }).catch(err=>{
                    console.log('error',err);
             
            })
        });
      
    })
    }


    onDataChange=(e)=>{
        var value = e.sender.value();
        console.log('onDataChange',value,e.sender.text())
        this.setState({showUpload:true,
                        eventID:value})
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
          fd.append('eventID',this.state.eventID)
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
    render() {
            console.log("render state",this.state)
            let {imagePreviewUrl,loadingProgress,showUpload} = this.state;
            let $imagePreview = null;
            if (imagePreviewUrl) {
                $imagePreview = (<img src={imagePreviewUrl}  alt="ID document"/>);
                
              } else {
                $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
              }
        return (
            <div className="container" style={{paddingTop:"150px"}}>
                <div className="row">
                    <div className="col-2">
                        ID
                    </div>
                    <div className="col-10">
                        {this.state.id}
                    </div>
                 </div>   

               <div className="row">
                <div className="col-2">
                    Event Name
                </div>
                <div className="col-10">
                    <ComboBox   dataTextField= "text"
                                 dataValueField="value"
                            dataSource={this.state.listData}
                            change={this.onDataChange}
                            placeholder={this.placeholder}/>
                </div>
                </div>
                <div className={showUpload?'show':'hidden'}>
                 
                    <div className="dropZoneElement">Drag and drop file here</div>
                    <Upload async={this.async} dropZone={this.dropZone}
                        upload={this.onUpload}  />

                    <div className="imgPreview">
                    {$imagePreview}
                    </div>
                    <div className="text-center">{loadingProgress}%</div>
                    <Progress value={loadingProgress}/>
                </div>
            </div>
        );
    }
}

export default UploadContainer