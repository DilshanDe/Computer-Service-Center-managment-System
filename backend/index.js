const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const sendEmail = require('./emailService');

const app = express();
app.use(cors());
app.use(express.json({ limit: '300mb' }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/DemoDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User schema and model
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model('User', userSchema);

// Contact message schema and model
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  address: String,
  contactNo: String,
  message: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// Appointment schema and model
const appointmentSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  service: String,
  appointmentDate: Date,
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

// Order schema and model
const orderSchema = new mongoose.Schema({
  cart: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  subTotal: Number,
  discount: Number,
  shippingFee: Number,
  total: Number,
  shippingMethod: String,
  shippingAddress: {
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    address: String,
    city: String,
    state: String,
    zip: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderSchema);

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const newUser = new User(req.body);
    await newUser.save();
    sendEmail(email, 'Welcome to Beez', 'Thank you for join with us..Stay strong!');
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering user' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    // Send user details in response
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in user' });
  }
});

// Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending message' });
  }
});

// Fetch contact form submissions for admin
app.get('/api/admin/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching contacts' });
  }
});
// Delete a contact by ID
app.delete('/api/admin/contacts/:id', async (req, res) => {
  try {
    const contactId = req.params.id;
    const deletedContact = await Contact.findByIdAndDelete(contactId);
    if (!deletedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting contact' });
  }
});

// Appointment booking endpoint with 10 appointments per day limit
app.post('/api/appointment', async (req, res) => {
  try {
    const { appointmentDate,email } = req.body;   

    const startOfDay = new Date(appointmentDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(appointmentDate);
    endOfDay.setHours(23, 59, 59, 999);

    const appointmentCount = await Appointment.countDocuments({
      appointmentDate: { $gte: startOfDay, $lt: endOfDay },
    });

    if (appointmentCount >= 10) {
      return res.status(400).json({ error: 'Appointment is Full. Try for another date.' });
    }

    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    sendEmail(email, 'Booking Appointment',"Beez",'<h1>Your Booking Details</h1><h4>Thank you for make a booking with us..</h4><br> Your Booking Date : '+startOfDay + '<br><br><p>Beez Team<p>' );
    res.status(201).json({ message: 'Appointment booked successfully. Please come on that day.' });
  } catch (error) {
    res.status(500).json({ error: 'Error booking appointment' });
  }
});
// Fetch all appointments for admin
app.get('/api/admin/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching appointments' });
  }
});
// Delete an appointment by ID
app.delete('/api/admin/appointments/:id', async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);

    if (!deletedAppointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting appointment' });
  }
});

// Order submission endpoint
app.post('/api/order', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const {cart,shippingAddress,shippingMethod,total,createdAt, subTotal, shippingFee} = newOrder;
    const {email} = shippingAddress;
        
    await newOrder.save();

    const htmlContent = generateOrderEmail(cart, shippingAddress, shippingMethod, total, createdAt, subTotal, shippingFee);

    sendEmail(email, 'Beez Order', 'Thank you for buying from us..',htmlContent
    );
    
    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error placing order' });
  }
});

