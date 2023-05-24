import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';

function DropdownCategory() {
    const navigate = useNavigate();
    const category = useSelector(state => state.category);
    const { categories, categoriesLoaded } = category;
    
    const handleNavigate = (id) => {
        navigate(`/store/category/${id}`);
    }

  return (
    <DropdownButton variant='dark' id="dropdown-secondary-button" title="Categorias">
        {categoriesLoaded && categories.map(category => (
            <Dropdown.Item key={category._id}
                onClick={() => handleNavigate(category._id)} 
            >
              {category.name}
            </Dropdown.Item>
        ))} 

    </DropdownButton>
  );
}

export default DropdownCategory;