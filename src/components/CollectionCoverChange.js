import React, { Component } from 'react';
import axios from  'axios'
import {db,firebase} from '../firebase'
import {UPLOAD_URL} from '../constants/server'
import withAuthorization from './withAuthorization'
import { Container,Row,Col, Button, Form, FormGroup, Label, Input, FormText,Progress,Fade } from 'reactstrap';



const byPropKey =(propertyName,value)=>()=>({
    [propertyName]:value,
  })

  const INITIAL_STATE= {
    id:null,
    isButtonDisabled:true,
    imagePreviewUrl:'',
    loadingProgress:0,
    shouldHide:false,
    error:null
  }
class CollectionCoverChange extends Component {
  
    constructor(props) {
        super(props);
        this.state = {...INITIAL_STATE}
    
    }
    componentDidMount() {
        console.log('this.props.album',this.props.album)
        firebase.auth.onAuthStateChanged(authUser=>{
            //retrieve from database the users/uid

            db.getUser(authUser.uid).then(snapshot=>this.setState(()=>(snapshot.val()))).then(()=>{
              console.log(this.state)
            })
        });
     }

     fileSelectedHandler = event =>{
        let reader = new FileReader();
        let file = event.target.files[0];
    
        console.log("file",file);
        this.setState({
         shouldHide:true
        });
    
        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
        reader.readAsDataURL(file)
         event.preventDefault();
          this.setState({
          selectedFile:event.target.files[0],
          isButtonDisabled: false
        })
          console.log("fileSelectedHandler",this.state);
      }
    getFileExtension=(filename)=> {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename)[0] : undefined;
    }

      

     fileUploadHandler=(e)=>{
        //e.preventDefault();
        this.setState({
          isButtonDisabled: true
        });
        console.log("fileUploadHandler state=",this.state);
        const fd= new FormData();
        const newFN= this.state.id+'_ID.'+this.getFileExtension(this.state.selectedFile.name)
        fd.append('image',this.state.selectedFile,newFN)
        fd.append('uid',this.state.id)
        
        axios.post(UPLOAD_URL,
        fd,{
          onUploadProgress:progressEvent =>{
            console.log('Upload progress: '+Math.round((progressEvent.loaded/progressEvent.total)*100)+"%")
            
            this.setState({
              loadingProgress: Math.round((progressEvent.loaded/progressEvent.total)*100)
            });
          }
        }).then(res=>{
          console.log(res)
    
        })
        console.log('fileUploadHandler called');
      }


    render() { 
        let {imagePreviewUrl,loadingProgress,shouldHide} = this.state;
        let $imagePreview = this.props.album?<img src={this.props.album.details.coverUrl} alt="cover photo" />:''
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl}  alt="cover photo"/>);
            
        }
        return ( 
           
        <Form  onSubmit={this.onSubmit}>
                <label className="k-form-field">
                    <span>Select photo to replace collection cover</span>
                 </label>

                <FormGroup row>
                  
                   
                  <div className="imgPreview">
                  {$imagePreview}
                </div>
                <div className="text-center">{loadingProgress}%</div>
           
                
                    <Col sm={12}>
                        <Input 
                            type="file" name="file" 
                            id="idFile"  accept="image/*"  
                            onChange={this.fileSelectedHandler}
                            ref={fileInput=>this.fileInput=fileInput}
                        />
                        
                 
                    </Col>
     
       
                 </FormGroup>
                 <FormGroup row>
                     <Col sm={12}>
                    <Progress value={loadingProgress}/>
                    <Button color="primary" onClick={this.fileUploadHandler}  disabled={this.state.isButtonDisabled}>Upload file</Button>
                    </Col>
                 </FormGroup>
       </Form>
        )
    }
}
 


export default CollectionCoverChange;