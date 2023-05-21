import {db} from '../dbConnection.js'
import jwt from "jsonwebtoken"


export const login = (req, res) =>{
	const q = "SELECT * FROM ratownicy WHERE email = ?";
	
	db.query(q, [req.body.email], (err, data) =>{
		if(err) return res.status(500).json(err);
		if(data.length===0) return res.status(404).json("User not found");
		if(req.body.HASLO!==data[0].HASLO) return res.status(400).json("Wrong password");

		const {HASLO, ...others} = data[0];
		const token = jwt.sign({id:data[0].ID_RATOWNIKA},"secretkey");
		res.cookie("accessToken", token, {
			httpOnly: true,
		}).status(200).json(others);
	})

	
}

export const logout = (req, res)=>{
	res.clearCookie("accessToken",{
		secure: true,
		sameSite:"none"
	}).status(200).json("User logout")
}