import '../register.css'

export default function Register(){
    return(
        <form action="" className="inscrire">
            <h1>INSCRIPTION</h1>
            <input type="text" placeholder="Nom" /><br />
            <input type="password" placeholder="Prenom" /><br />
            <input type="text" placeholder="Email" /><br />
            <input type="password" placeholder="Mot de passe" /><br />
            <button >S'INSCRIRE</button>
        </form>
    )
}