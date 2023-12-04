import Router from "@library/h12.router";

import Map from "./component/map/Map";
import Home from "./component/home/Home";
import Quiz from "./component/quiz/Quiz";
import Login from "./component/auth/Login";
import Signup from "./component/auth/Signup";
import Profile from "./component/user/Profile";

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

export default router;