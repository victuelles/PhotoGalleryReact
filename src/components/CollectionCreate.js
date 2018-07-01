import React, { Component } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';


const byPropKey =(propertyName,value)=>()=>({
    [propertyName]:value,
  })

class CollectionCreate extends Component {
  
    constructor(props) {
        super(props);

        this.state = {
            collectionName:'',
            tags:'',
            startDate:moment(),
            expiryDate:props.expiryDate,
            isButtonDisabled:true

        }
        this.handleChange = this.handleChange.bind(this);
        this.handleExpiryChange = this.handleExpiryChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.cancelForm = this.cancelForm.bind(this);
    }
    handleChange(date) {
        this.setState({
          startDate: date   
        });
    }
    handleExpiryChange(date) {
        this.setState({
            expiryDate: date
        });
    }
    submitForm(){
        console.log('submit form');
        this.props.setFormData(this.state)
    } 
    cancelForm(){
        console.log('submit form');
        this.props.setFormData(null)
    }
    render() { 
        let{tags,collectionName,startDate,expiryDate}=this.state
        
        return ( 
            <form className="k-form">
                <label className="k-form-field">
                    <span>Give your collection a name</span>
                    <input className="k-textbox" placeholder="e.g. Romina and Gail" defaultValue={collectionName} onChange={event=>{this.setState(byPropKey('collectionName',event.target.value))} } />
                </label>
                <label className="k-form-field">
                    <span>What is the date of the event?</span>
                    <DatePicker
                        selected={startDate}
                        onChange={this.handleChange}
                    />
                </label>

                <label className="k-form-field">
                    <span>Tag your collection</span>
                    <input type="text" className="k-textbox" placeholder="Optional" defaultValue={tags} onChange={event=>this.setState(byPropKey('tags',event.target.value))} />
                </label>
                <label className="k-form-field">
                    <span>Auto Expiry</span>
                    <DatePicker
                        selected={expiryDate}
                        onChange={this.handleExpiryChange}
                    />
                </label>
                <button type="button" className="k-button" onClick={this.cancelForm}>Cancel</button> &nbsp;
                 <button type="button" className="k-button k-primary" onClick={this.submitForm} disabled={this.state.collectionName===''}>Submit</button>
            </form>
        )
    }
}
 
export default CollectionCreate