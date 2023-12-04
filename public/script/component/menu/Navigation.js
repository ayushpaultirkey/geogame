import H12 from "@library/h12";
import Dispatcher from "@library/h12.dispatcher";

@Component
class Navigation extends H12.Component {
    constructor() {
        super();
    }
    async init() {
        
        Dispatcher.On("OnQuizStart", () => { this.root.classList.add("hidden") });
        Dispatcher.On("OnQuizQuit", () => { this.root.classList.remove("hidden") });
        
    }
    async render() {
        return <>
            <div class="flex flex-col space-y-2">
                <button class="text-left" onclick={ () => window.location.hash = "#home" }>Home</button>
                <button class="text-left" onclick={ () => window.location.hash = "#quiz" }>Quiz</button>
                <button class="text-left" onclick={ () => window.location.hash = "#map" }>Map</button>
                <button class="text-left" onclick={ () => window.location.hash = "#profile" }>Profile</button>
                <button class="text-left" onclick={ this.Logout }>Logout</button>
            </div>
        </>;
    }
    async Logout() {

        try {

            const _response = await fetch("/api/user/logout");
            const _data = await _response.json();
            
            localStorage.clear();

            Dispatcher.Call("OnMenuHide");
            Dispatcher.Call("OnQuizQuit");
            
            if(_data.redirect.length > 0) {
                window.location.hash = _data.redirect;
            };

        }
        catch(exception) {
            alert(exception);
        };


    }
};

export default Navigation;