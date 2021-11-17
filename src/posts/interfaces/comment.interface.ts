import { CurrentUser } from "./currentUser.interface";

export interface Comment{
    comment: {
        text: string,
        sender?: number,
        fromPost?: number
    },
    user: CurrentUser
}