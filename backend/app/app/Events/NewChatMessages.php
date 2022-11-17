<?php

    namespace App\Events;

    use Illuminate\Broadcasting\Channel;
    use Illuminate\Broadcasting\InteractsWithSockets;
    use Illuminate\Broadcasting\PresenceChannel;
    use Illuminate\Broadcasting\PrivateChannel;
    use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
    use Illuminate\Foundation\Events\Dispatchable;
    use Illuminate\Queue\SerializesModels;
    use App\Models\ChatMessage;

    class NewChatMessages implements ShouldBroadcast
    {
        use SerializesModels;

        public $chatMessage;
        public $chatRoomId;

        /**
         * Create a new event instance.
         *
         * @return void
         */
        public function __construct(ChatMessage $chatMessage, $chatroomid)
        {
            $this->chatMessage = $chatMessage;
            $this->chatRoomId = $chatroomid;
        }

        /**
         * Get the channels the event should broadcast on.
         *
         * @return \Illuminate\Broadcasting\Channel|array
         */
        public function broadcastOn()
        {
            return new Channel("chat" . $this->chatRoomId );
        }
    }
