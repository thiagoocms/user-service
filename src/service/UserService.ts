import User from "../domain/User";


export default interface UserService{
    create(name: string,age: number): User;
    update(id:number, name: string, age: number): User | null;
    findById(id: number): User | null;
    findAll(): User[];
    delete(id: number): void;

}