function generateOrderEmail(cart, shippingAddress, shippingMethod, total, createdAt, subTotal, shippingFee) {
  const cartItems = cart.map(item => `
    <tr>
      <td style="padding: 10px; border: 1px solid #ddd;">${item.name}</td>
      <td style="padding: 10px; border: 1px solid #ddd;">${item.quantity}</td>
      <td style="padding: 10px; border: 1px solid #ddd;">${item.price}</td>
      <td style="padding: 10px; border: 1px solid #ddd;">${item.price * item.quantity}</td>
    </tr>
  `).join('');

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee;">
      <h2 style="text-align: center;">Thank you for your order!</h2>
      <p style="font-size: 16px;">Order Date: ${new Date(createdAt).toLocaleString()}</p>

      <h3 style="border-bottom: 1px solid #ddd; padding-bottom: 10px;">Order Summary</h3>
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr>
            <th style="padding: 10px; border: 1px solid #ddd;">Product</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Quantity</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Price</th>
            <th style="padding: 10px; border: 1px solid #ddd;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${cartItems}
        </tbody>
      </table>

      <p style="font-size: 16px;"><strong>Subtotal:</strong> Rs. ${subTotal}</p>
      <p style="font-size: 16px;"><strong>Shipping Fee:</strong> Rs. ${shippingFee}</p>
      <p style="font-size: 18px;"><strong>Total:</strong> Rs. ${total}</p>

      <h3 style="border-bottom: 1px solid #ddd; padding-bottom: 10px;">Shipping Information</h3>
      <p style="font-size: 16px;">
        <strong>Name:</strong> ${shippingAddress.firstName} ${shippingAddress.lastName}<br/>
        <strong>Phone:</strong> ${shippingAddress.phone}<br/>
        <strong>Email:</strong> ${shippingAddress.email}<br/>
        <strong>Address:</strong> ${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.zip}<br/>
        <strong>Shipping Method:</strong> ${shippingMethod}
      </p>
    </div>
  `;
}


// Fetch all orders for admin
app.get('/api/admin/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching orders' });
  }
});
// Delete an order by ID
app.delete('/api/admin/orders/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting order' });
  }
});
//Admin Signup
const AdminSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  password: String,
}, { collection: 'Admin_details' });

// Compile the schema into a model
const Admin = mongoose.model('Admin', AdminSchema);

app.post('/AdminRegister', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: 'Admin already exists' });
    }
    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ name, email, phone, password: hashedPassword });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.log(error); // Logging the error can help in debugging
    res.status(500).json({ error: 'Error registering Admin' });
  }
});

//AdminLogin
app.post('/AdminLogin', async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ error: 'Admin not found' });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in Admin' });
  }
});

//Add Product from Admin to store
const productSchema = new mongoose.Schema({
  imageUrl: String,
  name: String,
  description: String,
  price: Number,
  type: String,
}, { collection: 'Product_List' });

const Product = mongoose.model('Product', productSchema);

app.post('/AddProduct', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: 'Product added successfully' });
  } catch (error) {
    console.error('Failed to add product:', error);
    res.status(500).json({ error: 'Error adding product' });
  }
});
app.get('/getProducts', async (req, res) => {
  try {
    const productList = await Product.find({});
    res.json(productList);
  } catch (error) {
    console.error('Failed to retrieve products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//Add Repairs from Admin
const AddRepairSchema = new mongoose.Schema({
  name: String,
  email: String,
  productName: String,
  nic: String,
  repairDescription: String,
  acceptanceDate: String,
  model: String,
  mobile: String,
  status: { type: String, default: 'pending' },
  priority: { type: Boolean, default: false }, // priority field
  billItems: [
    {
      item: String,
      price: Number
    }
  ],
  totalAmount: { type: Number, default: 0 }
}, { collection: 'Repairs' });

const AddRepair = mongoose.model('AddRepair', AddRepairSchema);


// Add Repair form submission endpoint
app.post('/api/repairs', async (req, res) => {
  try {
    const newRepair = new AddRepair(req.body);  // Handles the priority field
    await newRepair.save();
    res.status(201).json({ message: 'Repair Item Added to Queue' });
  } catch (error) {
    res.status(500).json({ error: 'Error Adding Repair Item' });
  }
});


//get the repair items
app.get('/api/repairs', async (req, res) => {
  try {
    const repairs = await AddRepair.find();
    res.json(repairs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching repairs' });
  }
});

// Update repair status to "Repairing"
app.put('/api/repairs/:id/status', async (req, res) => {
  try {
    const repairId = req.params.id;
    await AddRepair.findByIdAndUpdate(repairId, { status: 'Repairing' });
    res.status(200).json({ message: 'Repair status updated to Repairing' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating repair status' });
  }
});

// Update repair item with bill data
app.put('/api/repairs/:id', async (req, res) => {
  const { id } = req.params;
  const { billItems, totalAmount, status } = req.body;

  try {
    const updatedRepair = await AddRepair.findByIdAndUpdate(
      id,
      { billItems, totalAmount, status },
      { new: true }
    );
    res.status(200).json(updatedRepair);
  } catch (error) {
    res.status(500).json({ error: 'Error updating repair item' });
  }
});

// Get repair item to bill summery
app.get('/api/repairs/:id', async (req, res) => {
  try {
    const repair = await AddRepair.findById(req.params.id);
    if (!repair) {
      return res.status(404).json({ error: 'Repair not found' });
    }
    res.status(200).json(repair);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching repair item' });
  }
});

//Repaired Prducts
const RepairedProductSchema = new mongoose.Schema({
  name: String,
  email: String,
  productName: String,
  nic: String,
  repairDescription: String,
  acceptanceDate: String,
  model: String,
  mobile: String,
  status: String,
  priority: Boolean,
  billItems: [
    {
      item: String,
      price: Number
    }
  ],
  totalAmount: Number
}, { collection: 'RepairedProducts' });

const RepairedProduct = mongoose.model('RepairedProduct', RepairedProductSchema);

//Move the Repair to RepairedProducts
app.post('/api/repairs/:id/complete', async (req, res) => {
  const { id } = req.params;
  try {
    // Find the repair item
    const repair = await AddRepair.findById(id);

    if (!repair) {
      return res.status(404).json({ error: 'Repair not found' });
    }

    // Create a new RepairedProduct from the repair
    const repairedProduct = new RepairedProduct({
      ...repair._doc,
      status: 'Completed'  // Update status to Completed
    });

    // Save to RepairedProducts collection
    await repairedProduct.save();

    // Delete from Repairs collection
    await AddRepair.findByIdAndDelete(id);

    res.status(200).json({ message: 'Repair completed and moved to RepairedProducts' });
  } catch (error) {
    res.status(500).json({ error: 'Error completing repair' });
  }
});

//fetch all repaired products for display
app.get('/api/repairedproducts', async (req, res) => {
  try {
    const repairedProducts = await RepairedProduct.find();
    res.status(200).json(repairedProducts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching repaired products' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
