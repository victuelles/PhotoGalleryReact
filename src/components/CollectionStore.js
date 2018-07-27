import React, { Component } from 'react';


const CollectStore = ({match}) => {
    console.log("match=",JSON.stringify(match))
    return (
        <div style={{paddingTop:'120px'}}>
            <h3>ID: {match.params.id} </h3>
        </div>
        )
}
 
export default CollectStore;
