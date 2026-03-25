const { getDb } = require("../config/db");

exports.getUser = async (req, res) => {
  const {id} = req.params
  try{
    const db = getDb();
    const user = await db.get(`SELECT * FROM users WHERE id = ?`, [id]);
    return res.json({success: true, user})
  }catch(err){
    res.status(500).json({success: false, message: 'Error Getting User', error: err.message})
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const db = getDb();
    const {search, sort, order} = req.query;

    // Base Query 
    let query = `SELECT * FROM users`; 
    let params = []; 

    // Search filter 
    if(search) {
      query += ` WHERE name LIKE ? OR email LIKE ?`; 
      params.push(`%${search}%`, `%${search}%`); 
    }

    // Sorting 
    const allowedSortFields = ['name', 'email', 'id']; 
    const allowedOrder = ['asc','desc']; 
    if(sort && allowedSortFields.includes(sort)) {
      const sortOrder = allowedOrder.includes(order?.toLowerCase()) ? order.toUpperCase() : 'ASC';
      query += ` ORDER BY ${sort} ${sortOrder}`; 
    }

    const users = await db.all(query, params)
    return res.json({success: true, users});
  } catch (err) {
    res.status(500).json({success: false, message: 'Error Getting Users', error: err.message})
  }
} 

exports.createUser = async (req, res) => {
  try {
    const db = getDb();
    const {name, email, age, status} = req.body; 
    
    // Validation: Check for missing fields 
    if (!name || !email) {
      return res.status(400).json({success: false, message: 'Missing fields'}); 
    }

    // Age Restriction 
    if (age && age < 18) {
      return res.status(400).json({success: false, message: 'Age must be 18+'});
    }

    // Check if email already exists 
    const existingUser = await db.get(`SELECT * FROM users WHERE email = ?`, [email]); 
    if(existingUser) {
      return res.status(400).json({success: false, message: 'Email already in use'}); 
    }

    // Create User 
    const result = await db.run(`INSERT INTO users (name, email, age, status) VALUES (?, ?, ?, ?)`, [name, email, age || null, status || 'active']);

    
    const newUser = await db.get(`SELECT * FROM users WHERE id = ?`, [result.lastId])
    return res.status(201).json({success: true, message: 'User Successfully created.', user: newUser})
  } catch (err) {
    res.status(500).json({success: false, message: 'Error Creating User', error: err.message});
  }
}

exports.updateUser = async (req, res) => {
  try {
    const db = getDb(); 
    const {id} = req.params; 
    const {name, email, age, status} = req.body || {}; 

    // Check if user exists 
    const existingUser = await db.get(`SELECT * FROM users WHERE id = ?`, [id]); 
    if(!existingUser) {
      return res.status(404).json({success: false, message: 'User not found'}); 
    }

    // Email uniqueness 
    if(email) {
      const emailExists = await db.get(`SELECT * FROM users WHERE email = ? AND id != ?`, [email, id]); 
      if(emailExists) {
        return res.status(400).json({success: false, message: 'Email already in use'}); 
      }
    }

    // Age validation 
    if(age && age < 18){
      return res.status(400).json({success: false, message: 'Age must be 18+'}); 
    }

    const fields = []; 
    const values = []; 

    if (name !== undefined) {
      fields.push('name = ?'); 
      values.push(name); 
    }

    if (email !== undefined) {
      fields.push('email = ?'); 
      values.push(email);
    }

    if (age !== undefined) {
      fields.push('age = ?'); 
      values.push(age);
    }

    if (status !== undefined) {
      fields.push('status = ?'); 
      values.push(status); 
    }

    // if no fields provided 
    if (fields.length === 0) {
      return res.status(400).json({success: false, message: "No fields to update"}); 
    }

    values.push(id); 

    const query = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`; 
    await db.run(query, values); 
    
    // Updated user 
    const updatedUser = await db.get(`SELECT * FROM users WHERE id = ?`, [id]); 

    return res.json({
      success: true, message: 'User updated successfully', user: updatedUser
    });

  }catch(err){
    res.status(500).json({success: false, message: 'Error Updating User', error: err.message});
  }
} 

exports.deleteUser = async (req, res) => {
  try {
    const db = getDb(); 
    const {id} = req.params; 

    const result = await db.run(`DELETE FROM users WHERE id = ?`, [id]); 

    if(result.changes === 0) {
      return res.status(404).json({success: false, message: 'User not found'}); 
    }

    return res.status(200).json({success: true, message: "User deleted successfully"});
  } catch (err) {
    res.status(500).json({success: false, message: 'Error Deleting User', error: err.message});
  }
} 

