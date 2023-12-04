import H12 from "@library/h12";
import Dispatcher from "@library/h12.dispatcher";

@Component
class Map extends H12.Component {
    constructor() {
        super();
        this.map = null;
        this.marker = [];
    }
    async init() {
        

    }
    async render() {
        return <>
            <div class="w-full h-full p-6 px-7 flex flex-col space-y-4 overflow-auto tab" id="TabMap">
                <label class="font-bold text-2xl">Map 🗺️</label>
                <div class="h-full bg-gray-400 border border-gray-500 overflow-hidden rounded-md" id="postmap"></div>
            </div>
        </>;
    }

    OnRouterEnter() {

        //
        Dispatcher.Call("OnMenuShow");
        Dispatcher.Call("OnQuizQuit");

        //
        this.LoadPost();

    }
    OnRouterLeave() {

    }

    async LoadPost() {

        //Try and load post
        try {

            //Get post data
            const _response = await fetch(`/api/post/list`);
            const _data = await _response.json();
 
            //Check if user exists
            if(!_data.success && _data.redirect.length > 0) {
                window.location.hash = _data.redirect;
            };

            //
            if(_data.data.length > 0) {
                this.CreateMap(_data.data);
            };

        }
        catch(exception) {
            alert(exception);
        };

    }

    
    CreateMap(post = []) {

        //Check if map loaded
        if(this.map == null) {

            //Create new map
            this.map = L.map(this.element.postmap).setView([23.296068, 77.428961], 5);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(this.map);
    
        }
        else {
            console.warn("Map already loaded");
        };

        //Remove old marker
        this.marker.forEach(x => {
            this.map.removeLayer(x);
        });

        //Create post markers
        post.forEach(x => {
            
            let _coordinate = x.post_coordinate.split(",");
            let _marker = new L.marker({ lat: _coordinate[0], lng: _coordinate[1] }).addTo(this.map);

            let _markup = (
                <>
                    <div class="flex flex-col space-y-1">
                        <b>@${x.user_name}</b>
                        <label>${x.post_content}</label>
                        <b class="text-xs">${x.post_address}</b>
                    </div>
                </>
            ).outerHTML;

            _marker.bindPopup(_markup);

            this.marker.push(_marker);

        })


    }

};

export default Map;