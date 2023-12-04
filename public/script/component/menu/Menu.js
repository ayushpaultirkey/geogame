import H12 from "@library/h12";
import Navigation from "./Navigation";
import Quiz from "./Quiz";

@Component
class Menu extends H12.Component {
    constructor() {
        super();
    }
    async init() {
        

    }
    async render() {
        return <>
            <div class="space-y-6">
                <div class="flex flex-col">
                    <label class="font-bold">GAME 🌏</label>
                    <label class="text-xs">Menu</label>
                </div>
                <Navigation args></Navigation>
                <Quiz args></Quiz>
            </div>
        </>;
    }
};

export default Menu;