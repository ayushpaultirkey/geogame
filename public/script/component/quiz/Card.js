import H12 from "@library/h12";
import Dispatcher from "@library/h12.dispatcher";

@Component
class Card extends H12.Component {
    
    constructor() {
        super();
    }

    async init(args = {}) {
        
        this.Set("{quiz.index}", args.index);
        this.Set("{quiz.title}", args.title);

    }

    async render() {
        return <>
            <div onclick={ this.Load } class="bg-gray-100 h-40 border space-y-1 border-gray-400 rounded-md py-2 px-3 flex flex-col transition-shadow hover:shadow-md hover:bg-gray-200">
                <label class="text-xs font-bold">Quiz #{quiz.index}</label>
                <label class="text-sm">{quiz.title}</label>
            </div>
        </>;
    }

    Load() {
        Dispatcher.Call("OnQuizStart", this.args.data);
    }

};

export default Card;