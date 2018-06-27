import React from 'react';
import {db,firebase} from '../../firebase'
import withAuthorization from '../withAuthorization'
import {Grid, GridColumn as Column, GridToolbar} from '@progress/kendo-react-grid';
import MyCommandCell from './my-command-cell';
import '@progress/kendo-theme-bootstrap/dist/all.css';

class Events extends React.Component {
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

    componentDidMount() {
        firebase.auth.onAuthStateChanged(authUser=>{
            //retrieve from database the users/uid

            db.getUser(authUser.uid).then(snapshot=>this.setState(()=>(snapshot.val()))).then(()=>{
              console.log(this.state)
            })
        });
     }
    enterInsert() {
        const nextId=(this.state.data?this.state.data.length+1:1)
        let dataItem={}
        let newproducts=[]
        if(nextId==1){
            /*     dataItem.id,
            dataItem.date,
            dataItem.description,
            dataItem.location,
            dataItem.time,
            dataItem.title
            */
            dataItem=  {inEdit: true,id:nextId,date:"",description:"",location:"",time:"",title:"",order:nextId}
            newproducts.push(dataItem);
        }else{
            dataItem = { inEdit: true,id:nextId,order:nextId };
            newproducts= this.state.data.slice();
            newproducts.unshift(dataItem);
        }
      
        this.update(newproducts, dataItem);
        this.setState({
            data: newproducts
        });
        console.log("enterInsert newproducts=",newproducts);
    }

    enterEdit(dataItem) {
        this.update(this.state.data, dataItem).inEdit = true;
        this.setState({
            data: this.state.data.slice()
        });
        console.log('enterEdit this.state.data=',this.state.data)
    }

    save(dataItem) {

        console.log(" save(dataItem)",dataItem)
        dataItem.inEdit = undefined;
      //  dataItem.id = this.update(this.state.data, dataItem).id;
        this.setState({
            data: this.state.data.slice()
        });
        console.log("new state",this.state)
        db.updateEvent(this.state.id,
            dataItem.id,
            dataItem.date,
            dataItem.description,
            dataItem.location,
            dataItem.time,
            dataItem.title
        )
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
        console.log(" remove(dataItem)",dataItem)
        dataItem.inEdit = undefined;
        this.update(this.state.data, dataItem, true);
        this.update(this.state.data, dataItem, true);
        this.setState({
            data: this.state.data.slice()
        });
        db.deleteEvent(this.state.id,dataItem.id,true)
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
        console.log('index=',index)
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
                db.getAllEvents(this.state.id).then(snapshot=>{
                let data=snapshot.val();
               
                console.log(' getAllEvents',data)
                let gridData=[]
                Object.keys(data).map((item,idx) => {
                    let event=data[item];
                    event.id=item;
                    event.order=++idx;
                    //skip isDeleted true
                    if(!event.isDeleted)
                      gridData.push(event);
                });
                this.setState({data:gridData})
               
             }).catch(err=>{
                 console.log('error',err);
             })
            })
        });
    }
  

    render() {
        let {data}=this.state;
      //  console.log('gridData',gridData)
        return (
            <div className="container" style={{paddingTop:"150px"}}>
             <h2>Events</h2>
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

                        <Column field="id" title="ID" width="80px" editable={false} />
                        <Column field="title" title="Event Title" width="250px" />
                        <Column field="description" title="Description"  width="250px" />
                        <Column field="date" title="Date" width="100px" />
                        <Column field="time" title="Time" width="100px" />
                        <Column field="location" title="Location" width="100px"  />
                        <Column field="order" title="Seq"  editable={false} width="40px" />
                        <Column cell={this.CommandCell} width="180px" />

                    </Grid>
                </div>
            </div>
        );
    }
}


const authCondition =(authUser)=>!!authUser;
export default withAuthorization(authCondition)(Events);