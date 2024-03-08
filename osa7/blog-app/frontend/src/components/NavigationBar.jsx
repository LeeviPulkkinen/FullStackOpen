import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavigationBar = ({ user, handleClick }) => {
  const padding = { padding: 5 };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/">
              <Button>Blogs</Button>
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link style={padding} to="/users">
              <Button>Users</Button>
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            {user.name} logged in
            <Link style={padding} to="/login">
              <Button onClick={handleClick}>Logout</Button>
            </Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavigationBar;
