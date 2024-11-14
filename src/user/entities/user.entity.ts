import { Column, PrimaryGeneratedColumn, Entity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { UserRole } from "../interfaces/createUser.dto";

@Entity({ name: 'user' })
export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'name', nullable: false})
    name: string;

    @Column({name: 'email', nullable: false})
    email: string;

    @Column({name: 'phone'})
    phone: string;

    @Column({name: 'cpf', nullable: false})
    cpf: string;

    @Column({name: 'password', nullable: false})
    password: string;

    @Column({
        name: 'role',
        type: 'enum',
        enum: UserRole, 
    })
    role: UserRole;  
 
  
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

}