let ques = [];
let Allans = [];
let indx = 0;
let score = 0;
let selectedAns = [];


function openSecond() {
  document.getElementById("second").style.display = "flex";
  document.getElementById("first").style.display = "none";
}


fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
.then (rs => rs.json())
.then (data => {
  ques = data.results;
  nextQues();
})
.catch (err => {
  console.log(err);
}) 



function nextQues() {
  if(indx >= ques.length) {
    alert(`Quiz is finished.Your score is:${score}/10`);
    return;
  }
  document.getElementById("questarea").textContent = decodeHTML(ques[indx].question);
  let correct = decodeHTML(ques[indx].correct_answer);
  let incorrect = ques[indx].incorrect_answers.map(ans => decodeHTML(ans));
  Allans = [...incorrect,correct].sort(()=> Math.random() - 0.5);
  let allbtns = document.getElementsByClassName("answers");

  Array.from(allbtns).forEach((btn, i) => {
    btn.style.backgroundColor = "";
    btn.replaceWith(btn.cloneNode(true)); // this removes all event listeners
  });

  allbtns = document.getElementsByClassName("answers");
  Allans.forEach((ans,i) => {
    if(allbtns[i]) {
      allbtns[i].innerHTML = ans;
      allbtns[i].addEventListener("click",function() {
        showCorrect(i,correct);
      });
    if(selectedAns[indx] !== undefined) {
      if(allbtns[i].innerHTML===correct) {
        allbtns[i].style.backgroundColor = "green";
      }
      else if(i===selectedAns[indx]) {
        allbtns[i].style.backgroundColor = "red";
      }
  }
    }
  })
}


function showCorrect (selectedIndex,correct) {
  let allbtns = document.getElementsByClassName("answers");
  let selectedtxt = allbtns[selectedIndex].innerHTML;
  if(selectedAns[indx] === undefined) {
    selectedAns[indx] = selectedtxt;
    if(selectedtxt===correct) {
    score++;
  }
}

  Array.from(allbtns).forEach((ans,i) => {
    if(ans.innerHTML===correct) {
      ans.style.backgroundColor = "green";
    }
    else if (i === selectedIndex) {
      ans.style.backgroundColor = "red";
    }
      else {
      ans.style.backgroundColor = ""; // reset others
    }
  })
}


function skipbtn () {
  indx++;
  nextQues();
}

function backbtn() {
  if(indx > 0) {
  indx--;
  nextQues();
  }
}



function decodeHTML(html) {
  let element = document.createElement("textarea");
  element.innerHTML = html;
  return element.value;
}