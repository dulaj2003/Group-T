import '../Workers.css';
import ProfilePicture from '../WorkersImages/img2.webp';

function PlumberProfile() {
    return(
        <div>

                <main className="details-container">
                    <a href="plumber.html" class="back-link">← Back to Plumbers</a>
                    <div className="profile-card">
                        <img id="workerImage" src={ProfilePicture} alt="Worker profile"/>
                        <div className="profile-info">
                            <span className="available">Available for Work</span>
                            <h1 id="workerName">Worker Name</h1>
                            <p id="workerLocation"></p>
                            <p id="workerExperience"></p>
                            <p id="workerPrice" class="price"></p>
                            <hr/>
                            <h3>About Me</h3>
                            <p id="workerDescription"></p>
                            <h3>Services</h3>
                            <ul id="workerServices"></ul>
                            <h3>Contact Details</h3>
                            <p id="workerPhone"></p>
                            <p id="workerEmail"></p>
                            <a id="callButton" href="#" class="details-btn">Call Worker</a>
                        </div>
                    </div>
                </main>
        </div>
    )
}

export default PlumberProfile