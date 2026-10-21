import './Home.css';
import Slogan from '../assets/Slogan.png';

function Home(){
    return(
        <main className="main-container">
            
            <section className="Hero-section">
                <img src={Slogan} alt="One Platform One Industry" className="Slogan"/>
            </section>
            <hr />
            <article className="About">
                <span className="About-title">Ruct (Pvt) Ltd.</span><br /><br />

                    At <span className="About-bold">Ruct</span>, we connect people across Sri Lanka with skilled construction professionals in their local areas. From constrution and masonry to plumbing, painting, tiling, and electrical services, roof work we make finding the right worker simple and convenient. <br /><br />

                    Our mission is to connect customers with skilled workers and create new opportunities across Sri Lanka's construction industry. <br /><br />

                    <span className="About-bold">Ruct — One Platform. One Industry.</span> 
            </article>
            <hr />
            <section className="Categories-btn">
                <a href="#"><button className="btn">Construction</button></a>
                <a href="#"><button className="btn">Mason<br />Work</button></a>
                <a href="#"><button className="btn">Plumbing</button></a>
                <a href="#"><button className="btn">Electrical<br />Work</button></a>
                <a href="#"><button className="btn">Tile<br />Work</button></a>
                <a href="#"><button className="btn">Painting</button></a>
                <a href="#"><button className="btn">Roof<br />Work</button></a>
                
            </section>
        </main>
    )
}

export default Home