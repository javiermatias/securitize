import React, { useState } from 'react';
import { Form, FormControl, Button, Modal, Spinner, Card, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { WalletService } from '../../services/wallet.service';


const AddWallet: React.FC<any> = ({ onAdd }) => {
  const [address, setAddress] = useState('');
  const walletsService = new WalletService();
  const [showModal, setShowModal] = useState(false);
  const [Message, setMessage] = useState('');
  const [Title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);



  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await walletsService.createWallet(address);
      setAddress(address);
      onAdd();
      setTitle('Sucess');
      setMessage('The Wallet has been added');
      setShowModal(true);
    } catch (err: any) {
      setTitle('Error');
      setMessage(err.response.data.message);
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>


      <Navbar className='mt-3' bg="primary" expand="lg">
        <Container fluid>
          <Navbar.Brand className='w-25 text-light' href="#">Add Your Wallet</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">

            <Form onSubmit={handleSubmit} className="d-flex  w-100">
              <Form.Control
                value={address}
                onChange={e => setAddress(e.target.value)}
                type="search"
                placeholder="Search"
                className="me-3 w-75"
                aria-label="Search"
                required
              />
              <Button className='bg-light text-dark' type="submit" variant="outline-success" disabled={isLoading}>
                {isLoading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  "Add Wallet"
                )}
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{Title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{Message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddWallet;