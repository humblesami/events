export class Attachment{
    id: number;
    name: string;
    url: string;
    message: Message;
    constructor(a: number, b: string, c: string, d: Message)
    {
        console.log('Message constructor');
        this.id = a;
        this.name = b;
        this.url = c;
        this.message = d;
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
    receiver: ChatUser;
}

export class ChatUser extends ChatClient{
    constructor(){
        super();
        console.log('Chat user constructor');
    }
}

export class ChatGroup extends ChatClient{        
    members: Array<ChatUser>;
    is_group: Boolean;
    constructor(){
        super()
        console.log('Chat Group constructor');      
        this.members = [];
        this.is_group = true;
    }
}