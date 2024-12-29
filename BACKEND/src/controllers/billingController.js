const Billing = require('../models/Billing');
const Item = require('../models/Item');
const User = require('../models/User');
const { sendEmail } = require('../utils/emailUtils');  // Importing email utility function

// Create a new bill
const createBill = async (req, res) => {
  const { customerId, items } = req.body;

  try {
    const customer = await User.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    let totalAmount = 0;
    const billItems = [];

    // Calculate the total amount and prepare items array
    for (let i = 0; i < items.length; i++) {
      const item = await Item.findById(items[i].itemId);
      if (!item) {
        return res.status(404).json({ message: `Item not found for ID ${items[i].itemId}` });
      }

      const totalPrice = item.price * items[i].quantity;
      totalAmount += totalPrice;

      billItems.push({
        itemId: item._id,
        quantity: items[i].quantity,
        price: item.price,
        totalPrice,
      });
    }

    // Create the bill
    const newBill = new Billing({
      customerId,
      items: billItems,
      totalAmount,
      status: 'pending',
    });

    await newBill.save();
    
    // Send email to customer after bill creation
    const customerEmail = customer.email;
    const subject = "New Bill Created";
    const text = `Dear ${customer.name},\n\nYour bill of amount $${totalAmount} has been successfully created. The bill is currently pending.\n\nThank you for using our service.`;
    const html = `<p>Dear ${customer.name},</p><p>Your bill of amount <strong>$${totalAmount}</strong> has been successfully created. The bill is currently <strong>pending</strong>.</p><p>Thank you for using our service.</p>`;
    await sendEmail(customerEmail, subject, text, html);

    res.status(201).json({ message: 'Bill created successfully', bill: newBill });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all bills (admin only)
const getAllBills = async (req, res) => {
  try {
    const bills = await Billing.find().populate('customerId', 'name email').populate('items.itemId', 'name price');
    res.status(200).json(bills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single bill by ID (accessible by admin or the customer)
const getBillById = async (req, res) => {
  const { billId } = req.params;

  try {
    const bill = await Billing.findById(billId).populate('customerId', 'name email').populate('items.itemId', 'name price');
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    // Allow customer to view only their own bills
    if (bill.customerId._id.toString() !== req.userId && req.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this bill' });
    }

    res.status(200).json(bill);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update bill status (admin only)
const updateBillStatus = async (req, res) => {
  const { billId } = req.params;
  const { status } = req.body;

  try {
    const bill = await Billing.findById(billId);
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    // Only admin can update bill status
    if (req.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update bill status' });
    }

    bill.status = status;
    await bill.save();

    // Send email to customer after bill status update
    const customer = await User.findById(bill.customerId);
    const subject = `Your Bill Status Updated: ${status}`;
    const text = `Dear ${customer.name},\n\nYour bill status has been updated to ${status}.\n\nThank you for using our service.`;
    const html = `<p>Dear ${customer.name},</p><p>Your bill status has been updated to <strong>${status}</strong>.</p><p>Thank you for using our service.</p>`;
    await sendEmail(customer.email, subject, text, html);

    res.status(200).json({ message: 'Bill status updated successfully', bill });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a bill (admin only)
const deleteBill = async (req, res) => {
  const { billId } = req.params;

  try {
    const bill = await Billing.findById(billId);
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    // Only admin can delete a bill
    if (req.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this bill' });
    }

    await bill.remove();

    // Send email to customer about bill deletion
    const customer = await User.findById(bill.customerId);
    const subject = "Your Bill Has Been Deleted";
    const text = `Dear ${customer.name},\n\nYour bill has been deleted from our records.\n\nThank you for using our service.`;
    const html = `<p>Dear ${customer.name},</p><p>Your bill has been deleted from our records.</p><p>Thank you for using our service.</p>`;
    await sendEmail(customer.email, subject, text, html);

    res.status(200).json({ message: 'Bill deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createBill,
  getAllBills,
  getBillById,
  updateBillStatus,
  deleteBill,
};
