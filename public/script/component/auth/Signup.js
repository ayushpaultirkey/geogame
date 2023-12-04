import H12 from "@library/h12";
import Dispatcher from "@library/h12.dispatcher";

@Component
class Signup extends H12.Component {
    constructor() {
        super();
    }
    async init() {

        Dispatcher.Call("OnMenuHide");
        Dispatcher.Call("OnQuizQuit");

    }
    async render() {
        return <>
            <div class="h-full flex items-center bg-gray-50">
                <div class="w-full flex flex-col space-y-3 p-4">
                    <label class="text-lg font-bold text-gray-700">geogame 🌏</label>
                    <label class="text-sm font-bold text-gray-700">Signup</label>
                    <input id="username" class="bg-gray-200 border border-gray-300 px-3 py-2 w-full sm:w-64 text-xs rounded-lg outline-0 transition-shadow hover:shadow-md" type="text" placeholder="Username" />
                    <input id="password" class="bg-gray-200 border border-gray-300 px-3 py-2 w-full sm:w-64 text-xs rounded-lg outline-0 transition-shadow hover:shadow-md" type="password" placeholder="Password" />
                    <div>
                        <button onclick="{e.login}" class="bg-blue-400 border border-blue-500 text-xs px-6 py-2 w-24 rounded-lg transition-shadow hover:shadow-md hover:shadow-blue-200">Signup</button>
                    </div>
                    <label class="text-sm">Already have an account<br/>Login</label>
                    <div>
                        <button onclick="window.location.hash = '#login';" class="bg-gray-200 border border-gray-300 text-xs px-6 py-2 w-24 rounded-lg transition-shadow hover:shadow-md">Login</button>
                    </div>
                </div>
            </div>
        </>;
    }
};

export default Signup;