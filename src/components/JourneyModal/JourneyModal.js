import React,{useState,useRef,memo} from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import UseAddJourneyHook from './../../hooks/useAddJourneyHook.js'
import ProjectRoutes from './../../ProjectRoutes/ProjectRoutes.js';

export const SendJourneyData = React.createContext();

function JourneyModal({JourneyModalCallback}){
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const journeyForm = useRef(null);
  const [journeyData,setJourneyData] = useState({});
  const ADD_JOURNEY = gql`
  mutation  addUserJourney($name:String, $desc:String ) {
      addJourney(name: $name, desc: $desc) {
        name,
        desc
      }
    }
      `;
  const [addJourneyInfo, { data }] = useMutation(ADD_JOURNEY,{
    onCompleted({addJourney}){
      setJourneyData(addJourney || undefined);
    }
  });
  
  const addJourney = () =>{
    const form = journeyForm.current;
    const journeyName = form['journeyname'].value;
    const journeyDesc = form['journeydesc'].value;
    JourneyModalCallback({
      "name":journeyName,
      "desc":journeyDesc
    })
    addJourneyInfo({variables:{
      name: journeyName,
      desc:journeyDesc
    }});

  }
    return (
        <div>
          <Button color="danger" onClick={toggle}>Add Journey</Button>
          <Modal isOpen={modal} toggle={toggle} className="Journey">
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>
                <div className="JourneyInfo" >
                <form ref={journeyForm}>
                    <p>
                        <label>Name</label>
                        <input placeholder="journey name..." name="journeyname"></input>
                    </p>
                    <p>
                        <label>Description</label>
                        <input placeholder="description..." name="journeydesc"></input>
                    </p>
                </form>
                    
                </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={addJourney}>Submit</Button>{' '}
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </div>
      );
}

export default JourneyModal;


