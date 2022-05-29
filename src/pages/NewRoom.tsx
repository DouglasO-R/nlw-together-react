import { useContext } from "react";
import { Link } from "react-router-dom";

import IlustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

import { Button } from "../components/Button";
import { AuthContext } from "../contexts/AuthContexts";
import { useAuth } from "../hooks/useAuth";

import "../styles/auth.scss"

export function NewRoom() {
    const { user } = useAuth();

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

                    <form>
                        <input
                            type="text"
                            placeholder="digite o codigo da sala"
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