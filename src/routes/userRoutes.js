const express = require("express"); 
const {
  getUser,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser
} = require("../controller/userController");

const router = express.Router(); 

router.get('/users/:id', getUser); 
router.get('/users', getAllUsers); 
router.post('/users', createUser); 
router.put('/users/:id', updateUser); 
router.delete('/users/:id', deleteUser);

module.exports = router; 