export class Attachment{
    id: number;
    name: string;
    url: string;
    message: Message;
    constructor()
    {
        console.log('Message constructor');        
    }
}

export class Message{
    id: number;
    from: ChatClient;
    body:string;
    date_time: string;
    uuid: string;    
    attachments:Array<Attachment>;
    constructor(){
        console.log('message constructor');
    }    
}

export class ChatClient{
    id: number;
    name: string;
    photo:string;
    read:Boolean;
    unseen: number;
    is_group: Boolean;
    messages:Array<Message>;
    constructor(){
        console.log('Chat client constructor');
    }
    add_message(message: Message){
        this.messages.push(message);
    }
}


export class ChatGroupMessage extends Message{    
    parent_message: Message;
    group: ChatGroup;
}


export class UserMessage extends Message{
    sender: number;
    receiver: ChatUser;
}

export class ChatUser extends ChatClient{
    
}

export class ChatGroup extends ChatClient{        
    members: Array<ChatUser>;
    show_members: Boolean;
    created_by: ChatUser;
    constructor(){
        super()
        console.log('Chat Group constructor');      
        this.members = [];
        this.is_group = true;
    }
}