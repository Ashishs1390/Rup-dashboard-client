import React,{useState,useEffect,useContext,useMemo} from 'react';
import {SendJourneyData} from './../components/JourneyModal/JourneyModal.js'
// 
function UseAddJourneyHook(data){
    const addedData = useContext(SendJourneyData);
    console.log(addedData);
    return (
        <div>
            <p>dsds</p>
        </div>
    )
    
}

export default UseAddJourneyHook;