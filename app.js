const PASSWORD = "RoterPanda25";
const STORAGE_KEY = "einsatzleitungszentrale-v3";

const lockScreen = document.getElementById("lockScreen");
const app = document.getElementById("app");
const passwordForm = document.getElementById("passwordForm");
const passwordInput = document.getElementById("passwordInput");
const passwordFeedback = document.getElementById("passwordFeedback");

const setupPanel = document.getElementById("setupPanel");
const setupForm = document.getElementById("setupForm");
const passengerInput = document.getElementById("passengerInput");

const totalPassengers = document.getElementById("totalPassengers");
const suppliedPassengers = document.getElementById("suppliedPassengers");
const returningPassengers = document.getElementById("returningPassengers");
const missionStatus = document.getElementById("missionStatus");
const progressLabel = document.getElementById("progressLabel");
const progressFill = document.getElementById("progressFill");

const missionLocked = document.getElementById("missionLocked");
const missionContent = document.getElementById("missionContent");

const stormState = document.getElementById("stormState");
const stormLog = document.getElementById("stormLog");
const stormForm = document.getElementById("stormForm");
const stormEmbedInput = document.getElementById("stormEmbedInput");
const stormEmbed = document.getElementById("stormEmbed");
const stormPlaceholder = document.getElementById("stormPlaceholder");

const suppliesState = document.getElementById("suppliesState");
const suppliesFeedback = document.getElementById("suppliesFeedback");
const suppliesSuccess = document.getElementById("suppliesSuccess");
const confirmSuppliesButton = document.getElementById("confirmSuppliesButton");
const supplyChecks = document.querySelectorAll("[data-supply]");

const radioState = document.getElementById("radioState");
const radioLog = document.getElementById("radioLog");
const radioForm = document.getElementById("radioForm");
const radioAnswerInput = document.getElementById("radioAnswerInput");
const radioButton = document.getElementById("radioButton");
const radioFeedback = document.getElementById("radioFeedback");

const borderState = document.getElementById("borderState");
const mailPreview = document.getElementById("mailPreview");
const borderForm = document.getElementById("borderForm");
const borderAnswerInput = document.getElementById("borderAnswerInput");
const borderButton = document.getElementById("borderButton");
const borderFeedback = document.getElementById("borderFeedback");

const treesState = document.getElementById("treesState");
const treesLog = document.getElementById("treesLog");
const treesForm = document.getElementById("treesForm");
const treesAnswerInput = document.getElementById("treesAnswerInput");
const treesButton = document.getElementById("treesButton");
const treesFeedback = document.getElementById("treesFeedback");

const finalState = document.getElementById("finalState");
const finalLog = document.getElementById("finalLog");
const finalForm = document.getElementById("finalForm");
const finalAnswerInput = document.getElementById("finalAnswerInput");
const finalButton = document.getElementById("finalButton");
const finalFeedback = document.getElementById("finalFeedback");

const returnState = document.getElementById("returnState");
const returnLog = document.getElementById("returnLog");
const returnButton = document.getElementById("returnButton");
const returnFeedback = document.getElementById("returnFeedback");

const resetButton = document.getElementById("resetButton");

function defaultState() {
  return {
    unlocked: false,
    passengerCount: null,
    stormEmbedUrl: "",
    supplies: {
      aid: false,
      food: false,
      blankets: false,
      confirmed: false
    },
    radioConfirmed: false,
    borderCrossed: false,
    treesCleared: false,
    finalSignalSent: false,
    arrivalConfirmed: false
  };
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    return defaultState();
  }

  try {
    return { ...defaultState(), ...JSON.parse(saved) };
  } catch {
    return defaultState();
  }
}

const state = loadState();

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function normalize(value) {
  return value.trim().toLowerCase();
}

function completedStages() {
  return [
    state.supplies.confirmed,
    state.radioConfirmed,
    state.borderCrossed,
    state.treesCleared,
    state.finalSignalSent,
    state.arrivalConfirmed
  ].filter(Boolean).length;
}

function progressPercent() {
  if (!state.passengerCount) {
    return 0;
  }
  return Math.round((completedStages() / 6) * 100);
}

function updateVisibility() {
  lockScreen.classList.toggle("hidden", state.unlocked);
  app.classList.toggle("hidden", !state.unlocked);
}

function updateMissionStatus() {
  if (!state.passengerCount) {
    missionStatus.textContent = "Warte auf Missionsstart";
  } else if (!state.supplies.confirmed) {
    missionStatus.textContent = "Versorgung im Harrach-Wald wird gesichert";
  } else if (!state.radioConfirmed) {
    missionStatus.textContent = "Pilot wird ueber Funk eingebunden";
  } else if (!state.borderCrossed) {
    missionStatus.textContent = "Grenzueberquerung wird vorbereitet";
  } else if (!state.treesCleared) {
    missionStatus.textContent = "Route an den umgestuerzten Baeumen wird geklaert";
  } else if (!state.finalSignalSent) {
    missionStatus.textContent = "Letzte Freigabe zur Rettungsstation fehlt";
  } else if (!state.arrivalConfirmed) {
    missionStatus.textContent = "Die Gruppe erreicht die Rettungsstation";
  } else {
    missionStatus.textContent = "Alle Passagiere sind sicher aus dem Harrach-Wald heraus";
  }
}

