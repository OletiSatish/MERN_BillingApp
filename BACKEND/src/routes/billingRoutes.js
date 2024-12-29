const express = require('express');
const router = express.Router();
const {
  createBill,
  getAllBills,
  getBillById,
  updateBillStatus,
  deleteBill,
} = require('../controllers/billingController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Routes for billing
router.post('/create', authMiddleware, createBill);
router.get('/', authMiddleware, roleMiddleware('admin'), getAllBills);
router.get('/:billId', authMiddleware, getBillById);
router.put('/:billId/status', authMiddleware, roleMiddleware('admin'), updateBillStatus);
router.delete('/:billId', authMiddleware, roleMiddleware('admin'), deleteBill);

module.exports = router;
