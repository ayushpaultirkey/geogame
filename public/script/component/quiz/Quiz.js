import H12 from "@library/h12";
import Dispatcher from "@library/h12.dispatcher";
import Card from "./Card";

@Component
class Quiz extends H12.Component {
    constructor() {
        super();
        this.id = "Quiz";
        this.map = null;
        this.marker = null;
        this.circle = null;
    }
    async init() {
        
        //When quiz start hide quiz list and show panel and load map
        Dispatcher.On("OnQuizStart", () => {

            this.element.quizlist.classList.add("hidden");
            this.element.quizmap.classList.remove("hidden");

            this.LoadMap();

        });

        //Dispatcher to check for answer using the map
        Dispatcher.On("OnQuizCheck", (args) => {

            //Get detail that was passed from the quiz navigation
            let _detail = args.detail;
            let _coordinate = args.detail.quiz_coordinate.split(",");

            //Prepare navigation coordinate
            let _latlonMarker = new L.LatLng(this.marker._latlng.lat, this.marker._latlng.lng);
            let _latlonAnswer = new L.LatLng(_coordinate[0], _coordinate[1]);

            //Check for the location
            if(_latlonAnswer.distanceTo(_latlonMarker) < 8500) {

                //Call correct dispatcher
                Dispatcher.Call("OnQuizCorrect", _detail);
                    
                //Get point
                let _gametotal = localStorage.getItem("game_total");
                let _gamepoint = localStorage.getItem("game_point");
                
                //Increase point
                localStorage.setItem("game_total", ((_gametotal) !== null) ? ((_gametotal * 1) + 1) : 1);
                localStorage.setItem("game_point", ((_gamepoint) !== null) ? ((_gamepoint * 1) + 100) : 100);

            }
            else {
                Dispatcher.Call("OnQuizWrong");
            };

        })

    }
    
    OnRouterEnter() {
        
        //
        Dispatcher.Call("OnMenuShow");
        Dispatcher.Call("OnQuizQuit");

        //
        this.element.quizmap.classList.add("hidden");
        this.element.quizlist.classList.remove("hidden");

        //
        this.LoadQuiz();

    }

    OnRouterLeave() {

        Dispatcher.Call("OnQuizQuit");
        Dispatcher.Call("OnMenuShow");

    }

    async render() {
        return <>
            <div class="w-full h-full">
                <div class="w-full h-full p-6 px-7 flex flex-col space-y-4 overflow-auto tab" id="quizlist">
                    <label class="font-bold text-2xl">Quiz ❓</label>
                    <input id="username" class="bg-gray-100 border border-gray-400 px-3 py-2 w-full sm:w-64 text-xs rounded-lg outline-0 transition-shadow hover:shadow-md" type="text" placeholder="Search quizes" />
                    <div class="grid grid-cols-2 gap-2">
                        {quiz.card}
                    </div>
                </div>
                <div id="quizmap" class="hidden bg-gray-800 w-full h-full"></div>
            </div>
        </>;
    }

    LoadMap() {

        if(this.map == null) {

            //Create new map
            this.map = L.map(this.element.quizmap).setView([23.296068, 77.428961], 5);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(this.map);
    
            //Create default marker
            this.marker = new L.marker({lat: 23.725011735951796, lng: 76.18675231933595}).addTo(this.map);
            this.circle = L.circle([51.508, -0.11], { color: 'red', fillColor: '#f03', fillOpacity: 0.5, radius: 8500 }).addTo(this.map);

            //Add event
            this.map.on('click', (event) => {
                if(this.marker && this.circle) {
                    this.map.removeLayer(this.marker);
                    this.map.removeLayer(this.circle);
                };
                this.marker = new L.marker(event.latlng).addTo(this.map);
                this.circle = L.circle(event.latlng, { color: 'red', fillColor: '#f03', fillOpacity: 0.2, radius: 8500 }).addTo(this.map);
            });
            
        }
        else {
            console.warn("Map already loaded");
        }

    }
    
    async LoadQuiz() {

        try {

            //Get data
            const _response = await fetch(`/api/quiz/list`);
            const _data = await _response.json();
 
            //Check if user exists
            if(!_data.success && _data.redirect.length > 0) {
                window.location.hash = _data.redirect;
            };

            //Check if the list data is empty
            if(_data.data.length > 0) {

                //Clear item
                this.Set("{quiz.card}", "");

                //Add item
                for(var i = 0, len = _data.data.length; i < len; i++) {
                    let _item = _data.data[i];
                    this.Set("{quiz.card}++", <><Card args index={ i } title={ _item.quiz_title } data={ _item }></Card></>)
                };

            };


        }
        catch(exception) {
            alert(exception);
        };

    }

};

export default Quiz;