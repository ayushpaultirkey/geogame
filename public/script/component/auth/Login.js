import H12 from "@library/h12";
import Dispatcher from "@library/h12.dispatcher";
import $ROOT from "../../config/root";

@Component
class Login extends H12.Component {
    constructor() {
        super();
    }
    async init() {

        //
        Dispatcher.Call("OnMenuHide");
        Dispatcher.Call("OnQuizQuit");
        
        //
        this.PreLoad();

    }
    async render() {
        return <>
            <div class="h-full flex items-center bg-gray-50">
                <div class="w-full flex flex-col space-y-3 p-4">
                    <label class="text-lg font-bold text-gray-700">geogame 🌏</label>
                    <label class="text-sm font-bold text-gray-700">Login</label>
                    <input id="username" class="bg-gray-200 border border-gray-300 px-3 py-2 w-full sm:w-64 text-xs rounded-lg outline-0 transition-shadow hover:shadow-md" type="text" placeholder="Username" />
                    <input id="password" class="bg-gray-200 border border-gray-300 px-3 py-2 w-full sm:w-64 text-xs rounded-lg outline-0 transition-shadow hover:shadow-md" type="password" placeholder="Password" />
                    <div>
                        <button onclick={ this.Login } class="bg-blue-400 border border-blue-500 text-xs px-6 py-2 w-24 rounded-lg transition-shadow hover:shadow-md hover:shadow-blue-200">Login</button>
                    </div>
                    <label class="text-sm">Don't have an account<br/>Signup</label>
                    <div>
                        <button onclick="window.location.hash = '#signup';" class="bg-gray-200 border border-gray-300 text-xs px-6 py-2 w-24 rounded-lg transition-shadow hover:shadow-md">Signup</button>
                    </div>
                </div>
            </div>
        </>;
    }

    async PreLoad() {

        //
        try {
            
            //Get data
            const _response = await fetch(`${$ROOT}/api/user/data`);
            const _data = await _response.json();

            //Redirect to home
            if(_data.success) {
                window.location.hash = "#home";
            };

        }
        catch(exception) {
            alert("Unable to get user data");
        };

    }
    async Login() {
        
        const _username = this.element.username;
        const _password = this.element.password;

        try {

            if(_username.value.length < 2 || _password.value.length < 2) {
                throw "Enter username and password";
            };

            const _response = await fetch(`${$ROOT}/api/user/login?username=${_username.value}&password=${_password.value}`);
            const _data = await _response.json();

            if(!_data.success) {
                throw _data.message;
            };
            
            window.location.hash = '#home';

        }
        catch(ex) {
            alert(ex)
        };

    }
};

export default Login;