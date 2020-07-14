import React,{useContext, useEffect,useState} from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import './Journeys.scss'
import JourneyModal from './../../components/JourneyModal/JourneyModal.js';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
  import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
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
    const [callbackData,setCallbackData] = useState({});
    const [journeyData,setJourneyData]= useState([]);
    const JourneyModalCallback = (obj) =>{
        console.log(obj)
        setCallbackData(obj);
        console.log("JourneyModalCallback");
    }
    useEffect(()=>{
        if(data != undefined){
            setJourneyData(data.journeys);
        }
        
    },[data]);

    useEffect(()=>{
        console.log(callbackData)
        setJourneyData(prevData => [...prevData,callbackData]);
        debugger;
        console.log(journeyData);
    },[callbackData]);
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;
    if(journeyData.length){
        console.log(journeyData);
        return (
            <div className="JourneyWrapper">
                <div className="JourneyBtn">
                    <JourneyModal className="add-btn" JourneyModalCallback = {JourneyModalCallback}></JourneyModal>
                </div>
            {journeyData.map((journey,index)=>{
            return(
                    <div className="ShowJourneys" key= {index}>
                    <Card>
                        <CardBody>
                            <CardTitle>{journey.name}</CardTitle>
                            <CardText>{journey.desc}</CardText>
                            <Link className="NavChild" to={`/Journey/View/${index}`}><Button>View Journey</Button></Link>

                            
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