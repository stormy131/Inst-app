interface AccountInList{
    readonly id: number,
    readonly username: string
}

interface Account{
    readonly email: string,
    readonly username: string,
    readonly id: number,
    readonly desc?: string
}

interface UpdateAccount {
    readonly email?: string,
    readonly password?: string,
    readonly username?: string,
    readonly desc?: string
}

export {
    Account,
    AccountInList,
    UpdateAccount
};