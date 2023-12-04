import H12 from "@library/h12";
import Dispatcher from "@library/h12.dispatcher";

@Component
class Quiz extends H12.Component {
    constructor() {
        super();
        this.Data = null;
    }
    async init() {
        
        this.root.classList.add("hidden");

        Dispatcher.On("OnQuizStart", (args) => {

            this.root.classList.remove("hidden");

            if(args.detail !== null) {

                this.Set("{quiz.message}", "");

                const _quiz = args.detail;
                this.Set("{quiz.title}", _quiz.quiz_title);
                this.Set("{quiz.hint}", _quiz.quiz_hint);

                if(_quiz.quiz_thumb.length > 0) {
                    this.element.quizimage.style.backgroundImage = `url(${_quiz.quiz_thumb})`;
                };

                this.Data = args.detail;

            };

        });

        Dispatcher.On("OnQuizQuit", () => { this.root.classList.add("hidden") });

        Dispatcher.On("OnQuizWrong", () => {
            this.Set("{quiz.message}", "Wrong answer");
        });
        
    }

    async render() {
        return <>
            <div class="flex flex-col space-y-2">
                <label>Question:</label>
                <label class="font-bold text-sm">{quiz.title}</label>
                <div class="w-full h-40 bg-gray-300 border border-gray-400 rounded-md bg-cover bg-none bg-center" id="quizimage"></div>
                <label class="text-xs"><b>Hint: </b>{quiz.hint}</label>
                <button class="text-xs p-2 rounded-md bg-blue-400 border border-blue-500 hover:bg-blue-500" onclick={ this.Check }>Check</button>
                <label class="text-xs"><b>How to play ?</b><br/>Zoom into the place according to question and press Check button to check if the answer is correct</label>
                <b class="text-xs text-red-500">{quiz.message}</b>
            </div>
        </>;
    }

    Check() {
        Dispatcher.Call("OnQuizCheck", this.Data);
    }
    
};

export default Quiz;