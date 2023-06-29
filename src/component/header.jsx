import '../header.css'

export default function Header (){
    return(
        <header>
            <p><span>R</span>eact<span>B</span>log</p>

            <ul>
                <a href=""><li>Accueil</li></a>
                <a href=""><li>Blog</li></a>
                <a href=""><li>Apropos</li></a>
                <a href=""><li>Contacts</li></a>
            </ul>
        </header>
    )
}