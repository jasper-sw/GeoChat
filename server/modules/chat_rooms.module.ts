import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ChatRoom } from "../entities/chat_room.entity";
import { Message } from "../entities/message.entity";
import { ChatRoomsController } from "../controllers/chat_rooms.controller";
import { ChatRoomsService } from "server/providers/services/chat_rooms.service";
import { GuardUtil } from "server/providers/util/guard.util";
import { JwtService } from "server/providers/services/jwt.service";
import { MessagesService } from "../providers/services/messages.service";
import { MessagesGateway } from "../providers/gateways/messages.gateway";

@Module({
    imports: [TypeOrmModule.forFeature([ChatRoom, Message])],
    controllers: [ChatRoomsController],
    providers: [ChatRoomsService, MessagesGateway, MessagesService, JwtService, GuardUtil],
    exports: [],
})

export class ChatRoomsModule {}
