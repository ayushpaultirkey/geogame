import "./../style/output.css";
import H12 from "@library/h12";
import Dispatcher from "@library/h12.dispatcher";
import Login from "./component/auth/Login";
import Signup from "./component/auth/Signup";
import $ROOT from "./config/root";

@Component
class App extends H12.Component {
    constructor() {
        super();
        this.Tab = {
            "TabButtonHome": "",
            "Quiz": "",
            "Map": "",
            "Profile": ""
        }
    }

    /*
    load() {
        var map = L.map(this.element.createpostmap).setView([51.505, -0.09], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    }
    */

    TabChange(tab = "") {
        if(typeof(this.element[tab]) !== "undefined") {
            document.querySelectorAll(".tab-button").forEach(x => {
                x.classList.remove("font-bold")
            });
            document.querySelectorAll(".tab").forEach(x => {
                x.classList.add("hidden");
            });
            this.element[tab].classList.add("font-bold");
            this.element[tab.replace("Button", "")].classList.remove("hidden");
        };
    }

    load() {
        this.TabChange("TabButtonHome");
    }

    async init() {
        


    }
    async render() {
        return <>
            <div class="w-full h-full overflow-auto scroll relative">
                <div class="h-full flex">
                    <div class="bg-gray-200 p-4 px-5 border-r border-gray-400" style="min-width: 300px; max-width: 300px;">
                        <div class="flex flex-col">
                            <label class="font-bold">Geo Guesser</label>
                            <label class="text-xs">Menu</label>
                        </div>
                        <div class="flex flex-col space-y-2">
                            <button class="text-left tab-button" id="TabButtonHome" onclick={ () => this.TabChange("TabButtonHome") }>Home</button>
                            <button class="text-left tab-button" id="TabButtonQuiz" onclick={ () => this.TabChange("TabButtonQuiz") }>Quiz</button>
                            <button class="text-left tab-button" id="TabButtonMap" onclick={ () => this.TabChange("TabButtonMap") }>Map</button>
                            <button class="text-left tab-button" id="TabButtonProfile" onclick={ () => this.TabChange("TabButtonProfile") }>Profile</button>
                            <button class="text-left">Logout</button>
                        </div>
                        <div class="flex flex-col space-y-2 hidden">
                            <label>Question:</label>
                            <label class="font-bold text-sm">A place near agra, and a 7 wonders of the world</label>
                            <div class="w-full h-40 bg-gray-300 border border-gray-400"></div>
                            <label class="text-xs"><b>Hint:</b> 7 wonders of the world</label>
                            <button class="text-xs p-2 bg-blue-400 border border-blue-500">Check</button>
                        </div>
                    </div>
                    <div class="bg-gray-300 w-full">
                        
                        <div class="hidden bg-gray-800 w-full h-full relative">
                            <div class="bg-gray-200 border border-gray-300 inline-block absolute top-0 right-0 p-2 px-3">
                                <label>Time Remaining<br/><b>01:00</b></label>
                            </div>
                        </div>

                        <div class="w-full h-full p-6 px-7 flex flex-col space-y-4 overflow-auto tab" id="TabQuiz">
                            <label class="font-bold text-2xl">Quiz</label>
                            <input id="username" class="bg-gray-100 border border-gray-400 px-3 py-2 w-full sm:w-64 text-xs rounded-lg outline-0 transition-shadow hover:shadow-md" type="text" placeholder="Search quizes" />
                            <div class="grid grid-cols-2 gap-2">
                                <div class="bg-gray-100 h-40 border border-gray-400 rounded-md py-2 px-3 flex flex-col transition-shadow hover:shadow-md hover:bg-gray-200">
                                    <label class="text-xs font-bold">Quiz #1</label>
                                    <label class="text-sm">A place near agra, and a 7 wonders of the world</label>
                                </div>
                                <div class="bg-gray-100 h-40 border border-gray-400 rounded-md py-2 px-3 flex flex-col transition-shadow hover:shadow-md hover:bg-gray-200">
                                    <label class="text-xs font-bold">Quiz #1</label>
                                    <label class="text-sm">A place near agra, and a 7 wonders of the world</label>
                                </div>
                                <div class="bg-gray-100 h-40 border border-gray-400 rounded-md py-2 px-3 flex flex-col transition-shadow hover:shadow-md hover:bg-gray-200">
                                    <label class="text-xs font-bold">Quiz #1</label>
                                    <label class="text-sm">A place near agra, and a 7 wonders of the world</label>
                                </div>
                            </div>
                        </div>

                        <div class="w-full h-full p-6 px-7 flex flex-col space-y-4 overflow-auto tab" id="TabProfile">
                            <label class="font-bold text-2xl">Profile</label>
                            <b>@ayushpaultirkey</b>
                            <div class="flex flex-col space-y-1 text-sm">
                                <label>Total Quiz Played: <b>10</b></label>
                                <label>Total Points: <b>10</b></label>
                            </div>
                            <div class="space-y-4">
                                <label class="font-bold text-md">Posts:</label>
                                <div class="grid grid-cols-3 gap-2">
                                    <div class="bg-gray-100 hover:bg-gray-200 border border-gray-400 h-40 transition-shadow hover:shadow-md text-sm p-2 px-3 rounded-md overflow-hidden flex flex-col">
                                        <label>lorem ispm</label>
                                        <label class="text-xs font-bold">Location: 00, 00</label>
                                    </div>
                                    <div class="bg-gray-100 hover:bg-gray-200 border border-gray-400 h-40 transition-shadow hover:shadow-md text-sm p-2 px-3 rounded-md overflow-hidden flex flex-col">
                                        <label>lorem ispm</label>
                                        <label class="text-xs font-bold">Location: 00, 00</label>
                                    </div>
                                    <div class="bg-gray-100 hover:bg-gray-200 border border-gray-400 h-40 transition-shadow hover:shadow-md text-sm p-2 px-3 rounded-md overflow-hidden flex flex-col">
                                        <label>lorem ispm</label>
                                        <label class="text-xs font-bold">Location: 00, 00</label>
                                    </div>
                                    <div class="bg-gray-100 hover:bg-gray-200 border border-gray-400 h-40 transition-shadow hover:shadow-md text-sm p-2 px-3 rounded-md overflow-hidden flex flex-col">
                                        <label>lorem ispm</label>
                                        <label class="text-xs font-bold">Location: 00, 00</label>
                                    </div>
                                    <div class="bg-gray-100 hover:bg-gray-200 border border-gray-400 h-40 transition-shadow hover:shadow-md text-sm p-2 px-3 rounded-md overflow-hidden flex flex-col">
                                        <label>lorem ispm</label>
                                        <label class="text-xs font-bold">Location: 00, 00</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="w-full h-full p-6 px-7 flex flex-col space-y-4 overflow-auto tab" id="TabMap">
                            <label class="font-bold text-2xl">Map</label>
                            <div class="h-full bg-gray-400 border border-gray-500 overflow-hidden rounded-md"></div>
                        </div>

                        <div class="w-full h-full p-6 px-7 flex flex-col space-y-5 overflow-auto tab" id="TabHome">
                            <label class="font-bold text-2xl">Home</label>
                            <label class="font-bold text-md">Create Posts</label>
                            <div class="w-full rounded-md">
                                <div class="flex border border-gray-400 rounded-md">
                                    <div class="w-full bg-white rounded-l-md">
                                        <textarea class="w-full h-48 p-4 text-sm resize-none bg-transparent" placeholder="Write something for the post"></textarea>
                                        <button class="text-xs p-2 px-6 m-3 bg-blue-400 border border-blue-500 rounded-md hover:bg-blue-500 transition-colors">Create</button>
                                    </div>
                                    <div class="bg-gray-800 rounded-r-md" style="min-width: 350px; max-width: 350px;" id="createpostmap"></div>
                                </div>
                            </div>
                            <label class="font-bold text-md">Recent Posts</label>
                            <div class="grid grid-cols-2 gap-2">
                                <div class="bg-gray-100 hover:bg-gray-200 border border-gray-400 h-44 transition-shadow hover:shadow-md p-3 relative rounded-md">
                                    <label class="text-xs font-bold">@ayushpaultirkey</label>
                                </div>
                                <div class="bg-gray-100 hover:bg-gray-200 border border-gray-400 h-44 transition-shadow hover:shadow-md p-3 relative rounded-md">
                                    <label class="text-xs font-bold">@ayushpaultirkey</label>
                                </div>
                                <div class="bg-gray-100 hover:bg-gray-200 border border-gray-400 h-44 transition-shadow hover:shadow-md p-3 relative rounded-md">
                                    <label class="text-xs font-bold">@ayushpaultirkey</label>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div class="hidden h-full w-full flex items-center bg-gray-900 bg-opacity-50 backdrop-blur-sm absolute top-0 left-0">
                    
                    <div class="bg-gray-200 w-full p-6 flex flex-col space-y-3">
                        <label>Correct answer (+100 Points)</label>
                        <div class="space-x-2">
                            <button class="text-xs p-2 bg-blue-400 border border-blue-500">Next Question</button>
                            <button class="text-xs p-2 bg-gray-300 border border-gray-400">Go to Home</button>
                        </div>
                    </div>

                </div>
            </div>
        </>;
    }
};

H12.Component.Render(App, ".app");