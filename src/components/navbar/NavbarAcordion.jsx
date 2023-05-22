import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Card from 'react-bootstrap/Card';
import { TiArrowSortedDown } from 'react-icons/ti';
import { Link } from 'react-router-dom';

function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('totally custom!'),
    );

    return (
        <button
            type="button"
            style={{
                width: '100%',
                backgroundColor: 'transparent',
                minWidth: '60px',
                border: 'none',
                fontSize: '20px',
                color: 'rgb(30, 30, 30)',
                fontSize: '15px',
                fontWeight: '600',
            }}
            onClick={decoratedOnClick}
        >
            {children}
        </button>
    );
}

function NavbarAcordion({ tittle, links }) {
    return (
        <Accordion defaultActiveKey="0">
            <Card >
                <Card.Header>
                    <CustomToggle eventKey="1">{tittle}
                        <TiArrowSortedDown
                            style={{ fontSize: '14px', color: '#000' }} />
                    </CustomToggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        {links.map((link) => (
                            <div className="accordion-link">
                                {link}
                            </div>

                        ))}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>

        </Accordion>
    );
}

export default NavbarAcordion