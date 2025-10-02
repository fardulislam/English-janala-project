const createElement = (arr) =>{
  const htmlElement = arr.map((el)=> `<span class="btn">${el}</span>`);
  return htmlElement.join("");
};

const manageSpinner = (status) =>{
  if(status==true){
    document.getElementById('spinner').classList.remove('hidden');
    document.getElementById('word-container').classList.add('hidden');
  }else{
    document.getElementById('word-container').classList.remove('hidden');
    document.getElementById('spinner').classList.add('hidden');
  }
}

const loadeLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};

const removeActive=()=>{
  const lessonButton=document.querySelectorAll('.lesson-btn')
  lessonButton.forEach(btn=>btn.classList.remove('active'))
}
const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`lesson-btn-${id}`);
      // console.log(clickBtn);
      clickBtn.classList.add('active');
      displayLevelWord(data.data)
    });
};

const loadWordDetail = async (id)=>{
  const url=`https://openapi.programming-hero.com/api/word/${id}`
  const res = await fetch(url);
  const details =await res.json();
  displayWordDetail(details.data);
}

// "status": true,
// "message": "successfully fetched a word details",
// "data": {
// "word": "Brisk",
// "meaning": "চটপটে / দ্রুত",
// "pronunciation": "ব্রিস্ক",
// "level": 3,
// "sentence": "He took a brisk walk in the morning.",
// "points": 3,
// "partsOfSpeech": "adjective",
// "synonyms": [
// "quick",
// "energetic"
// ],
// "id": 27

const displayWordDetail = (word)=>{
  console.log(word);
  const detailsBox =document.getElementById('details-container');
  detailsBox.innerHTML=`
  <div class="div">
        <h2 class="font-bold text-2xl">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
      </div>
         <div class="div">
        <h2 class="font-bold ">Meaning</h2>
        <p>${word.meaning}</p>
      </div>
         <div class="div">
        <h2 class="font-bold ">Example</h2>
        <p>${word.sentence}</p>
      </div>
         <div class="div">
        <h2 class="font-bold ">সমার্থক শব্দ গুলো</h2>
        <div class="">${createElement(word.synonyms)} </div>
      </div>
  `;
  document.getElementById('my_modal_5').showModal();

}

const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";
  if(words.length == 0){
  wordContainer.innerHTML=`
    <div class="text-center col-span-full rounded-xl py-10 space-y-6 font-bangla">
    <img class="mx-auto" src="./assets/alert-error.png" alt="" srcset="">
  <p class="text-gray-400  font-medium ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
  <h2 class="text-4xl font-medium ">নেক্সট Lesson এ যান</h2>
</div>
  `;
  manageSpinner(false);
    return;
  }

//   {
//     "id": 100,
//     "level": 2,
//     "word": "Love",
//     "meaning": null,
//     "pronunciation": "লভ"
// }
  for (let word of words) {
    // console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="bg-white rounded-xl py-10 text-center px-5 shadow-sm space-y-4">
<h2 class="font-bold text-2xl ">${word.word ? word.word : 'sobdo pouya jai ni'}</h2>
<p class="font-semibold">Meaning /Pronounciation</p>
<div class="font-medium font-bangla text-2xl">"${word.meaning ? word.meaning:'ortho pouya jai ni '} / ${word.pronunciation ? word.pronunciation : 'pronunciation pouya jai ni'}"</div>
<div class="flex justify-between items-center">
<button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-circle-info"></i></button>
<button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-volume-high"></i></button>

</div>
</div>
    `;
    wordContainer.append(card);
  }
  manageSpinner(false);
};

const displayLessons = (lessons) => {
  // 1.get the conatainer
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  // 2. get into every lessons
  for (let lesson of lessons) {
    // 3. create Element
    console.log(lesson);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
    <button id="lesson-btn-${lesson.level_no}" onclick='loadLevelWord(${lesson.level_no})' class="btn btn-outline btn-primary lesson-btn" href=""><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
    `;
    levelContainer.append(btnDiv);
    // 4 appent into Element
  }
};
loadeLessons();

document.getElementById('btn-search').addEventListener('click',()=>{
  removeActive();
  const input =document.getElementById('input-search');
  const searchValu = input.value.trim().toLowerCase();
  console.log(searchValu);
  fetch('https://openapi.programming-hero.com/api/words/all')
  .then(res => res.json())
  .then(data => {
    const AllWord = data.data;
    console.log(AllWord);
    const filterWord = AllWord.filter((word)=>word.word.toLowerCase().includes(searchValu));
    displayLevelWord(filterWord);
  });
})