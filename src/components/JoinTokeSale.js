import React, { Component } from 'react';
import StepZilla from 'react-stepzilla'
import Step1 from './token-sale/StepOne'
import Step2 from './token-sale/StepTwo'
import Step3 from './token-sale/StepThree'

let sectionStyleHeaderMasthead = {
  width: "100%",
  minHeight: "100vh",
  backgroundColor:'#fff',
  backgroundPosition: "0 0,100% 100%",
  backgroundRepeat  : 'no-repeat',
  backgroundSize: 'cover',
  textAlign:'center'
}
class TokenSalePage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    
        this.sampleStore = {
          email: '',
          gender: '',
          savedToCloud: false
        };
      }
    
      componentDidMount() {}
    
      componentWillUnmount() {}
    
      getStore() {
        return this.sampleStore;
      }
    
      updateStore(update) {
        this.sampleStore = {
          ...this.sampleStore,
          ...update,
        }
      }
    render() { 
        const steps =
    [
      {name: 'Wallet Addresses', component: <Step1 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
      {name: 'Buy Tokens', component: <Step2 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />},
      {name: 'Confirmation', component: <Step3 getStore={() => (this.getStore())} updateStore={(u) => {this.updateStore(u)}} />}   
    ]
        return (  
            <div className="page" style={sectionStyleHeaderMasthead}>
                <div className="home-page">
                
                    <header className=" text-center text-black">
                
                    <div className="container" style={{paddingTop:'20px'}}>
                    
                        <h2 className="masthead-heading mb-0">Join Token Sale</h2>
                        <div>
                        <StepZilla steps={steps}/>
                        </div>
                    </div>
                    
                    </header>
                </div>
            </div>
        )
    }
}
 
export default TokenSalePage;
