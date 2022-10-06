import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('hotel')
export class Hotel {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column() 
    owner:string 

    @Column()
    price:number 

    @Column("text",{array:true, default:[]}) 
    reservations:string[]
    
}