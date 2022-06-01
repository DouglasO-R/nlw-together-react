import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import IlustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

import "../styles/auth.scss"

export function NewRoom() {
    const [newRoom, setNewRoom] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();
        
        if(newRoom.trim() === ''){
            return;
        }
        
        const roomRef = database.ref('rooms');
        const firebaseRoom =await roomRef.push({
            title:newRoom,
            authorId:user?.id
        });

        navigate(`/rooms/${firebaseRoom.key}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={IlustrationImg} alt="ilustration" />
                <strong>Crie salas de Q&amp;A</strong>
                <p>Tire suas duvidas em tempo real</p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Let me Ask" />
                    <h1>{user?.name}</h1>
                    <h2>Criar uma nova sala</h2>

                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder="digite o codigo da sala"
                            value={newRoom}
                            onChange={event => setNewRoom(event.target.value)}
                        />

                        <Button type="submit">
                            entrar na sala
                        </Button>

                    </form>
                    <p>
                        Quer entrar em uma sala Existente <Link to='/'>clique aqui</Link>
                    </p>
                </div>

            </main>
        </div>
    );
}