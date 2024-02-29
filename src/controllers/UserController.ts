import { Request, Response } from "express";
import { UserNotFoundError } from "../errors/errors";
import UserService from "../service/UserService";

export default class UserController{
    
    private userService: UserService;

    constructor(userService: UserService){
        this.userService = userService
    }


    async listAll(req: Request, res: Response){
        const users = await this.userService.findAll();
        return res.status(200)
            .json(users)
    }

    async findById(req: Request, res: Response){
        const id = Number(req.params.id)
        const user = await this.userService.findById(id);
        if(user)
            return res.status(200)
                .json(user)
        else
            return res.status(404).send()
    }

    async create(req: Request, res: Response) {
        const {name, age} = req.body
        if(!name)
            return res.status(400).json({ message: 'O nome é obrigatório' })
        if(!age)
            return res.status(400).json({ message: 'A idade é obrigatória' })
        try {
            const user = await this.userService.create(name,age);
            return res.status(201).json(user)
        } catch (error) {
            return res.status(500)
                .json({
                    error: error
                })
        }
    }

    async update(req: Request, res: Response){
        const {name, age} = req.body
        if(!name)
            return res.status(400).json({ message: 'O nome é obrigatório' })
        if(!age)
            return res.status(400).json({ message: 'A idade é obrigatória' })

        const id = Number(req.params.id)
        try {
            const user = await this.userService.update(id,name,age);
            return res.status(200).json(user)
        } catch(error) {
            let status = 500
            if (error instanceof UserNotFoundError) {
                status = 404
            }
            return res.status(status)
            .json({
                error: error
            })
        }
    }

    async delete(req: Request, res: Response) {
        const id = Number(req.params.id)
        try {
            await this.userService.delete(id)
            return res.status(204).send()
        } catch (error) {
            if(error instanceof UserNotFoundError)
                return res.status(404).send();
        }
    }
}