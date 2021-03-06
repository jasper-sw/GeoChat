import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ChatRoom } from "../entities/chat_room.entity";
import { ChatRoomsService } from "../providers/services/chat_rooms.service";
import * as crypto from 'crypto';

class ChatRoomBody {
    name: string;
    userLatitude: number;
    userLongitude: number;
}

@Controller()
export class ChatRoomsController {
    constructor(private chatRoomsService: ChatRoomsService) {}

    @Get('/chat_rooms')
    async index() {
        const chatRooms = await this.chatRoomsService.findAll();
        return { chatRooms };
    }

    @Get('/chat_rooms/:id')
    async show(@Param('id') id: string) {
        const chatRoom = await this.chatRoomsService.findOne(parseInt(id));
        return { chatRoom };
    }

    @Post('/chat_rooms')
    async create(@Body() body: ChatRoomBody) {
        let chatRoom = new ChatRoom();
        chatRoom.name = body.name;
        chatRoom.longitude = body.userLongitude;
        chatRoom.latitude = body.userLatitude;
        chatRoom.roomKey = crypto.randomBytes(8).toString('hex');
        chatRoom = await this.chatRoomsService.create(chatRoom);
        return { chatRoom };
    }
}

