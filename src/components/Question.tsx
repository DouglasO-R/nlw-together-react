import { ReactNode } from "react";
import "../styles/question.scss";

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    },
    children?: ReactNode,
    isAnswered: boolean;
    isHighLighted: boolean;
}


export function Question({ content, author, children, isAnswered, isHighLighted }: QuestionProps) {

    return (
        <div className={`question ${isAnswered ? 'answered' : ''} ${isHighLighted && !isAnswered ? 'highlighted' : ''}`}>
            <p>{content}</p>
            <footer>
                <div className="user-info">
                    <img src={author.avatar} alt={author.avatar} />
                    <span>{author.name}</span>
                </div>
                <div>{children}</div>
            </footer>
        </div>
    )
}