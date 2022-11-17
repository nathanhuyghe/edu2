<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ChatRoom;
use App\Models\ChatMessage;
use Illuminate\Support\Facades\Auth;
use App\Events\NewChatMessages;

class ChatController extends Controller
{
    public function rooms( Request $request){
        return ChatRoom::all();
    }

    public function getRoom(Request $request){
        $chatrooms = ChatRoom::all();
        $chatroom = $chatrooms->where('user_1', $request->user1)
            ->orWhere('user_2', $request->user1)
            ->where('user_1', $request->user2)
            ->orWhere('user_2', $request->user2)
            ->get();

        return $chatroom;
    }

    public function messages($id){
        return ChatMessage::where('chat_room_id', $id)
            ->with('user')
            ->orderBy('created_at', 'ASC')
            ->get();
    }

    public function newMessage(Request $request, $id, $userId){
        $newMessage = new ChatMessage;
        $newMessage->user_id = $userId;
        $newMessage->chat_room_id = $id;
        $newMessage->message = $request->message;
        $newMessage->save();
        broadcast(new NewChatMessages($newMessage, $id));
        return $newMessage;
    }

    public function createRoom(Request $request){
        $newChatRoom = new ChatRoom;
        $newChatRoom->user_1 = $request->user_1;
        $newChatRoom->user_2 = $request->user_2;
        $newChatRoom->name = "chat." . $request->user_1 . "." . $request->user_2;
        $newChatRoom->save();

        return ChatRoom::create($request->all());
    }
}
