import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { Link } from 'react-router-dom';
import {MdArrowDropDown} from 'react-icons/md';
import "./AcordionDrawer.css";

function AcordionDrawer() {
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
  Administrator <MdArrowDropDown />
</Button>
<Collapse in={open}>
    <ul id='list-dropdown'>
      <li><Link to="/store/admin/dashboard" >Options</Link></li>
      <li><Link to="/store/admin/orders">Orders</Link></li>
      <li><Link to="/store/admin/products">Products</Link></li>
      <li><Link to="/store/admin/category">Categories</Link></li>
    </ul>
</Collapse>
</div>
  );
}

export default AcordionDrawer;