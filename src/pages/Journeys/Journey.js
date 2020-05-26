import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import './Journeys.scss'
import JourneyModal from './../../components/JourneyModal/JourneyModal.js'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
const GET_JOURNEY = gql`
{
    journeys{
    id,
    name,
    desc
    }
}
`;

function Journeys(){

    const { loading, error, data } = useQuery(GET_JOURNEY);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if(data.journeys.length){
        return (
            <div className="JourneyWrapper">
                <div className="JourneyBtn">
                    {/* <Button >Add Journey</Button> */}
                    <JourneyModal className="add-btn"></JourneyModal>
                </div>
            {data.journeys.map((journey)=>{
            return(
                    <div className="ShowJourneys">
                    <Card>
                        <CardBody>
                            <CardTitle>{journey.name}</CardTitle>
                            <CardText>{journey.desc}</CardText>
                            <Button>Button</Button>
                        </CardBody>
                    </Card>
                </div>

               
            )  
                
        })}
        </div>
        );
    }else {
        return null
    }
    
}

export default Journeys;