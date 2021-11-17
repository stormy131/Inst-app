import { CurrentUserDto } from "./currentUser.dto";

export class CommentDto{
    comment: {
        text: string,
        sender?: number
    };
    user: CurrentUserDto;
}