function updateStormPanel() {
  stormState.textContent = state.stormEmbedUrl ? "Standort eingebettet" : "Sturm wird beobachtet";
  stormLog.textContent = state.stormEmbedUrl
    ? "Standort des Geraets gespeichert. Die Einsatzleitung kann die Route jetzt laufend am Sturm vorbeifuehren."
    : "Noch kein Standort eingebettet. Du kannst spaeter einen Karten- oder Geraetelink eintragen.";

  stormEmbedInput.value = state.stormEmbedUrl;
  stormEmbed.classList.toggle("hidden", !state.stormEmbedUrl);
  stormPlaceholder.classList.toggle("hidden", Boolean(state.stormEmbedUrl));

  if (state.stormEmbedUrl) {
    stormEmbed.src = state.stormEmbedUrl;
  } else {
    stormEmbed.removeAttribute("src");
  }
}

function updateSuppliesTask(count) {
  suppliesState.textContent = state.supplies.confirmed ? "Abgeschlossen" : count ? "Aktiv" : "Wartet auf Freigabe";
  suppliesSuccess.textContent = state.supplies.confirmed && count
    ? `Erste Hilfe, Nahrung und Decken sind gesichert. Alle ${count} Passagiere koennen nun weiterziehen.`
    : "";

  supplyChecks.forEach((checkbox) => {
    const key = checkbox.dataset.supply;
    checkbox.checked = state.supplies[key];
    checkbox.disabled = !count || state.supplies.confirmed;
  });

  confirmSuppliesButton.disabled = !count || state.supplies.confirmed;
}

function updateRadioTask(count) {
  radioState.textContent = state.radioConfirmed ? "Abgeschlossen" : state.supplies.confirmed ? "Aktiv" : "Gesperrt";
  radioButton.disabled = !state.supplies.confirmed || state.radioConfirmed;

  if (state.radioConfirmed && count) {
    radioLog.textContent = `Pilot meldet: ${count} Personen sind versorgt und bereit fuer die weitere Flucht durch den Harrach-Wald.`;
  } else {
    radioLog.textContent = "Noch kein Funkkontakt. Die Gruppe muss zuerst mit Material versorgt werden.";
  }
}

function updateBorderTask() {
  borderState.textContent = state.borderCrossed ? "Abgeschlossen" : state.radioConfirmed ? "Aktiv" : "Gesperrt";
  borderButton.disabled = !state.radioConfirmed || state.borderCrossed;
  mailPreview.textContent = state.borderCrossed
    ? "Mail entschluesselt: Der sichere Pfad am Grenzwaechter vorbei liegt im Osten."
    : "Die Mail nennt den sicheren Grenzpfad nur als Himmelsrichtung. Die Sonne geht dort auf.";
}

function updateTreesTask() {
  treesState.textContent = state.treesCleared ? "Abgeschlossen" : state.borderCrossed ? "Aktiv" : "Gesperrt";
  treesButton.disabled = !state.borderCrossed || state.treesCleared;
  treesLog.textContent = state.treesCleared
    ? "Leitstelle und Passagiere haben denselben Code bestaetigt. Der Pfad an den Baeumen ist frei."
    : "Noch keine Abstimmung. Erst die Grenze passieren, dann kann die Route um die Baeume geplant werden.";
}

function updateFinalTask() {
  finalState.textContent = state.finalSignalSent ? "Abgeschlossen" : state.treesCleared ? "Aktiv" : "Gesperrt";
  finalButton.disabled = !state.treesCleared || state.finalSignalSent;
  finalLog.textContent = state.finalSignalSent
    ? "Das Funkwort ALPHA ist bestaetigt. Die Lagerwiese der Rettungsstation ist in Sicht."
    : "Die Gruppe ist noch nicht nah genug an der Rettungsstation.";
}

function updateArrivalTask(count) {
  returnState.textContent = state.arrivalConfirmed ? "Abgeschlossen" : state.finalSignalSent ? "Aktiv" : "Gesperrt";
  returnButton.disabled = !state.finalSignalSent || state.arrivalConfirmed;
  returnLog.textContent = state.arrivalConfirmed && count
    ? `${count} Passagiere sind sicher auf der Lagerwiese der Rettungsstation angekommen.`
    : "Die Passagiere sind noch unterwegs und muessen zuerst alle Hindernisse hinter sich bringen.";
}

