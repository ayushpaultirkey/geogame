import H12 from "@library/h12";
import Dispatcher from "@library/h12.dispatcher";

@Component
class Card extends H12.Component {
    constructor() {
        super();
    }
    async init(args = {}) {

        this.Set("{post.user}", args.user);
        this.Set("{post.content}", args.content);
        this.Set("{post.address}", args.address);

    }
    async render() {
        return <>
            <div class="bg-gray-100 space-y-2 hover:bg-gray-200 border border-gray-400 h-40 transition-shadow hover:shadow-md text-sm p-2 px-3 rounded-md overflow-hidden flex flex-col">
                <b class="text-xs"><label>@</label>{post.user}</b>
                <div class="flex flex-col space-y-1">
                    <label>{post.content}</label>
                    <label class="text-xs font-bold text-gray-700">{post.address}</label>
                </div>
            </div>
        </>;
    }
};

export default Card;