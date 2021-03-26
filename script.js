
let hangman = new HangmanSvg(document.getElementById("hangman")); // hangman svg context
let wrongCharacters=[];
let usedCharacters=[];
const showMessage=document.querySelector("#showMessage");
const correctLetterBlock=document.querySelector('#correctLetterBlock');
const wrongLetterBlock=document.querySelector('#wrongLetterBlock');
let correctLetter;
let gameActive=true;
const words = ['application', 'programming', 'interface', 'wizard', 'frizar'];
let currentWord, count = 0;
function makePlayBtn(){
	const btn=document.createElement('button');
	btn.innerHTML="Play Button";
	btn.setAttribute('id','play-button');
    btn.setAttribute('data-ns-test','play-button');
	btn.setAttribute('type','button');
	document.querySelector("#play").append(btn);
	gameActive=false;
    count++;
	document.querySelector("#play-button").addEventListener('click',()=>{
    	freshStart();
    });
	
}

function freshStart(){
    wrongCharacters=[];
    usedCharacters=[];
	document.getElementById("hangman").innerHTML="";
	document.querySelector("#play").innerHTML="";
	hangman.reset();
	gameActive=true;
	// const randIndex=Math.floor(Math.random()*4);
	// currentWord=words[randIndex];
    currentWord=words[count%5];
	let letterSpans="";
	for(let i=0;i<currentWord.length;i++){
		letterSpans+=`<span data-ns-test="letter"></span>`;
	}
	
	correctLetterBlock.innerHTML=letterSpans;
	correctLetter=document.querySelectorAll('[data-ns-test="letter"]');
	showMessage.innerHTML="";
	wrongLetterBlock.innerHTML="";
}
freshStart();

function isValidCharacter(ch){
 	ch=ch.toLowerCase();
 	return ch.length === 1 && ch.match(/[a-z]/i);
}
function characterIsInWord(ch){
	return currentWord.indexOf(ch); //returns indices if not there then -1
}
function wrongChoice(typedChar){
	 hangman.draw();
	 wrongCharacters.push(typedChar);
	 let wrongLetterSpans="";
	 for(let i=0;i<wrongCharacters.length-1;i++){
	 	wrongLetterSpans+=`<span data-ns-test="wrong-letter">${wrongCharacters[i]}</span>,`;
	 }
	 wrongLetterSpans+=`<span data-ns-test="wrong-letter">${wrongCharacters[wrongCharacters.length-1]}</span>`;
	 wrongLetterBlock.innerHTML=wrongLetterSpans;
	 	if(wrongCharacters.length===7){
	                //show a popup for lost game
           showMessage.innerHTML="Lost"; 
           makePlayBtn();
            return;
        }
}
    window.addEventListener('keydown', (event) => { 
    	if(gameActive){//&& wrongCharacters.length!==6){
		    let typedChar=event.key.toLowerCase();
		    showMessage.innerHTML="";
		    if(isValidCharacter(typedChar)){
                // typedChar=typedChar.toLowerCase();
		 		let checkCharPresence=characterIsInWord(typedChar);
		    	if(checkCharPresence!==-1){
		            //Append it in appropriate place then 
                    correctLetter[checkCharPresence].innerHTML=typedChar; 
		               currentWord=currentWord.replace(typedChar,'0');  //remove that character
		               checkCharPresence=characterIsInWord(typedChar); 
		            while(checkCharPresence!=-1){
		               correctLetter[checkCharPresence].innerHTML=typedChar; 
		               currentWord=currentWord.replace(typedChar,'0');  //remove that character
		               checkCharPresence=characterIsInWord(typedChar); 
		            }
		            usedCharacters.push(typedChar);
		            let countOccurrences =0;
		            for(let i=0;i<currentWord.length;i++)
		            	countOccurrences+=currentWord[i]==="0"?1:0;
		            if(currentWord.length===countOccurrences){
			                //You Won
			                showMessage.innerHTML="winner";
			                
			                makePlayBtn();
			                return;
			            }
		        }else{
		        	// typedChar=typedChar.toLowerCase();
		        	if(usedCharacters.includes(typedChar)){
		        			showMessage.innerHTML="Already Used This Character!";
		        	}else{
                        if(!wrongCharacters.includes(typedChar))
			                 wrongChoice(typedChar);
			       	}
		        	
		        }
		    }
		}

    });