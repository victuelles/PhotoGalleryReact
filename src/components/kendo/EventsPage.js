import React from 'react';
import { Grid, GridColumn as Column, GridCell } from '@progress/kendo-react-grid';
//
import '@progress/kendo-theme-bootstrap/dist/all.css';

class GridPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gridData: null
        };
    }

    componentDidMount() {
        console.log("componentDidMount",this.state)
      this.fetchData();

    
    }
  
    fetchData=()=>{
      fetch('/events.json')
      .then(rsp => rsp.json())
      .then(data =>{
       console.log(data)
       
       //  this.setState({gridData:products});
        let gridData=[]
       const objReturn = Object.keys(data).map((item,idx) => {
      //  const item =props.activeAlbum.files[idx];
        //item.key=item.filename;
      //  console.log("item",products[item],idx);
        let event=data[item];
        event.id=item;
        event.order=++idx;
        console.log("event",event);
        gridData.push(event);
     
        });
        this.setState({gridData:gridData})
       
      })
    }
    render() {
        return (
            <div className="container" style={{paddingTop:"150px"}}>
            <h2>Events</h2>
                 <div className="row">
                <Grid
                    style={{ height: '400px' }}
                    data={this.state.gridData}>
                    <Column field="id" title="ID" width="80px" />
                    <Column field="title" title="Event Name" width="250px" />
                    <Column field="description" title="Description" />
                    <Column field="date" title="Date" width="180px" />
                    <Column field="time" title="Time" width="180px" />
                    <Column field="location" title="Location" width="150px"  />
                </Grid>
                </div>
            </div>
        );
    }
}

export default GridPage;
