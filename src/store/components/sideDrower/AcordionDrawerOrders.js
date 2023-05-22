import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { Link } from 'react-router-dom';
import {MdArrowDropDown} from 'react-icons/md';
import { useSelector } from 'react-redux';
import "./AcordionDrawer.css";

function AcordionDrawerCategory() {
  const category = useSelector(state => state.category);
  const {categoriesLoaded, categories} = category;
  const [open, setOpen] = useState(false);
  return(
<div
  className="sidedrawer__links"
 onClick={e => {
    e.stopPropagation();}}
>
  <Button
  className='sidedrawer__button'
  onClick={() => setOpen(!open)}
  aria-controls="example-collapse-text"
  aria-expanded={open}
>
  Categories <MdArrowDropDown />
</Button>
<Collapse in={open}>
    <ul id='list-dropdown'>
      {categoriesLoaded ? categories.map((category, index) => (
      <li key={index}>
        <Link to={`/store/category/${category._id}`}>
          {category.name}
        </Link>
      </li>
      )) : null}
    </ul>
</Collapse>
</div>
  );
}

export default AcordionDrawerCategory;