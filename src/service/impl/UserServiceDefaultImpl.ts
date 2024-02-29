import User from "../../domain/User";
import UserService from "../UserService";
import { UserNotFoundError } from "../../errors/errors";

export default class UserServiceDefaultImpl implements UserService{
    
    private list: User[] = []

    findAll(): User[] {
        return this.list;
    }

    findById(id: number): User | null {
        return this.list.filter(item => item.id == id)[0];
    }

    create(name: string,age: number): User{
        const user = new User(
            this.list.length + 1,
            name,
            age
        );
        this.list.push(user);
        return user;
    }

    update(id: number, name: string, age: number): User|null {
        const user = this.findById(id);
        if(!user)
            throw new UserNotFoundError("User not found");
        const userUpdated = {
            id: user.id,
            name: name,
            age: age
        }
        this.list.splice(this.list.indexOf(user), 1, userUpdated);
        return user;
    }


    async delete(id: number) {
        const user = this.findById(id);
        if(!user)
            throw new UserNotFoundError("User not found");
        await this.list.splice(this.list.indexOf(user), 1);
    }
    
}