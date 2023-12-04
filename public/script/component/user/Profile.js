import H12 from "@library/h12";
import Dispatcher from "@library/h12.dispatcher";
import Card from "../post/Card";

@Component
class Profile extends H12.Component {

    constructor() {
        super();
    }

    async init() {
        
    }

    async render() {
        return <>
            <div class="w-full h-full p-6 px-7 flex flex-col space-y-4 overflow-auto tab" id="TabProfile">
                <label class="font-bold text-2xl">Profile 🤹</label>
                <b>@<b>{user.name}</b></b>
                <div class="flex flex-col space-y-1 text-sm">
                    <label>Total Quiz Played: <b>{game.total}</b></label>
                    <label>Total Points: <b>{game.point}</b></label>
                </div>
                <div class="space-y-4">
                    <label class="font-bold text-md">Posts 📚</label>
                    <div class="grid grid-cols-3 gap-2">{post.card}</div>
                </div>
            </div>
        </>;
    }

    OnRouterEnter() {
        
        //
        Dispatcher.Call("OnMenuShow");
        Dispatcher.Call("OnQuizQuit");

        //
        this.LoadProfile();
        this.LoadResult();

    }

    LoadResult() {

        let _gametotal = localStorage.getItem("game_total");
        let _gamepoint = localStorage.getItem("game_point");

        this.Set("{game.total}", (_gametotal) == null ? 0 : _gametotal);
        this.Set("{game.point}", (_gamepoint) == null ? 0 : _gamepoint);

    }

    async LoadProfile() {

        try {

            //Get data
            const _resUser = await fetch("/api/user/data");
            const _dataUser = await _resUser.json();
 
            //Check if user exists
            if(!_dataUser.success && _dataUser.redirect.length > 0) {
                window.location.hash = _dataUser.redirect;
            };

            //Set data
            this.Set("{user.name}", _dataUser.data.user_name);

            //Get data
            const _responsePost = await fetch(`/api/post/list?userid=${_dataUser.data.user_id}`);
            const _dataPost = await _responsePost.json();

            //Set Data
            this.Set("{post.card}", "");

            //Check if user exists
            for(var i = 0, len = _dataPost.data.length; i < len; i++) {
                let _item = _dataPost.data[i];
                this.Set("{post.card}++", <><Card args user={ _item.user_name } content={ _item.post_content } address={ _item.post_address }></Card></>)
            };

        }
        catch(exception) {
            alert(exception);
        };

    }

};

export default Profile;