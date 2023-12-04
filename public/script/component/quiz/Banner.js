import H12 from "@library/h12";
import Dispatcher from "@library/h12.dispatcher";

@Component
class Banner extends H12.Component {
    constructor() {
        super();
    }
    async init() {
        
        this.root.classList.add("hidden");
        Dispatcher.On("OnQuizQuit", () => { this.root.classList.add("hidden"); });
        Dispatcher.On("OnQuizCorrect", (args) => {
            
            if(args.detail !== null) {

                let _quiz = args.detail;

                this.Set("{quiz.title}", _quiz.quiz_title);
                this.Set("{quiz.detail}", _quiz.quiz_detail);
                this.Set("{quiz.address}", _quiz.quiz_address);

                if(_quiz.quiz_thumb.length > 0) {
                    this.element.quizimage.style.backgroundImage = `url(${_quiz.quiz_thumb})`;
                };

            }
            this.root.classList.remove("hidden");

        });

    }
    async render() {
        return <>
            <div class="h-full w-full flex items-center bg-gray-900 bg-opacity-50 backdrop-blur-sm absolute top-0 left-0" style="z-index: 5500;">
                <div class="bg-gray-200 w-full p-6 flex flex-col space-y-3 max-h-full overflow-y-auto">
                    <b class="text-2xl">Correct answer (+100 Points)</b>
                    <div class="flex flex-col space-y-1">
                        <label>{quiz.title}</label>
                        <label class="text-xs font-bold">{quiz.detail}</label>
                        <div class="w-96 h-60 bg-gray-300 border border-gray-400 rounded-md bg-cover bg-none bg-center" id="quizimage"></div>
                    </div>
                    <div class="space-x-2">
                        <button onclick={ () => { window.location.hash = "#home"; window.location.hash = "#quiz"; } } class="text-xs p-2 px-4 rounded-md bg-blue-400 border border-blue-500 hover:bg-blue-500">Next Question</button>
                        <button onclick={ () => { window.location.hash = "#home"; } } class="text-xs p-2 px-4 rounded-md bg-gray-300 border border-gray-400 hover:bg-gray-400">Go to Home</button>
                    </div>
                </div>
            </div>
        </>;
    }
};

export default Banner;