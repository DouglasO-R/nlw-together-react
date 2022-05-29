import { useNavigate } from "react-router-dom";

import IlustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

import { Button } from "../components/Button";

import "../styles/auth.scss"
import { useAuth } from "../hooks/useAuth";



export function Home() {

    const navigate = useNavigate();
    const { user, signInWithGoogle } = useAuth();
    async function handleCreateRoom() {
        
        if(!user){
            await signInWithGoogle();
        }

        navigate("/rooms/new");
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

                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="logo do google" />
                        crie sua sala com google
                    </button>

                    <div className="separator">
                        ou entre em uma sala
                    </div>

                    <form action="">
                        <input
                            type="text"
                            placeholder="digite o codigo da sala"
                        />

                        <Button type="submit">
                            entrar na sala
                        </Button>

                    </form>

                </div>

            </main>
        </div>
    );
}