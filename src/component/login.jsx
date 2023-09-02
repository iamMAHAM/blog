import '../login.css'

export default function Login(){
    return(
        <form action="" className="form">
            <h1>CONNEXION</h1>
            <input type="text" placeholder="Email" /><br />
            <input type="password" placeholder="Mot de passe" /><br />
            <button>CONNECTER</button>
        </form>
    )
}