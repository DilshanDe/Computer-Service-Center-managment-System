import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Button, Row, Col, Card } from 'react-bootstrap';

import Footer from './Footer';
import AdminNavbar from './AdminNavbar';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };
    fetchAppointments();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/appointments/${id}`);
      setAppointments(appointments.filter(appointment => appointment._id !== id));
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <AdminNavbar />
      <div className='flex-grow'>
      <Container className="mt-5">
        <h2 className="mb-4 text-center"style={{ fontSize: '24px' }}>Appointment Bookings</h2>

        {/* Table for larger screens */}
        <div className="d-none d-md-block">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Service</th>
                <th>Appointment Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment._id}>
                  <td>{appointment.name}</td>
                  <td>{appointment.email}</td>
                  <td>{appointment.phone}</td>
                  <td>{appointment.service}</td>
                  <td>{new Date(appointment.appointmentDate).toLocaleDateString()}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleDelete(appointment._id)}>
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
            {appointments.map((appointment) => (
              <Col key={appointment._id} xs={12} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>{appointment.name}</Card.Title>
                    <Card.Text>
                      <strong>Email: </strong>{appointment.email}<br />
                      <strong>Phone: </strong>{appointment.phone}<br />
                      <strong>Service: </strong>{appointment.service}<br />
                      <strong>Date: </strong>{new Date(appointment.appointmentDate).toLocaleDateString()}
                    </Card.Text>
                    <Button variant="danger" onClick={() => handleDelete(appointment._id)}>
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

export default AdminAppointments;
