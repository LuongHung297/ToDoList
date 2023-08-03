import { NavDropdown, Navbar, Nav, Form, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import avatar from '../asset/image/avatarSignIn.jpg'
import { useState } from 'react';
const NavComp = (props) => {
    const { UserData } = props
    const hisnavTory = useNavigate()
    const handelBack = () => {
        hisnavTory("/ProjectPage/" + UserData.UserId)
    }
    return (<>
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand style={{ cursor: "pointer" }} onClick={handelBack}>ToDo List</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Link
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '200px', fontSize: "20px" }}
                    >
                        {/* <Nav.Link href="#action1">Home</Nav.Link> */}
                        {/* <Nav.Link href="#action2">Link</Nav.Link>
                    <NavDropdown title="Link" id="navbarScrollingDropdown">
                        <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action4">
                            Another action
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action5">
                            Something else here
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Link href="#" disabled>
                        Link
                    </Nav.Link> */}
                    </Link>
                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Tìm kiếm project"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                    <div className='IconComp'>
                        <i className="fa fa-bell-o" aria-hidden="true"></i>
                        {!UserData ?
                            <i className="fa fa-user-o" aria-hidden="true"></i>
                            :
                            <div className='signInAv' style={{
                                backgroundImage: `url(${avatar})`
                            }} >
                            </div>
                        }
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar></>)
}
export default NavComp