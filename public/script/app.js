import "./../style/output.css";

import H12 from "@library/h12";
import Router from "@library/h12.router";
import Dispatcher from "@library/h12.dispatcher";

import Map from "./component/map/Map";
import Home from "./component/home/Home";
import Quiz from "./component/quiz/Quiz";
import Login from "./component/auth/Login";
import Signup from "./component/auth/Signup";
import Profile from "./component/user/Profile";
import Menu from "./component/menu/Menu";
import Banner from "./component/quiz/Banner";

@Component
class App extends H12.Component {
    constructor() {
        super();
    }
    async init() {
        
        //Create app router and load pages
        const router = new Router({
            Component: this,
            Key: "{app.render}",
            Route: {
                "#login": Login,
                "#signup": Signup,
                "#home": Home,
                "#quiz": Quiz,
                "#profile": Profile,
                "#map": Map
            },
            Default: "#login"
        });
        router.OnError = () => { this.Set("{menu.visible}", "hidden"); console.log(this) };
        router.Observe();
        router.Set();

        //
        Dispatcher.On("OnMenuHide", () => { this.Set("{menu.visible}", "hidden"); });
        Dispatcher.On("OnMenuShow", () => { this.Set("{menu.visible}", "visible"); });

    }
    
    async render() {
        return <>
            <div class="w-full h-full overflow-auto scroll relative">
                <div class="h-full flex">
                    <div class="bg-gray-200 p-6 px-5 border-r border-gray-400 {menu.visible}" style="min-width: 300px; max-width: 300px;">
                        <Menu args></Menu>
                    </div>
                    <div class="bg-gray-300 w-full">
                        {app.render}
                    </div>
                </div>
                <Banner args></Banner>
            </div>
        </>;
    }
};

H12.Component.Render(App, ".app");