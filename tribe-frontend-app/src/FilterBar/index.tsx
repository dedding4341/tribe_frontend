import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import './FilterBar.css';

function FilterBar() {
  return (
    <div className="FilterBar">
      
      <Button><FontAwesomeIcon icon={faFilter} /> Unassigned tasks</Button>
      <Button><FontAwesomeIcon icon={faFilter} /> My tasks</Button>
      <Button><FontAwesomeIcon icon={faFilter} /> All tasks</Button>
    </div>
  )
}

export default FilterBar;