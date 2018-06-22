import React from 'react';
import { Card, CardImg, CardText, CardBody} from 'reactstrap';


   
const AlbumCard = (props) => {
   
    console.log("AlbumCard",props.card)
    const setActive=(e)=>{
        e.preventDefault();
        console.log("row clicked",props.album);
    //    props.setActiveAlbum(null);
       
    }
    return (
       
            <Card onClick={setActive} key={props.card.filename}  >
                <CardImg top width="50%" src={props.card.url}/>
                <CardBody>
                    <CardText>{props.card.filename}</CardText>
                </CardBody>
            </Card>

   
    
    )
}
 
export default AlbumCard