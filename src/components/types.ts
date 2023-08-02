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
    question: string
    type: string
    status: string
    updatedAt: string
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

