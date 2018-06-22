import React from 'react';

import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import { Renderers } from './renderers';
import { sampleProducts } from './sample-products';
//import '@progress/kendo-theme-default/dist/all.css';
import '@progress/kendo-theme-bootstrap/dist/all.css';
//import products from 'products.json';
function cloneProduct(product) {
    return Object.assign({}, product);
}



class GridPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: sampleProducts.map(cloneProduct),
            editItem: undefined,
            changes: false
        };
        this.saveChanges = this.saveChanges.bind(this);
        this.cancelChanges = this.cancelChanges.bind(this);
        this.itemChange = this.itemChange.bind(this);

        this.renderers = new Renderers(this.enterEdit.bind(this), this.exitEdit.bind(this), 'inEdit');
    }

    componentDidMount() {
        console.log("componentDidMount",this.state)
       // this.fetchProducts();

    
    }
  
    fetchProducts=()=>{
      fetch('/products.json')
      .then(rsp => rsp.json())
      .then(sampleProducts =>{
       // console.log(products)
       
       this.state = {
            data: sampleProducts.map(cloneProduct),
            editItem: undefined,
            changes: false
        };
       
      })
    }
    render() {
        return (
            <div className="container" style={{paddingTop:"150px"}}>
            <div className="row">
            <Grid
                style={{ height: '420px' }}
                data={this.state.data}
                rowHeight={50}
                onItemChange={this.itemChange}

                cellRender={this.renderers.cellRender}
                rowRender={this.renderers.rowRender}

                editField="inEdit"
            >
                <GridToolbar>
                    <button
                        title="Save Changes"
                        className="k-button"
                        onClick={this.saveChanges}
                        disabled={!this.state.changes}
                    >
                        Save Changes
                </button>
                    <button
                        title="Cancel Changes"
                        className="k-button"
                        onClick={this.cancelChanges}
                        disabled={!this.state.changes}
                    >
                        Cancel Changes
                </button>
                </GridToolbar>

                <Column field="ProductID" title="Id" width="50px" editable={false} />
                <Column title="Product Name" width="200px" field="ProductName" />
                <Column title="Units In Stock" editor="numeric" field="UnitsInStock" />
                <Column title="First Ordered" editor="date" format="{0:d}" width="140px" field="FirstOrderedOn" />
                <Column editor="boolean" field="Discontinued" />
            </Grid>
            </div>
            </div>
        );
    }

    enterEdit(dataItem, field) {
        if (dataItem.inEdit && field === this.state.editField) {
            return;
        }
        this.exitEdit();
        dataItem.inEdit = field;
        this.setState({
            editField: field,
            data: this.state.data
        });
    }

    exitEdit() {
        this.state.data.forEach((d) => { d.inEdit = undefined; });
        this.setState({
            data: this.state.data,
            editField: undefined
        });
    }

    saveChanges() {
        sampleProducts.splice(0, sampleProducts.length, ...this.state.data);
        this.setState({
            data: sampleProducts.map(cloneProduct),
            editField: undefined,
            changes: false
        });
    }

    cancelChanges() {
        this.setState({
            data: sampleProducts.map(cloneProduct),
            changes: false
        });
    }

    itemChange(event) {
        event.dataItem[event.field] = event.value;
        this.setState({
            changes: true
        });
    }
}

export default GridPage;
