import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import CinemaLogo from "../../assets/cinema-icon.png";

function Header() {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid className="d-flex flex-row mb-3">
          <div className="d-flex justify-content-left align-items-center p-2">
            <img
              src={CinemaLogo}
              style={{ maxHeight: "50px" }}
              alt="Icon Image"
            />
            <Navbar.Brand href="">Cinema +</Navbar.Brand>
          </div>
          <div className="d-flex justify-content-center align-items-center  p-2">
            <Form className="d-flex justify-content-center">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </div>
          <div className="d-flex justify-content-right align-items-center p-2">
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse
              id="navbarScroll"
              className="justify-content-between d-flex flex-row mb-2"
            >
              <Nav.Link className="p-2" href="#home">
                Home
              </Nav.Link>
              <Nav.Link className="p-2" href="#link">
                My Favorites
              </Nav.Link>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
