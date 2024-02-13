export type messageTypes = {
    createdAt: string;
    fileImage: string;
    fromAdmin: string;
    msg: string;
    room: string;
    username: string;
    _id: string;
};

export type chatsTypes = {
    category: string;
    createdDate: string;
    messages: messageTypes[];
    priority: string;
    status: string;
    subject: string;
    email: string;
    _id: string;
};

export type dashboardType = {
    sender: string,
    receiver: string,
    address: string,
    currency: string,
    amount: string,
    fees: string,
    transactionId: string,
    date: string,
}

export type faqType = {
    _id: number;
    question: string
    type: string
    status: string
    date: string
}

export type blogType = {
    _id: number;
    img: string;
    title: string
    subtitle: string
    text: string,
    author: string,
    date: string,
    category: string,
}

