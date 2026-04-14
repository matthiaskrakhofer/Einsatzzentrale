const STORAGE_KEY = "einsatzleitungszentrale-progress";

const tasks = [
  {
    id: 1,
    title: "Notruf entschlüsseln",
    badge: "Abschnitt 1",
    story:
      "Das letzte Funksignal aus dem Wrack enthält eine verschlüsselte Zahlensequenz. Erst wenn der richtige Notruf-Code bestätigt ist, darf das Suchteam starten.",
    clue:
      "Hinweis: Welcher europaweite Notruf gilt auch für Luftnotfälle? Gib nur die Zahl ein.",
    answer: ["112"],
    rescued: 4,
    success:
      "Funkspruch bestätigt. Das erste Suchteam erreicht das Absturzgebiet und bringt vier verletzte Personen in Sicherheit."
  },
  {
    id: 2,
    title: "Koordinaten prüfen",
    badge: "Abschnitt 2",
    story:
      "Drei Helikopter stehen bereit, aber nur einer fliegt zur richtigen Zone. Die Einsatzkarte nennt den Bergsektor mit einer Himmelsrichtung.",
    clue:
      "Hinweis: Die Sonne geht im Osten auf. Gib nur die Himmelsrichtung ein.",
    answer: ["osten", "ost"],
    rescued: 6,
    success:
      "Landezone bestätigt. Das Luftrettungsteam findet sechs weitere Überlebende und versorgt sie vor Ort."
  },
  {
    id: 3,
    title: "Versorgung freigeben",
    badge: "Abschnitt 3",
    story:
      "Die Bodenmannschaft braucht den richtigen Zahlencode für die Notfallkisten. Auf einer Kiste steht die Regel: 3 + 4 + 5 = ?",
    clue:
      "Hinweis: Addiere die drei Zahlen und gib nur das Ergebnis ein.",
    answer: ["12"],
    rescued: 7,
    success:
      "Materiallager geöffnet. Medikamente, Decken und Wasser erreichen sieben weitere Passagiere."
  },
  {
    id: 4,
    title: "Rettungskorridor öffnen",
    badge: "Finale",
    story:
      "Der letzte Weg führt durch einen engen Pass. Die Leitstelle fordert das NATO-Wort für den Buchstaben A, um den Korridor endgültig freizugeben.",
    clue:
      "Hinweis: Welches Funkwort steht im NATO-Alphabet für A?",
    answer: ["alpha"],
    rescued: 7,
    success:
      "Korridor freigegeben. Das letzte Rettungsteam erreicht das Wrack und evakuiert die verbleibenden sieben Personen."
  }
];

const defaultProgress = () =>
  tasks.map((task, index) => ({
    id: task.id,
    unlocked: index === 0,
    solved: false
  }));

let progress = loadProgress();

const taskList = document.getElementById("taskList");
const template = document.getElementById("taskTemplate");
const rescuedCount = document.getElementById("rescuedCount");
const unlockedCount = document.getElementById("unlockedCount");
const missionStatus = document.getElementById("missionStatus");
const progressLabel = document.getElementById("progressLabel");
const progressFill = document.getElementById("progressFill");
const resetButton = document.getElementById("resetButton");

function loadProgress() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return defaultProgress();
  }

  try {
    const parsed = JSON.parse(saved);
    if (!Array.isArray(parsed) || parsed.length !== tasks.length) {
      return defaultProgress();
    }
    return parsed;
  } catch {
    return defaultProgress();
  }
}

function saveProgress() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function normalizeAnswer(value) {
  return value.trim().toLowerCase();
}

function getTaskState(id) {
  return progress.find((entry) => entry.id === id);
}

function solvedCount() {
  return progress.filter((entry) => entry.solved).length;
}

function rescuedTotal() {
  return tasks
    .filter((task) => getTaskState(task.id)?.solved)
    .reduce((sum, task) => sum + task.rescued, 0);
}

function render() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const node = template.content.firstElementChild.cloneNode(true);
    const state = getTaskState(task.id);

    node.classList.toggle("locked", !state.unlocked);
    node.classList.toggle("solved", state.solved);

    node.querySelector(".task-badge").textContent = task.badge;
    node.querySelector(".task-title").textContent = task.title;
    node.querySelector(".task-story").textContent = task.story;
    node.querySelector(".task-clue").textContent = task.clue;
    node.querySelector(".task-success").textContent = task.success;

    const stateLabel = state.solved
      ? "Abgeschlossen"
      : state.unlocked
        ? "Aktiv"
        : "Gesperrt";
    node.querySelector(".task-state").textContent = stateLabel;

    const form = node.querySelector(".task-form");
    const input = node.querySelector(".task-input");
    const feedback = node.querySelector(".task-feedback");

    if (!state.unlocked || state.solved) {
      input.disabled = true;
      form.querySelector("button").disabled = true;
    }

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      checkAnswer(task, input, feedback);
    });

    taskList.appendChild(node);
  });

  updateDashboard();
}

function updateDashboard() {
  const solved = solvedCount();
  const rescued = rescuedTotal();
  const unlocked = progress.filter((entry) => entry.unlocked).length;
  const percent = Math.round((solved / tasks.length) * 100);

  rescuedCount.textContent = `${rescued} / 24`;
  unlockedCount.textContent = `${unlocked} / ${tasks.length}`;
  progressLabel.textContent = `${percent}%`;
  progressFill.style.width = `${percent}%`;

  if (solved === 0) {
    missionStatus.textContent = "Lage wird ausgewertet";
  } else if (solved < tasks.length) {
    missionStatus.textContent = "Rettung läuft";
  } else {
    missionStatus.textContent = "Alle Überlebenden gerettet";
  }
}

function checkAnswer(task, input, feedback) {
  const current = getTaskState(task.id);
  if (!current?.unlocked || current.solved) {
    return;
  }

  const value = normalizeAnswer(input.value);
  const isCorrect = task.answer.some((answer) => normalizeAnswer(answer) === value);

  if (!isCorrect) {
    feedback.textContent = "Antwort nicht korrekt. Prüfe den Hinweis und versuche es erneut.";
    feedback.className = "task-feedback error";
    return;
  }

  current.solved = true;
  const nextTask = progress.find((entry) => entry.id === task.id + 1);
  if (nextTask) {
    nextTask.unlocked = true;
  }

  saveProgress();
  render();
}

resetButton.addEventListener("click", () => {
  progress = defaultProgress();
  saveProgress();
  render();
});

render();
