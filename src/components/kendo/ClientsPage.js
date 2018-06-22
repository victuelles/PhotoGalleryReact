import React from 'react';
import { Grid, GridColumn as Column, GridCell } from '@progress/kendo-react-grid';
//
import '@progress/kendo-theme-bootstrap/dist/all.css';

class ClientsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridData: null
        };
    }

    componentDidMount() {
        console.log("componentDidMount",this.state)
      this.fetchProducts();

    
    }
  
    fetchProducts=()=>{
      fetch('/clients.json')
      .then(rsp => rsp.json())
      .then(data =>{
       console.log(data)
       
       //  this.setState({gridData:products});
        let gridData=[]
        Object.keys(data).map((item,idx) => {
            let client=data[item];
            client.id=item;
            client.order=++idx;
            console.log("client",client);
            gridData.push(client);
        
        })
       
       this.setState({gridData:gridData})
       
        
       
      })
    }
    render() {
        return (
            <div className="container" style={{paddingTop:"150px"}}>
             <h2>Clients</h2>
                <div className="row">
                    <Grid
                        style={{ height: '400px' }}
                        data={this.state.gridData}>
                        <Column field="id" title="ID" width="100px" />
                        <Column field="fullname" title="Name" width="250px" />
                        <Column field="email" title="Email Id" />
                        <Column field="phone" title="Phone" width="280px" />
                        <Column field="order" title="Seq" width="80px" />

                    </Grid>
                </div>
            </div>
        );
    }
}

export default ClientsPage;
