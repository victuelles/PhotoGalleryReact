import React from 'react';
import CollectionAlbumRow from './CollectionAlbumRow'
import CollectionAlbumHighlight from './CollectionAlbumHighlight'

const CollectionPresentation = (props) => {
    let activeComponent =null;
    
    if(props.activeAlbum){
        // user clicked an album, show the contents of it
          console.log(" activeAlbum props",props.activeAlbum)
           const objReturn =
                 <CollectionAlbumHighlight album={props.activeAlbum}  setActiveAlbum={props.setActiveAlbum}   />
           
                 activeComponent=objReturn;
                
     } else
     if(props.allPhotos){
        //   show all Albums
        const objReturn = Object.keys(props.allPhotos).map((content, idx) => {
            const item =props.allPhotos[content];
            item.key=content;
            return <CollectionAlbumRow album={item}  key={item.key}  setActiveAlbum={props.setActiveAlbum}  />
        });
        activeComponent=objReturn;
    }


    return (
        <div className="container-fluid">
             <div className="row" style={{paddingTop:'30px'}}>
            {activeComponent} 
            </div >
        </div>
    )
}
 
export default CollectionPresentation;