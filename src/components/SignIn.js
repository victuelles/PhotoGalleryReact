import React,{Component} from 'react'
import { withRouter} from 'react-router-dom'
import * as routes from '../constants/routes'
import {auth} from '../firebase'
import {SignUpLink} from './SignUp'
import { PasswordForgetLink} from './PasswordForget'

const SignInPage = ({history}) => 
<div>
   
    <SignInForm history={history}/>

</div>

const byPropKey =(propertyName,value)=>()=>({
    [propertyName]:value,
})
const INITIAL_STATE= {
    email:'',
    password:'',
    error:null
}

 
class SignInForm extends Component {
    
    constructor(props){
        super(props)
        this.state = {...INITIAL_STATE}
    }

    onSubmit=(event)=>{
        const {email,password}=this.state;
        const {history}=this.props

        auth.doSigInWithEmailAndPassword(email,password)
            .then(()=>{
                this.setState(()=>({...INITIAL_STATE}))
                history.push(routes.USER_INFO)
            })
            .catch(error=>{
                this.setState(byPropKey('error',error))
            })
        event.preventDefault() 
    }
    render() { 
        const {email,password,error} = this.state
        
        const isInvalid=  
                password===''||
                email===''
           

        return ( 
            <section className="wellcome_area clearfix" id="home">
             <div className="container h-100" style={{paddingTop:"120px"}}>
            <div className=" h-100 align-items-center"> 
            <form onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <h2>Sign In</h2>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <div className="form-group has-danger">
                         
                            <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                                <div className="input-group-addon" style={{width: 2.6+'rem'}}><i className="fa fa-at"></i></div>
                                <input value={email} className="form-control" 
                            onChange={event=>this.setState(byPropKey('email',event.target.value))}
                            type='email'
                            placeholder='Email address'
                            />                       
                        </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="form-control-feedback">
                            <span className="text-danger align-middle">
                             {error && <p>{error.message}</p>}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <div className="form-group">
                       
                        <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                            <div className="input-group-addon" style={{width: '2.6rem'}}><i className="fa fa-key"></i></div>
                            <input value={password} className="form-control" 
                        onChange={event=>this.setState(byPropKey('password',event.target.value))}
                        type='password' 
                        placeholder='Password'
                     />
                      </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="form-control-feedback">
                        <span className="text-danger align-middle">
                        </span>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-3"></div>
                <div className="col-md-6" style={{paddingTop: '.35rem'}}>
                    <div className="form-check mb-2 mr-sm-2 mb-sm-0">
                        <label className="form-check-label">
                            <input className="form-check-input" name="remember"
                                   type="checkbox" />
                            <span style={{paddingBottom:'.15rem'}}>Remember me</span>
                        </label>
                    </div>
                </div>
            </div>
            <div className="row" style={{paddingTop: '1rem'}}>
                <div className="col-md-3"></div>
                <div className="col-md-6">
                    <button disabled={isInvalid} type="submit" className="btn btn-primary btn-block btn-lg"><i className="fa fa-sign-in"></i> Login</button>
                    <PasswordForgetLink/>
                    <SignUpLink />
                </div>
            </div>
      
         </form>
     </div>
     </div>

     </section>
         )
    }
}
export default withRouter(SignInPage)
export {
    SignInForm
}