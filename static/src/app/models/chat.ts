export class Attachment{
    id: string;
    name: string;
    url: string;
    message: Message;
    constructor(a: string, b: string, c: string, d: Message)
    {
        console.log('Message constructor');
        this.id = a;
        this.name = b;
        this.url = c;
        this.message = d;
    }
}

export class Message{
    from: ChatClient;
    body:string;
    date_time: string;
    uuid: string;
    attachments:Array<Attachment>;
    constructor(from_: ChatClient, body_: string, date_time_: string, attachments: Array<Attachment>)
    {
        console.log('Message constructor');
        this.from = from_;
        this.body = body_;
        this.date_time = date_time_;
        this.attachments = attachments;
    }
}

export class ChatClient{
    id: string;
    name: string;
    photo:string;
    read:Boolean;
    unseen: 0;
    messages:Array<Message>;
    constructor(a: string, b: string, c:string, d: Array<Message>){
        console.log('Chat Group constructor');
        this.id = a;
        this.name = b;
        this.photo = c;
        this.messages = d;
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

export class User{
    id: string;
    name: string;
    photo:string;
    constructor(a: string, b: string, c:string){
        console.log('User constructor');
        this.id = a;
        this.name = b;
        this.photo = c;
    }
}

export class ChatUser extends ChatClient{

}

export class ChatGroup extends ChatClient{        
    members: Array<User>;
    constructor(a: string, b: string, c:string, d:Array<Message>, e: Array<User>){
        super(a,b, c, d);        
        console.log('Chat Group constructor');      
        this.members = e;
    }    
}