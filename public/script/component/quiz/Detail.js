import H12 from "@library/h12";
import Dispatcher from "@library/h12.dispatcher";

@Component
class Detail extends H12.Component {
    constructor() {
        super();
    }
    async init() {
        

    }
    async render() {
        return <>
            <div class="flex flex-col space-y-2">
                <label>Question:</label>
                <label class="font-bold text-sm">A place near agra, and a 7 wonders of the world</label>
                <div class="w-full h-40 bg-gray-300 border border-gray-400"></div>
                <label class="text-xs"><b>Hint:</b> 7 wonders of the world</label>
                <button class="text-xs p-2 bg-blue-400 border border-blue-500">Check</button>
            </div>
        </>;
    }
};

export default Detail;