import React from 'react'
import AllComplaints from './all_complaints';
import AssignedComplaints from './assigned_complaints';
import PendingComplaints from './pending_complaints';

const RenderComponent = ({index}) => {
  switch (index) {
    case 0:
        return <AllComplaints/>
        
    case 1:
        return <AssignedComplaints/>
       
    case 2:
        
        return <PendingComplaints/>
    default:
        break;
  }
}

export default RenderComponent