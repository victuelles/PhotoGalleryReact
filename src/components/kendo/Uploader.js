import React, { Component } from 'react';
import kendo from '@progress/kendo-ui';
import { Upload } from '@progress/kendo-upload-react-wrapper';
import { AutoComplete, ComboBox, DropDownList, MultiSelect } from '@progress/kendo-dropdowns-react-wrapper';

import {UPLOAD_URL} from '../../constants/server'
import axios from  'axios'
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
   
        this.placeholder = "Select Event"
       
        this.state={
            listData:[]
        }

    }
    componentDidMount(){
        this.fetchData();
    }

    fetchData=()=>{
        let listData=[]
        fetch('/events.json')
        .then(rsp => rsp.json())
        .then(data =>{
         console.log(data)
       
        
         Object.keys(data).map((item,idx) => {
          let event=data[item];
          event.id=item;
          event.order=++idx;
          console.log("event",event);
          listData.push( event.title+' '+event.id)
       
        });
          this.setState({listData:listData})
         
         
        })
    }
    onDataChange(e){
        var value = this.value();
        console.log('onDataChange',value)
    }
    onUpload(e) {
        console.log("onUpload e.files.length: " + e.files.length);
        console.log("JSON.stringify( e.files: " +JSON.stringify( e.files));
      
        Object.keys(e.files).map((index, value) => {
            console.log("name: " + e.files[index].name);
            console.log("extension: " +  e.files[index].extension.toString());
            console.log("size: " + e.files[index].size + " bytes");
            console.log("uid: " + e.files[index].uid);
         
          });


     /*     let reader = new FileReader();
         // let file = e.files[0];
         let file = e.target.files[0];

         console.log(" reader file " +file);
          reader.onloadend = () => {
            this.setState({
              file: file,
              imagePreviewUrl: reader.result
            });
          }
          reader.readAsDataURL(file)
           e.preventDefault();
            this.setState({
            selectedFile:file,
           
          })*/

    };
    render() {
            console.log("state",this.state)
            let {imagePreviewUrl} = this.state;
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
                Event Name
               </div>
                <div className="col-10">
                   <ComboBox 
                        dataSource={this.state.listData}
                        change={this.onDataChange}
                        placeholder={this.placeholder}/>
                </div>
                </div>
                <div className="imgPreview">
                  {$imagePreview}
                </div>
                <div className="dropZoneElement">Drag and drop file here</div>
                <Upload async={this.async} validation={this.validation}
                    dropZone={this.dropZone}
                   
                    upload={this.onUpload} 
                    />
            </div>
        );
    }
}

export default UploadContainer