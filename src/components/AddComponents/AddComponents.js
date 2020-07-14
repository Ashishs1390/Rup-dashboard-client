import React,{useState, useEffect} from 'react';

import { Query, Mutation } from 'react-apollo';
import {useQuery, useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Tabs from './../Tabs/Tabs.js';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const AddComponents= ()=>{
  const { data,setData } = useQuery(FETCH_ALL_QUERY);
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);
    useEffect(()=>{
      console.log(data)
    },[data]);
    return (
      <Query query={FETCH_ALL_QUERY}>
           {({ data, loading, error, refetch }) => {
      let props = {
        data,
        refetch
      }
      if (loading) return <p>Loading...</p>;
      if (error) return <p>ERROR</p>;
      return(
        <div>
      <Button color="danger" onClick={toggle}>Add Components</Button>
      <Modal isOpen={modal} style={{ maxWidth: '700px'}} toggle={toggle}  className="className">
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <div>
              <Tabs props = {props} />
          </div>  
        </ModalBody>
       
      </Modal>
    </div>
     );
    }}
    </Query>
    )
};

const FETCH_ALL_QUERY = gql`
  {componentData{
  stages {
    stage{
      id
      stageName
    }
    
    unstage{
      id
      stageName
    }
  }
  persona{
    stage{
      id
      stageName
    }
    unstage{
      id
      stageName
    }
  }
  notes {
    stage {
      id
      stageName
    }
    unstage{
      id
      stageName
    }
  }
}}
`;

export default AddComponents;