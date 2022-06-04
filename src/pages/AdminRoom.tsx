import { useNavigate, useParams } from "react-router-dom";
import { database } from "../services/firebase";

import logo from '../assets/images/logo.svg';
import deletImg from "../assets/images/delete.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';

import { useRoom } from '../hooks/useRoom';


import "../styles/room.scss";


type RoomParams = {
    id: string;
}

export function AdminRoom() {
    const navigate = useNavigate();
    const params = useParams<RoomParams>();
    const roomId = params.id ? params.id : "";
    const { questions, title } = useRoom(roomId);


    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
            endedAt: new Date(),
        });
        navigate('/');
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm("tem certeza que deseja excluir essa pergunta? ")) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleCheckQuestionAsAnswerd(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,

        });

    }

    async function handleHightlightQuestion(questionId: string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isHighLighted: true,
        });

    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logo} alt="let me ask" />

                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={() => handleEndRoom()}>Encerar sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}

                </div>

                <div className="question-list">
                    {questions.map((question) => (
                        <Question
                            key={question.id}
                            content={question.content}
                            author={question.author}
                            isAnswered={question.isAnswered}
                            isHighLighted={question.isHighLighted}
                        >

                            {!question.isAnswered && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => handleCheckQuestionAsAnswerd(question.id)}
                                    >
                                        <img src={checkImg} alt="marcar como respondida" />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => handleHightlightQuestion(question.id)}
                                    >
                                        <img src={answerImg} alt="dar destaque a pergunta pergunta" />
                                    </button>
                                </>
                            )}

                            <button
                                type="button"
                                onClick={() => handleDeleteQuestion(question.id)}
                            >
                                <img src={deletImg} alt="Deletar pergunta" />
                            </button>
                        </Question>
                    ))}
                </div>
            </main>
        </div>
    );
}