function render() {
  const count = state.passengerCount;

  totalPassengers.textContent = count ? `${count}` : "Noch nicht erfasst";
  suppliedPassengers.textContent = state.supplies.confirmed && count ? `${count}` : "0";
  returningPassengers.textContent = (state.finalSignalSent || state.arrivalConfirmed) && count ? `${count}` : "0";

  progressLabel.textContent = `${progressPercent()}%`;
  progressFill.style.width = `${progressPercent()}%`;

  missionLocked.classList.toggle("hidden", Boolean(count));
  missionContent.classList.toggle("hidden", !count);
  setupPanel.classList.toggle("hidden", Boolean(count));

  updateMissionStatus();
  updateStormPanel();
  updateSuppliesTask(count);
  updateRadioTask(count);
  updateBorderTask();
  updateTreesTask();
  updateFinalTask();
  updateArrivalTask(count);
}

passwordForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (passwordInput.value !== PASSWORD) {
    passwordFeedback.textContent = "Passwort falsch. Zugriff bleibt gesperrt.";
    passwordFeedback.className = "task-feedback error";
    return;
  }

  passwordFeedback.textContent = "";
  state.unlocked = true;
  saveState();
  updateVisibility();
  render();
});

setupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const count = Number.parseInt(passengerInput.value, 10);
  if (!Number.isInteger(count) || count <= 0) {
    return;
  }

  state.passengerCount = count;
  saveState();
  render();
});

stormForm.addEventListener("submit", (event) => {
  event.preventDefault();
  state.stormEmbedUrl = stormEmbedInput.value.trim();
  saveState();
  render();
});

supplyChecks.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
    const key = checkbox.dataset.supply;
    state.supplies[key] = checkbox.checked;
    saveState();
  });
});

confirmSuppliesButton.addEventListener("click", () => {
  const allFound = state.supplies.aid && state.supplies.food && state.supplies.blankets;

  if (!allFound) {
    suppliesFeedback.textContent = "Noch nicht alles gefunden. Auf der Karte fehlen noch Versorgungspunkte.";
    suppliesFeedback.className = "task-feedback error";
    return;
  }

  state.supplies.confirmed = true;
  suppliesFeedback.textContent = "Alle wichtigen Gueter sind gesichert.";
  suppliesFeedback.className = "task-feedback success";
  saveState();
  render();
});

radioForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const answer = normalize(radioAnswerInput.value);

  if (answer !== "112") {
    radioFeedback.textContent = "Falscher Notruf. Der Pilot wartet noch auf den europaweiten Code.";
    radioFeedback.className = "task-feedback error";
    return;
  }

  state.radioConfirmed = true;
  radioFeedback.textContent = "Notrufcode bestaetigt. Der Funkkontakt mit dem Pilot steht.";
  radioFeedback.className = "task-feedback success";
  saveState();
  render();
});

borderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const answer = normalize(borderAnswerInput.value);

  if (answer !== "osten" && answer !== "ost") {
    borderFeedback.textContent = "Die Mail ist noch nicht richtig entschluesselt. Gesucht ist die sichere Himmelsrichtung.";
    borderFeedback.className = "task-feedback error";
    return;
  }

  state.borderCrossed = true;
  borderFeedback.textContent = "Richtig. Die Gruppe passiert die Grenze ueber den oestlichen Pfad.";
  borderFeedback.className = "task-feedback success";
  saveState();
  render();
});

treesForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const answer = normalize(treesAnswerInput.value);

  if (answer !== "12") {
    treesFeedback.textContent = "Der Baum-Code stimmt noch nicht. Addiere die Zahlen noch einmal.";
    treesFeedback.className = "task-feedback error";
    return;
  }

  state.treesCleared = true;
  treesFeedback.textContent = "Code bestaetigt. Die Passagiere kommen an den umgestuerzten Baeumen vorbei.";
  treesFeedback.className = "task-feedback success";
  saveState();
  render();
});

finalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const answer = normalize(finalAnswerInput.value);

  if (answer !== "alpha") {
    finalFeedback.textContent = "Noch nicht richtig. Gesucht ist das NATO-Funkwort fuer den Buchstaben A.";
    finalFeedback.className = "task-feedback error";
    return;
  }

  state.finalSignalSent = true;
  finalFeedback.textContent = "Funkwort bestaetigt. Die letzten Meter zur Rettungsstation sind frei.";
  finalFeedback.className = "task-feedback success";
  saveState();
  render();
});

returnButton.addEventListener("click", () => {
  state.arrivalConfirmed = true;
  returnFeedback.textContent = "Ankunft bestaetigt. Die Gruppe ist sicher aus dem Harrach-Wald heraus.";
  returnFeedback.className = "task-feedback success";
  saveState();
  render();
});

resetButton.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  Object.assign(state, defaultState());

  passwordInput.value = "";
  passengerInput.value = "";
  stormEmbedInput.value = "";
  radioAnswerInput.value = "";
  borderAnswerInput.value = "";
  treesAnswerInput.value = "";
  finalAnswerInput.value = "";

  passwordFeedback.textContent = "";
  suppliesFeedback.textContent = "";
  radioFeedback.textContent = "";
  borderFeedback.textContent = "";
  treesFeedback.textContent = "";
  finalFeedback.textContent = "";
  returnFeedback.textContent = "";

  updateVisibility();
  render();
});

updateVisibility();
render();
