import React from 'react';
import { Grid, GridColumn as Column, GridCell } from '@progress/kendo-react-grid';


//import '@progress/kendo-theme-default/dist/all.css';
import '@progress/kendo-theme-bootstrap/dist/all.css';
//npm install --save @progress/kendo-theme-bootstrap
//import products from 'products.json';

class CustomCell extends GridCell {
    render() {
        return (
            <td>
                <input disabled type="checkbox" checked={this.props.dataItem[this.props.field]} />
            </td>
        );
    }
}

class GridPage extends React.Component {
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
      fetch('/products.json')
      .then(rsp => rsp.json())
      .then(products =>{
       // console.log(products)
       
         this.setState({gridData:products});
       
      })
    }
    render() {
        return (
            <div className="container" style={{paddingTop:"150px"}}>
                 <div className="row">
                <Grid
                    style={{ height: '400px' }}
                    data={this.state.gridData}
                >
                    <Column field="ProductID" title="ID" width="40px" />
                    <Column field="ProductName" title="Name" width="250px" />
                    <Column field="Category.CategoryName" title="CategoryName" />
                    <Column field="UnitPrice" title="Price" width="80px" />
                    <Column field="UnitsInStock" title="In stock" width="80px" />
                    <Column field="Discontinued" title="Discontinued" width="120px" cell={CustomCell} />
                </Grid>
                </div>
            </div>
        );
    }
}

export default GridPage;
