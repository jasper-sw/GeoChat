import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ChatRoom } from "../../entities/chat_room.entity";

@Injectable()
export class ChatRoomsService {
    constructor(
        @InjectRepository(ChatRoom)
        private readonly chatRoomRepository: Repository<ChatRoom>,
    ) {}

    async findAll(): Promise<ChatRoom[]> {
        return await this.chatRoomRepository.find();
    }

    async findOne(id: number): Promise<ChatRoom> {
        return await this.chatRoomRepository.findOne(id);
    }

    async create(chatRoom: ChatRoom): Promise<ChatRoom> {
        return await this.chatRoomRepository.save(chatRoom);
    }


}
