import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { users } from '../models.js';
import { sendEmail } from '../utils/email.js';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

export async function register(req, res) {
    const { username, password, email, role } = req.body;
    if (!username || !password || !email || !role) return res.status(400).json({ msg: 'Missing fields' });
    if (users.find(u => u.username === username)) return res.status(409).json({ msg: 'User exists' });
    const hashed = await bcrypt.hash(password, 10);
    const user = { username, password: hashed, email, role };
    users.push(user);
    await sendEmail(email, 'Registration Successful', `Welcome, ${username}! You have registered as ${role}.`);
    res.status(201).json({ msg: 'Registered successfully' });
}

export async function login(req, res) {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) return res.status(401).json({ msg: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ msg: 'Invalid credentials' });
    const token = jwt.sign({ username: user.username, role: user.role }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    res.json({ token });
}
