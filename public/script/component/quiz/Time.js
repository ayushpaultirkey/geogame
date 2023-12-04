import H12 from "@library/h12";
import Dispatcher from "@library/h12.dispatcher";

@Component
class Time extends H12.Component {
    constructor() {
        super();
    }
    async init() {
        

    }
    async render() {
        return <>
            <div class="hidden bg-gray-800 w-full h-full relative">
                <div class="bg-gray-200 border border-gray-300 inline-block absolute top-0 right-0 p-2 px-3">
                    <label>Time Remaining<br/><b>01:00</b></label>
                </div>
            </div>
        </>;
    }
};

export default Time;