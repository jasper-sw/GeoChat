import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Message } from "./message.entity";

@Entity()
export class ChatRoom {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    roomKey: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @OneToMany((type) => Message, (message) => message.chatRoom)
    messages: Message[];
}


