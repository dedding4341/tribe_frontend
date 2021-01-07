import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import './FilterBar.css';

interface IProps {
  filter: Function
}

function FilterBar({filter}: IProps) {

  const handleFilter = (filterType: String) => {
    filter(filterType);
  }

  return (
    <div className="FilterBar">
      <Button className="shadow-none" onClick={() => handleFilter("all")}><FontAwesomeIcon icon={faFilter} /> Active tasks</Button>
      <Button className="shadow-none" onClick={() => handleFilter("unassigned")}><FontAwesomeIcon icon={faFilter} /> Unassigned tasks</Button>
      <Button className="shadow-none" onClick={() => handleFilter("myTasks")}><FontAwesomeIcon icon={faFilter} /> My tasks</Button>
    </div>
  )
}

export default FilterBar;