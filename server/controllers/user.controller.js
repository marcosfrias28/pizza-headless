import { validateUser } from "../schema/userSchema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserController {
    constructor({userModel}) {
        this.userModel = userModel;
    }
    login = async (req, res) => {
      const {email, password} = req.body;
        const user = await this.userModel.login({email, password});
        if (user.error) {
          return res.status(400).json({error: user.error});
        }
        const token = jwt.sign({ id: user.id, email: user.email}, process.env.TOKEN_SECRET, {
          expiresIn: '1h'
        });
        return res.cookie('access-token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 1000 * 60 * 60
        }).status(200).json({user});
    }
     register = async (req, res) => {
        const {name, email, password} = req.body;
        const result = await validateUser({name, email, password});
        if (result.success) {
          try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = {name, email, password: hashedPassword};
            const message = await this.userModel.register(user);
            return res.json(message);
          } catch {
            res.status(500).json({message: 'Error creating user'});
          }
      } else {
          return res.status(400).json({message: 'Invalid User', error: result.error});
        }
      }
      logout = async (req, res) => {
        const {id} = req.query;
        const message = await this.userModel.delete({id});
        res.json(message);
      }
}

