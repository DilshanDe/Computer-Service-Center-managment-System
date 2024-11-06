import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Container, Row, Col, Card } from 'react-bootstrap';
import AdminNavbar from './AdminNavbar';
import Footer from './Footer';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/orders/${orderId}`);
      setOrders(orders.filter((order) => order._id !== orderId)); // Remove the deleted order from the list
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <AdminNavbar currentPath="adminorders" />
     <div className='flex-grow'>
      <Container className="mt-5">
        <h2 className="mb-4 text-center"style={{ fontSize: '24px' }}>Admin: Orders and Billing Details</h2>

        {/* Table layout for larger screens */}
        <div className="d-none d-md-block">
          <Table striped bordered hover responsive>
            <thead className="thead-dark">
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Email</th>
                <th>Shipping Address</th>
                <th>Shipping Method</th>
                <th>Total</th>
                <th>Order Date</th>
                <th>Order Items</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</td>
                  <td>{order.shippingAddress.email}</td>
                  <td>
                    {order.shippingAddress.address}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.zip}<br />
                    Phone: {order.shippingAddress.phone}
                  </td>
                  <td>{order.shippingMethod}</td>
                  <td>RS. {order.total.toFixed(2)}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>
                    <ul>
                      {order.cart.map((item, index) => (
                        <li key={index}>
                          {item.name} - {item.quantity} x RS. {item.price.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td>
                    <Button variant="danger" onClick={() => deleteOrder(order._id)}>
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
            {orders.map((order) => (
              <Col key={order._id} xs={12} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title>Order ID: {order._id}</Card.Title>
                    <Card.Text>
                      <strong>User: </strong>{order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                      <strong>Email: </strong>{order.shippingAddress.email}<br />
                      <strong>Address: </strong>{order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.zip}<br />
                      <strong>Phone: </strong>{order.shippingAddress.phone}<br />
                      <strong>Shipping Method: </strong>{order.shippingMethod}<br />
                      <strong>Total: </strong>RS. {order.total.toFixed(2)}<br />
                      <strong>Order Date: </strong>{new Date(order.createdAt).toLocaleDateString()}<br />
                      <strong>Items:</strong>
                      <ul>
                        {order.cart.map((item, index) => (
                          <li key={index}>
                            {item.name} - {item.quantity} x RS. {item.price.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </Card.Text>
                    <Button variant="danger" onClick={() => deleteOrder(order._id)}>
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

export default AdminOrders;
