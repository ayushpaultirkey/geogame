import H12 from "@library/h12";
import Dispatcher from "@library/h12.dispatcher";
import Create from "../post/Create";
import Card from "../post/Card";
import $ROOT from "../../config/root";

@Component
class Home extends H12.Component {
    constructor() {
        super();
    }
    async init() {
        
        //
        Dispatcher.On("OnPostCreated", this.LoadPost.bind(this));

    }
    async render() {
        return <>
            <div class="w-full h-full p-6 px-7 flex flex-col space-y-5 overflow-auto tab" id="TabHome">
                <label class="font-bold text-2xl">Home 🏠</label>
                <label class="font-bold text-md">Create Posts 🔖</label>
                <Create args id="createpost"></Create>
                <label class="font-bold text-md">Recent Posts 📚</label>
                <div class="grid grid-cols-2 gap-2">
                    {post.card}
                </div>
            </div>
        </>;
    }

    OnRouterEnter() {

        //
        Dispatcher.Call("OnMenuShow");
        Dispatcher.Call("OnQuizQuit");

        //
        this.LoadPost();
        this.child["createpost"].CreateMap();

    }
    OnRouterLeave() {
        console.log("home end")
    }

    async LoadPost() {

        try {

            //Get post data
            const _response = await fetch(`${$ROOT}/api/post/list`);
            const _data = await _response.json();
 
            //Check if user exists
            if(!_data.success && _data.redirect.length > 0) {
                window.location.hash = _data.redirect;
            };

            //Check if the post list data is empty
            if(_data.data.length > 0) {

                //Clear post card
                this.Set("{post.card}","");

                //Add post card
                for(var i = 0, len = _data.data.length; i < len; i++) {
                    let _item = _data.data[i];
                    this.Set("{post.card}++", <><Card args user={ _item.user_name } content={ _item.post_content } address={ _item.post_address }></Card></>)
                };

            };


        }
        catch(exception) {
            alert(exception);
        }

    }

};

export default Home;