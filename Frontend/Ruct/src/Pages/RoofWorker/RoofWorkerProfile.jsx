import '../Workers.css';
import ProfilePicture from '../WorkersImages/img2.webp';

function RoofWorkerProfile(){
    return(
         <div className="Page-container">
                                <main class="details-container">
                                    <a href="electrical-worker.html" class="back-link">← Back to Roof Workers</a>
                                    <div class="profile-card">
                                        <img id="workerImage" src={ProfilePicture} alt="Worker profile"/>
                                        <div class="profile-info">
                                            <span class="available">Available for Work</span>
                                            <h1 id="workerName">Kavindu Vinod</h1>
                                            <p id="workerLocation"></p>
                                            <p id="workerExperience"></p>
                                            <p id="workerPrice" class="price"></p>
                                            <hr/>
                                            <h3>About Me</h3>
                                            <p id="workerDescription">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum a officiis quaerat consequatur qui consequuntur veniam. Ea iste adipisci quidem!</p>
                                            <h3>Services</h3>
                                            <ul id="workerServices">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione dignissimos, inventore architecto ipsum obcaecati voluptatem dicta consectetur odio quisquam distinctio delectus odit assumenda voluptate. Culpa animi molestiae amet aliquid sapiente.</ul>
                                            <h3>Contact Details</h3>
                                            <p ><span>Phone: </span><span id="workerPhone">+94 77 55 93 656</span> </p>
                                            <p ><span>Email: </span><span id="workerEmail">kavinduvinod63@gmail.com</span> </p>
                                            <a id="callButton" href="#" class="details-btn">Call Worker</a>
                                        </div>
                                    </div>
                                </main>
                            </div>

    )
}

export default RoofWorkerProfile