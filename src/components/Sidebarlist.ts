export type DashboardlistType = {
    title: string,
    coin: string,
    data: string,
    link: string,
    logo: string,
    name: string
}

export const dashboardlist = [
    {
        title: "Total Number of Visitors",
        coin: "",
        data: "...",
        link: "",
        logo: "icon-park:web-page",
        name: "visitors"
    },
    {
        title: "Total Number of Page View",
        coin: "",
        data: "...",
        link: "",
        logo: "icon-park:page-template",
        name: "views"
    },
    {
        title: "Total User",
        coin: "",
        data: "...",
        link: "",
        logo: "fa:users",
        name: "users"
    },
    {
        title: "Total Worker",
        coin: "",
        data: "...",
        link: "",
        logo: "fa:users",
        name: "workers"
    },
    {
        title: "Total User Coin",
        coin: "BTC",
        data: "8,777,984.46 ",
        link: "",
        logo: "ri:coins-line",
        name: "coin"
    },
    {
        title: "Total Earning",
        coin: "",
        data: "4,779,662.42871056",
        link: "",
        logo: "fluent-mdl2:money",
        name: "earning"
    },
    {
        title: "Total Transaction",
        coin: "",
        data: "...",
        link: "",
        logo: "emojione-v1:money-bag",
        name: "transaction"
    },
    {
        title: "Number of Pending Exchange",
        coin: "",
        data: "...",
        link: "",
        logo: "noto:currency-exchange",
        name: "pending_exchange"
    },
]

export const sidebarlist = [
    {
        logo: "ic:round-dashboard",
        text: "Dashboard",
        link: "dashboard",
        sub: null,
    },
    {
        logo: "zondicons:user",
        text: "User Management",
        link: null,
        sub: [
            {
                logo: "ic:round-dashboard",
                text: "Workers",
                link: "worker",
            },
            {
                logo: "ic:round-dashboard",
                text: "Users",
                link: "user",
            },
        ]
    },
    {
        logo: "icomoon-free:blog",
        text: "Blog Management",
        link: "blog",
        sub: null,
    },
    {
        logo: "mdi:faq",
        text: "FAQs",
        link: "faq",
        sub: null,
    },
    {
        logo: "logo",
        text: "Coin",
        link: "editor",
        sub: null,
    },
    {
        logo: "logo",
        text: "Admin and Role",
        link: "faq",
        sub: null,
    },
    {
        logo: "logo",
        text: "User Wallet",
        link: "faq",
        sub: null,
    },
    {
        logo: "logo",
        text: "Deposit/Withdraw",
        link: "faq",
        sub: null,
    },
    {
        logo: "logo",
        text: "Addons",
        link: "faq",
        sub: null,
    },
    {
        logo: "logo",
        text: "Trade Reports",
        link: "faq",
        sub: null,
    },
    {
        logo: "logo",
        text: "Fiat To Crypto Deposit",
        link: "faq",
        sub: null,
    },
    {
        logo: "logo",
        text: "Logs",
        link: "faq",
        sub: null,
    },
]