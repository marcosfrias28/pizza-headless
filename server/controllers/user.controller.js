import { validateUser } from "../schema/userSchema.js";


export class UserController {
    constructor({userModel}) {
        this.userModel = userModel;
    }
    getUser = async (req, res) => {
        const {email, password} = req.query;
        const user = await this.userModel.getUser({email, password});
        res.json(user);
    }
    getById = async (req, res) => {
        const { id } = req.params;
        const userById = await this.userModel.getById({id});
        if (userById) return res.json(userById);
        res.status(404).json({message: 'User not found'});
     }
     create = async (req, res) => {
        const result = await validateUser(req.body);
        if (!result.success) {
          return res.status(400).json({message: 'Invalid User', errors: result.error});
        }
        const message = await this.userModel.create({input: result});
        res.json(message);
      }
      update = async(req, res) => {
        const { mail, password, newMail, newName, newPassword } = req.body;
        try {
            const result = await this.userModel.update({mail, password, newMail, newName, newPassword});
            if (!result) {
              return res.status(404).json({message: 'User not found'});
            }
        } catch (error) {
        }
    }
      delete = async (req, res) => {
        const { id } = req.params;
        await this.userModel.delete({id});
        res.json({message: 'User deleted successfully'});
      }
}

