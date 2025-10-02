const loadeLessons = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLessons(json.data));
};
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};
const displayLevelWord = (words) => {
  const wordContainer = document.getElementById("word-container");
  wordContainer.innerHTML = "";

//   {
//     "id": 100,
//     "level": 2,
//     "word": "Love",
//     "meaning": null,
//     "pronunciation": "লভ"
// }
  for (let word of words) {
    console.log(word);
    const card = document.createElement("div");
    card.innerHTML = `
    <div class="bg-white rounded-xl py-10 text-center px-5 shadow-sm space-y-4">
<h2 class="font-bold text-2xl ">${word.word}</h2>
<p class="font-semibold">Meaning /Pronounciation</p>
<div class="font-medium font-bangla text-2xl">"${word.meaning} / ${word.pronunciation}"</div>
<div class="flex justify-between items-center">
<button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-circle-info"></i></button>
<button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF50]"><i class="fa-solid fa-volume-high"></i></button>

</div>
</div>
    `;
    wordContainer.append(card);
  }
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
    <button onclick='loadLevelWord(${lesson.level_no})' class="btn btn-outline btn-primary" href=""><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
    `;
    levelContainer.append(btnDiv);
    // 4 appent into Element
  }
};
loadeLessons();
