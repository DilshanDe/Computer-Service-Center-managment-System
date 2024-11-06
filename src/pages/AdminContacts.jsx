import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Button, Row, Col, Card } from 'react-bootstrap';

import Footer from './Footer';
import AdminNavbar from './AdminNavbar';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/contacts');
        setContacts(response.data);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };

    fetchContacts();
  }, []);

  const deleteContact = async (contactId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/contacts/${contactId}`);
      setContacts(contacts.filter(contact => contact._id !== contactId));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <AdminNavbar />
      <div className='flex-grow'>
      <Container className="mt-5">
        <h2 className="mb-4 text-center"style={{ fontSize: '24px' }}>Admin: Contacts</h2>

        {/* Table layout for larger screens */}
        <div className="d-none d-md-block">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Contact ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Contact No</th>
                <th>Message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id}>
                  <td>{contact._id}</td>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.contactNo}</td>
                  <td>{contact.message}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => deleteContact(contact._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Card layout for smaller screens */}
        <div className="d-md-none">
          <Row>
            {contacts.map((contact) => (
              <Col key={contact._id} xs={12} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{contact.name}</Card.Title>
                    <Card.Text>
                      <strong>Contact ID: </strong>{contact._id}<br />
                      <strong>Email: </strong>{contact.email}<br />
                      <strong>Phone: </strong>{contact.contactNo}<br />
                      <strong>Message: </strong>{contact.message}<br />
                    </Card.Text>
                    <Button
                      variant="danger"
                      onClick={() => deleteContact(contact._id)}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
      </div>
      <Footer />
    </div>
  );
};

export default AdminContacts;
