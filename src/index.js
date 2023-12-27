//Here we're importing items we'll need. You can add other imports here.
const glossArray = ["ša", "zi", "ša", "ǧi", "tȟo", "sá", "pA", "ȟó", "tA"];
const promptArray = ["šazi", "tȟoša", "ǧi", "sápA", "ȟótA"];
const answerMap = {
    "šazi": "orange",
    "tȟoša" : "purple",
    "ǧi" : "brown",
    "sápA" : "black",
    "ȟótA" : "grey",

}
let promptList;
let glossList;
let answerArray = [];
let listHolder = document.getElementById("promptList");
let glossHolder = document.getElementById("glossListHolder");
let messageSpace = document.getElementById('messageSpace');

initialize();

function initialize(){
    messageSpace.innerHTML = '';
    

    buildPromoptList();
    buildGlossList(glossArray);
    


    if (listHolder) {
      listHolder.innerHTML = promptList;
    }


    
}

function buildPromoptList() {
    let arr = Object.keys(answerMap);
    let values = Object.values(answerMap);
  for (let p = 0; p < arr.length; p++) {
    let thisPrompt = arr[p];
    let thisValue = values[p];
    let listItem = `<li><span id="prompt-${p}">${thisValue}</span></li>`;
    if (!promptList) {
      promptList = listItem;
    } else {
      promptList += listItem;
    }
  }
}

function buildGlossList(arr) {
    //get rid of old glossList

    if(document.getElementById('glossListHolder')){
        //we already made it, so remove it. 
        document.getElementById('glossListHolder').innerHTML = '';
    }
  let listHolder = document.createElement("ul");
  listHolder.id='glossListHolder';
  for (let p = 0; p < arr.length; p++) {
    let thisGloss = arr[p];

    let listItem = document.createElement("li");

    listItem.innerText = thisGloss;
    listItem.id = 'gloss-' + p;
    listItem.classList.add('gloss');
    listItem.classList.add('unfound');
    listItem.classList.remove('found');
    listItem.classList.remove('used');

    //let listItem = `<li><span id="gloss-${p}">${thisGloss}</span></li>`
    listItem.addEventListener("click", function () {
      selectGloss(thisGloss);
    });
    if (!glossList) {
      glossList = listItem;
    } else {
      glossList += listItem;
    }
    //now that we have a list, add the sections that determine onClick.
    listHolder.appendChild(listItem);
  }
  const glossContainer = document.getElementById("glossListHolder");
  let glossMarker = document.getElementById('glossMarker');
 glossMarker.insertBefore(listHolder,null);

 // document.body.insertBefore(listHolder, null);
}

function selectGloss(gloss) {
  let answerSpace = document.getElementById("answerText");
  let workingAnswer = answerSpace.innerHTML;
  let newAnswer = "";


  if (answerArray.includes(gloss)) {
    console.log(
      "includes gloss.  workingAnswer ",
      workingAnswer,
      "gloss",
      gloss,
      "answerArray",
      answerArray
    );
    //we've clicked on this before
    //deselect it or add it
    let glossIndex = answerArray.indexOf(gloss);
    answerArray.splice(glossIndex, 1);
    for (let a = 0; a < answerArray.length; a++) {
      if (!newAnswer) {
        newAnswer = answerArray[a];
      } else {
        newAnswer += answerArray[a];
      }
    }


  } else {

    //we have not clicked on this before
    //add it to the answer
    answerArray.push(gloss);
    for (let a = 0; a < answerArray.length; a++) {
      if (!newAnswer) {
        newAnswer = answerArray[a];
      } else {
        newAnswer += answerArray[a];
      }
    }

  }
console.log('right before updating newAnswer', newAnswer, glossArray, promptArray);
  answerSpace.innerHTML = newAnswer;
  //validate answer.
  let answerCheck = validateAnswer(newAnswer);
  if(answerCheck){
    //debugger;
    //now, remove the answer options from this so that we can't use them later. 
    let glossElements = document.getElementById('glossListHolder');
    //remove these from the clickable ones
    for(let a = 0 ; a < answerArray.length ; a++){
        let thisAnswerGloss = answerArray[a];
        for(let g = 0 ; g < glossArray.length ; g++){
            let thisGloss = glossArray[g];
            if(thisGloss === thisAnswerGloss){
                console.log('checking gloss match', thisGloss, thisAnswerGloss);
                // let glossIndex = glossArray.indexOf(thisGloss);
                // glossArray.splice(glossIndex, 1);
                //remove onclick action for this one and make it grey
                restyleGlossElement(thisGloss);

                break;
            }
        }
        //glosses are reset;

    }
    answerArray = [];
    promptArray.splice(promptArray.indexOf(newAnswer), 1)
    newAnswer = '';
    answerSpace.innerHTML = '';
  }
  //if all the answers have been found.
//   console.log('answers', promptArray);
  if(promptArray.length === 0 ){
    //you win
    //let messageSpace = document.getElementById('messageSpace');
    let restartButton = document.createElement('button');
    restartButton.innerText = "RESTART";
    restartButton.addEventListener('click', function(){
        initialize();

    })


    messageSpace.innerHTML = 'YOU WIN';
    messageSpace.appendChild(restartButton);


  }
}

function restyleGlossElement(gloss){
    // console.log('restyleGlossElements', gloss);
    let glossPartIndex = glossArray.indexOf(gloss);
    let glossLi = document.getElementById('gloss-' + glossPartIndex);
    // console.log('gloss check, gloss', gloss, 'part index', glossPartIndex, 'li',  glossLi, 'array', glossArray);
    glossLi.classList.add('used');
    
    glossLi.removeEventListener('click', function(){console.log('removing listener')});

}

function checkGloss(gloss, answer) {
  if (answerArray.includes(gloss)) {
    //we've clicked on this before
  } else {
    //we have not clicked on this before
    answerArray.push[gloss];
  }
}
function validateAnswer(answer) {
  if (promptArray.includes(answer)) {
    //good.
    let prompts = document.getElementById('promptList');
    let promptIndex = promptArray.indexOf(answer);
    
    let promptLi = document.getElementById('prompt-' + promptIndex);
    promptLi.classList.add('found');
    
    return true;

  } else {
    //keep going
    return false;
  }
}

//
