import React, { useState,useEffect } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import '../Tabs/Tabs.scss';
import { Query, Mutation } from 'react-apollo';
import {useQuery, useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';

const CREATE_STAGES = gql`
    mutation createStages($stageName: String!,$type: String!) {
        createStages(stageName: $stageName,type: $type)
    }

`;

function TabData(props){
    let {stageData,unstageData,type,getUpdatedData,refetch} = props;
    const [createStages, { error }] = useMutation(CREATE_STAGES,{});
    const [newUnstageData,setUnstageData] = useState([]);
    const [newstageData,setStageData] = useState([]);

    const [inputVal,setInputVal] = useState("");
    useEffect(()=>{
        setUnstageData(unstageData);
        setStageData(stageData);
    },[stageData,unstageData])

    const create =()=>{
        createStages({
            variables:{
                stageName:inputVal,
                type:type
            }
        }).then(() =>{
            refetch();
        }).catch(error => {
            console.log(error);
        });

    }
 

    const removeFromLocal = (val)=>{
        setUnstageData([...newUnstageData,val]);
        let newUnstageDataArr = [];
        newUnstageDataArr = [...newUnstageData,val];
        const updatedstageData = newstageData.filter((item) => item.stageName !== val.stageName);
        setStageData([...updatedstageData]);
        getUpdatedData({["new"+type]:{"newunstage":newUnstageDataArr,"newstage":updatedstageData}})

    };
    const addToLocal = (val) =>{
        setStageData([...newstageData,val]);
        let newStageDataArr = [...newstageData,val];
        const updatedUnstageData = newUnstageData.filter((item) => item.stageName !== val.stageName);
        setUnstageData([...updatedUnstageData]);
        getUpdatedData({["new"+type]:{"newunstage":updatedUnstageData,"newstage":newStageDataArr}})

    }
    return(
        <Col sm="12" className="JourneyStages">
            <ul className="AddedStage">
                <li>Stage</li>
                {newstageData.map((val , index)=>(
                    <li key={index}><span>{val.stageName}</span> <i className="fa fa-minus float-right" onClick={(e) => removeFromLocal(val, e)}></i> </li>

                ))}  
            </ul>
            <div className="StagesSearch">
                <input type="text" value={inputVal} onChange={e => setInputVal(e.target.value)}></input>
                <button onClick={create}>Create New</button>
            </div>
            <ul className="RemovedStage">
                <li>Unstage</li>
                {newUnstageData.map((val , index)=>(
                    <li key={index}><span>{val.stageName}</span> <i className="fa fa-plus float-right" onClick={(e) => addToLocal(val, e)}></i> </li>

                ))}
            </ul>
        </Col>
      
    )
}

export default TabData;
