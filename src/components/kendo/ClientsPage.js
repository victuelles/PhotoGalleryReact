import React from 'react';
import {db,firebase} from '../../firebase'
import { Grid, GridColumn as Column, GridToolbar } from '@progress/kendo-react-grid';
import MyCommandCell from './my-command-cell';
import '@progress/kendo-theme-bootstrap/dist/all.css';

class ClientsPage extends React.Component {
    CommandCell;
    constructor(props) {
        super(props);
        this.state = {
            data: null,
          
        };
       
        this.enterInsert = this.enterInsert.bind(this);
        this.itemChange = this.itemChange.bind(this);

        const enterEdit = this.enterEdit.bind(this);
        const save = this.save.bind(this);
        const cancel = this.cancel.bind(this);
        const remove = this.remove.bind(this);
        this.CommandCell = MyCommandCell(enterEdit,remove,save,cancel, "inEdit");
    }
    enterInsert() {
        const dataItem = { inEdit: true, Discontinued: false };
        const newproducts = this.state.data.slice();
        newproducts.unshift(dataItem);
        this.update(newproducts, dataItem);
        this.setState({
            data: newproducts
        });
    }

    enterEdit(dataItem) {
        this.update(this.state.data, dataItem).inEdit = true;
        this.setState({
            data: this.state.data.slice()
        });
        console.log('enterEdit this.state.data=',this.state.data)
    }

    save(dataItem) {
        dataItem.inEdit = undefined;
        dataItem.ProductID = this.update(this.state.data, dataItem).ProductID;
        this.setState({
            data: this.state.data.slice()
        });
    }

    cancel(dataItem) {
        if (dataItem.id) {
            let originalItem = this.state.data.find(p => p.id === dataItem.id);
            this.update(this.state.data, originalItem);
        } else {
            this.update(this.state.data, dataItem, !dataItem.id);
        }
        this.setState({
            data: this.state.data.slice()
        });
    }

    remove(dataItem) {
        dataItem.inEdit = undefined;
        this.update(this.state.data, dataItem, true);
        this.update(this.state.data, dataItem, true);
        this.setState({
            data: this.state.data.slice()
        });
    }

    itemChange(event) {
        const value = event.value;
        const name = event.field;
        if (!name) {
            return;
        }
        const updatedData = this.state.data.slice();
        const item = this.update(updatedData, event.dataItem);
        item[name] = value;
        this.setState({
            data: updatedData
        });
    }

    update(data, item, remove) {
        console.log('update data=',data)
        console.log('update item=',item)
        console.log('update remove=',remove)
        let updated;
        let index = data.findIndex(p => p === item || item.id && p.id === item.id);
        if (index >= 0) {
            updated = Object.assign({}, item);
            data[index] = updated;
        } else {
            let id = 1;
            data.forEach(p => { id = Math.max(p.id + 1, id); });
            updated = Object.assign({}, item, { id: id });
            data.unshift(updated);
            index = 0;
        }

        if (remove) {
            data = data.splice(index, 1);
        }

        return data[index];
    }
    componentDidMount(){

        firebase.auth.onAuthStateChanged(authUser=>{
          db.getUser(authUser.uid).then(snapshot=>this.setState(()=>(snapshot.val()))).then(()=>{
                console.log(this.state)
                this.userID=this.state.id
                db.getAllClients(this.state.id).then(snapshot=>{
                let data=snapshot.val();
               
                console.log(' getAllClients',data)
                let gridData=[]
                Object.keys(data).map((item,idx) => {
                    let event=data[item];
                    event.id=item;
                    event.order=++idx;
                    gridData.push(event);
                });
                this.setState({data:gridData})
                this.sampleProducts=data;
             }).catch(err=>{
                 console.log('error',err);
             })
            })
        });
    }
  

    render() {
        let {data,photo_set}=this.state;
      //  console.log('gridData',gridData)
        return (
            <div className="container" style={{paddingTop:"150px"}}>
             <h2>Clients</h2>
                <div className="row">
                    <Grid
                          style={{ height: '420px' }}
                          data={data}
                          onItemChange={this.itemChange}
                          editField="inEdit"
                        >
                        <GridToolbar>
                            <button
                                title="Add new"
                                className="k-button k-primary"
                                onClick={this.enterInsert}
                            >Add new
                            </button>

                      
                                <button
                                    title="Cancel current changes"
                                    className="k-button"
                                    onClick={(e) => this.setState({ data: data.slice() })}
                                >Cancel current changes
                                </button>
                         
                        </GridToolbar>
                        <Column field="id" title="ID" width="100px" />
                        <Column field="fullname" title="Name" width="250px" />
                        <Column field="email"   editor="email" title="Email Id" />
                        <Column field="phone" editor="phone" title="Phone" width="280px" />
                        <Column field="order" title="Seq"  editable={false} width="80px" />
                        <Column cell={this.CommandCell} width="180px" />
                    </Grid>
                </div>
            </div>
        );
    }
}

export default ClientsPage;
