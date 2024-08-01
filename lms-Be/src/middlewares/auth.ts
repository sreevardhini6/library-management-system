import { User } from '../models/userModel';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const isAuthenticated = async (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    // console.log("authHeader in isAuthenticated:", authHeader); 
    if (!authHeader) {
        return res.status(401).json({ msg: "User is not authenticated" });
    }
    const token = authHeader.split(' ')[1]; 
    if (!token) return res.status(401).json({ msg: "User is not authenticated" });

    try {   
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = decoded;
        
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Invalid Token" });
    }
};

export const isAdmin = async (req: any, res: any, next: any) => {
    const authHeader = req.headers.authorization;
    // console.log("authHeader in isAdmin:", authHeader);
    if (!authHeader) {
        return res.status(401).json({ msg: "User is not authenticated" });
    }
    const token = authHeader.split(' ')[1]; 
    // console.log("Token in isAdmin:", token);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
        // console.log("decoded in isAdmin:", decoded);
        const user = await User.findById(decoded.userId);
        // console.log("user in isAdmin:", user);`
        if (!user) {
            return res.status(401).json({ msg: "User does not exist" });
        }
        if (!user.is_admin) {
            return res.status(403).json({ msg: "User is not admin" });
        }
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ msg: "Invalid Tokenadmin" });
    }
};
