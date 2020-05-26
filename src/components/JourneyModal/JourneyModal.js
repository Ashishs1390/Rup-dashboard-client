import React,{useState,useRef} from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



function JourneyModal(){
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const journeyForm = useRef(null);
    const ADD_JOURNEY = gql`
    mutation  addUserJourney($name:String, $desc:String ) {
        addJourney(name: $name, desc: $desc) {
          name,
          desc
        }
      }
        `;
        const [addJourneyInfo, { data }] = useMutation(ADD_JOURNEY);
        
        const addJourney = () =>{
        const form = journeyForm.current;
        const journeyName = form['journeyname'].value;
        const journeyDesc = form['journeydesc'].value;
        


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


