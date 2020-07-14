import React, { useState,useEffect } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import './Tabs.scss';
import { Query, Mutation } from 'react-apollo';
import {useQuery, useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import TabData from './../TabData/TabData.js';

const UPDATE_STAGES = gql`
    mutation updateStages($data: dataType!){
        updateStages(newData: $data)
    }
`;

    let stagesArr = [];
    let personaArr = [];
    let notesArr = [];
    
function Tabs(props){
    props = props.props;
    let {data, refetch} = props;
    const [inputVal,setInputVal] = useState("");
    const [activeTab, setActiveTab] = useState('1');

    const [stageData, setStageData] = useState([]);
    const [unstageData,setUnstageData] = useState([]);

    const [personaStageData, setPersonaStageData] = useState([]);
    const [personaUnstageData,setPersonaUnstageData] = useState([]);

    const [notesStageData, setNotesStageData] = useState([]);
    const [notesUnstageData, setNotesUnstageData] = useState([]);

    const [updateStages, { updateerror }] = useMutation(UPDATE_STAGES,{});


    // let obj = {};
    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
        
    }

    const updateStageFunc = () =>{
        let newobj = {...notesArr[0],...personaArr[0],...stagesArr[0]};
        updateStages({
            variables:{
                data:newobj
            }
        }).then(() =>{
            refetch();
        }).catch(error => {
            console.log(error);
        });
    }


    const getUpdatedData = (data) =>{
        console.log(data);
        if(Object.keys(data)[0] == "newstages") {
            stagesArr = [];
            stagesArr.push(data);
        }
        if(Object.keys(data)[0] == "newpersona"){
            personaArr = [];
            personaArr.push(data);
        }
        if(Object.keys(data)[0] =="newnotes"){
            notesArr = [];
            notesArr.push(data)
        } 
    }
    useEffect(()=>{
        if(data){
            setUnstageData(data.componentData[0].stages.unstage);
            setStageData(data.componentData[0].stages.stage);

            setPersonaStageData(data.componentData[0].persona.stage);
            setPersonaUnstageData(data.componentData[0].persona.unstage);

            setNotesStageData(data.componentData[0].notes.stage);
            setNotesUnstageData(data.componentData[0].notes.unstage);
        }
    }, [data]);
 
    return(
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}
                    >
                        Stages
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
                    >
                        Persona
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '3' })}
                        onClick={() => { toggle('3'); }}
                    >
                        Note Types 
                    </NavLink>
                </NavItem>
            </Nav>
            <div className="ButtonHolder">
                <Button color="primary" onClick={updateStageFunc}>Save</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </div>
            <TabContent activeTab={activeTab}>

                <TabPane tabId="1">
                <Row>
                    <TabData stageData = {stageData} unstageData = {unstageData} getUpdatedData={getUpdatedData} refetch = {refetch} type = "stages"/>
                </Row>
                </TabPane>
                <TabPane tabId="2">
                <Row>
                    <TabData stageData = {personaStageData} unstageData = {personaUnstageData} getUpdatedData={getUpdatedData} refetch = {refetch} type = "persona"/>
                </Row>
                </TabPane>
                <TabPane tabId="3">
                <Row>
                    <TabData stageData = {notesStageData} unstageData = {notesUnstageData} getUpdatedData={getUpdatedData} refetch = {refetch} type = "notes"/>
                </Row>
                </TabPane>
            </TabContent>
         </div>
        
    );
      
}
export default Tabs;