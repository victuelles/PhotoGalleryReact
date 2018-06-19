import React,{Component} from 'react'
import {auth} from '../firebase'



const INITIAL_STATE= {
    passwordOne:'',
    passwordTwo:'',
    error:null
}
const byPropKey =(propertyName,value)=>()=>({
    [propertyName]:value,
})
class PasswordChangeForm extends Component {
    
    constructor(props){
        super(props)
        this.state = {...INITIAL_STATE}
    }

    onSubmit=(event)=>{
        const {passwordOne}=this.state;
      
        auth.doPasswordUpdate(passwordOne)
            .then(authUser=>{
                this.setState(()=>({...INITIAL_STATE}))
              
            })
            .catch(error=>{
                this.setState(byPropKey('error',error))
            })
        event.preventDefault() 
    }
    render() { 
        const {passwordOne,passwordTwo,error} = this.state
        
        const isInvalid=
                passwordOne!==passwordTwo ||
                passwordOne===''
  
        return ( 
            <div className="container"  style={{marginTop:40+'px'}}>  
            <form onSubmit={this.onSubmit}>
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <h2>Change Password</h2>
                    <hr/>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className="form-group has-danger">
                            <input value={passwordOne} 
                                    onChange={event=>this.setState(byPropKey('passwordOne',event.target.value))}
                                    type='text'
                                    placeholder='New Password'
                            />                  
                        </div>
                </div>
            </div>      
            <div className="row"> 
                <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className="form-group has-danger">
                            
                            <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                               
               
                                <input value={passwordTwo} 
                        onChange={event=>this.setState(byPropKey('passwordTwo',event.target.value))}
                        type='text'
                        placeholder='Confirm New Password'
                 />                   
                        </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-control-feedback">
                        <button disabled={isInvalid} className="btn btn-primary" type ='submit'>
                           Reset my Password
                         </button>
                        </div>
                </div>
             </div>


                {error && <p>{error.message}</p>}
            </form>
            </div>
         )
    }
}
 





export default PasswordChangeForm;


