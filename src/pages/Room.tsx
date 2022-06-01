import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import logo from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import "../styles/room.scss";


type RoomParams = {
    id: string;
}

type FireBaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string,
    },
    content: string,
    isAnswered: boolean,
    isHighLighted: boolean,

}>;

type Questions = {
    id:string,
    author: {
        name: string,
        avatar: string,
    },
    content: string,
    isAnswered: boolean,
    isHighLighted: boolean,
}


export function Room() {
    const params = useParams<RoomParams>();
    const { user } = useAuth();

    const [newQuestion, setNewQuestion] = useState('');
    const navigate = useNavigate();
    const [questions,setQuestions] = useState<Questions[]>([]);
    const [title,setTitle] = useState('');

    const roomId = params.id ? params.id : "";

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);

        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FireBaseQuestions = databaseRoom.questions ?? {};
            const parsedQuestion = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighLighted: value.isHighLighted,
                    isAnswered: value.isAnswered,

                }
            });
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestion);

        });
    }, [roomId])

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();

        if (newQuestion.trim() === '') {
            return;
        }

        if (!user) {
            throw new Error("you must be logged");
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar
            },
            isHighLighted: false,
            isAnswered: false,
        };

        await database.ref(`rooms/${roomId}/questions`).push(question);

        setNewQuestion("");
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logo} alt="let me ask" />
                    <RoomCode code={roomId} />
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 && <span>{questions.length} pergunta(s)</span> }
                    
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea
                        placeholder='O que vc quer perguntar'
                        onChange={event => setNewQuestion(event.target.value)}
                        value={newQuestion}

                    />

                    <div className="form-footer">
                        {user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt="" />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para envuiar uma pergunta, <button onClick={() => navigate('/')}>Faça seu login</button>.</span>

                        )}
                        <Button type='submit' disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>
            </main>
        </div>
    );
}