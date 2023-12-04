import H12 from "@library/h12";
import Dispatcher from "@library/h12.dispatcher";
import $ROOT from "../../config/root";

@Component
class Create extends H12.Component {
    constructor() {
        super();
        this.map = null;
        this.marker = null;
    }
    async init() {
        
        //Default overlay property
        this.Set("{overlay.hidden}", "hidden");

    }
    async render() {
        return <>
            <div class="w-full rounded-md relative">
                <div class="flex border border-gray-400 rounded-md">
                    <div class="w-full bg-white rounded-l-md">
                        <textarea id="content" class="w-full h-48 p-4 text-sm resize-none bg-transparent" placeholder="Write something for the post"></textarea>
                        <button onclick={ this.Create } class="text-xs p-2 px-6 m-3 bg-blue-400 border border-blue-500 rounded-md hover:bg-blue-500 transition-colors">Create</button>
                    </div>
                    <div class="bg-gray-800 rounded-r-md" style="min-width: 350px; max-width: 350px;" id="createpostmap"></div>
                </div>
                <div class="absolute bg-transparent w-full h-full top-0 left-0 {overlay.hidden}"></div>
            </div>
        </>;
    }

    CreateMap() {

        if(this.map == null) {

            //Create new map
            this.map = L.map(this.element.createpostmap).setView([23.296068, 77.428961], 5);
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(this.map);
    
            //Create default marker
            this.marker = new L.marker({lat: 23.725011735951796, lng: 76.18675231933595}).addTo(this.map);
            this.map.on('click', (event) => {
                if(this.marker) {
                    this.map.removeLayer(this.marker);
                };
                this.marker = new L.marker(event.latlng).addTo(this.map);
            });
            
        };
        
    }

    async Create() {
        
        //Show overlay
        this.Set("{overlay.hidden}", "");

        const _content = this.element.content;

        if(_content.value.length < 2 && !(this.marker)) {
            alert("Please enter content");
        }
        else {

            try {

                const _lat = this.marker._latlng.lat.toString();
                const _lon = this.marker._latlng.lng.toString();
    
                const _resaddress = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${_lat}&lon=${_lon}`);
                const _resAData = await _resaddress.json();
                let _addressobj = JSON.stringify(_resAData.address);
                let _address = _resAData.display_name;
                
                const _rescreate = await fetch(`${$ROOT}/api/post/create?content=${_content.value}&coordinate=${_lat + "," + _lon}&address=${_address}&addressobj=${_addressobj}`);
                const _resCData = await _rescreate.json();
                    
                if(!_resCData.success && _resCData.redirect.length > 0) {
                    window.location.hash = _resCData.redirect;
                };

                if(!_resCData.success) {
                    alert(_resCData.message);
                }
                else {
                    alert("Post created !");
                    Dispatcher.Call("OnPostCreated");
                };

            }
            catch(exception) {
                alert(exception);
            };

        };

        //Hide overlay
        this.Set("{overlay.hidden}", "hidden");

    }

};

export default Create;