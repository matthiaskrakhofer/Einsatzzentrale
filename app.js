const PASSWORD = "RoterPanda25";
const STORAGE_KEY = "einsatzleitungszentrale-v4";

const lockScreen = document.getElementById("lockScreen");
const setupOverlay = document.getElementById("setupOverlay");
const app = document.getElementById("app");
const passwordForm = document.getElementById("passwordForm");
const passwordInput = document.getElementById("passwordInput");
const passwordFeedback = document.getElementById("passwordFeedback");

const setupForm = document.getElementById("setupForm");
const passengerInput = document.getElementById("passengerInput");

const totalPassengers = document.getElementById("totalPassengers");
const suppliedPassengers = document.getElementById("suppliedPassengers");
const returningPassengers = document.getElementById("returningPassengers");
const missionStatus = document.getElementById("missionStatus");
const phaseStatus = document.getElementById("phaseStatus");
const progressLabel = document.getElementById("progressLabel");
const progressFill = document.getElementById("progressFill");

const missionLocked = document.getElementById("missionLocked");
const missionContent = document.getElementById("missionContent");
const phaseCards = document.querySelectorAll(".phase-card");

const stormState = document.getElementById("stormState");
const stormLog = document.getElementById("stormLog");
const stormButton = document.getElementById("stormButton");
const stormFeedback = document.getElementById("stormFeedback");

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
    stormAcknowledged: false,
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
    state.stormAcknowledged,
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
  return Math.round((completedStages() / 7) * 100);
}

function currentPhase() {
  if (!state.passengerCount) {
    return null;
  }
  if (!state.stormAcknowledged) {
    return "storm";
  }
  if (!state.supplies.confirmed) {
    return "supplies";
  }
  if (!state.radioConfirmed) {
    return "radio";
  }
  if (!state.borderCrossed) {
    return "border";
  }
  if (!state.treesCleared) {
    return "trees";
  }
  if (!state.finalSignalSent) {
    return "final";
  }
  return "arrival";
}

function phaseLabel(phase) {
  switch (phase) {
    case "storm":
      return "Sturmwarnung";
    case "supplies":
      return "Versorgung sichern";
    case "radio":
      return "Pilot funken";
    case "border":
      return "Grenze ueberqueren";
    case "trees":
      return "Baeume umgehen";
    case "final":
      return "Letztes Funkwort";
    case "arrival":
      return state.arrivalConfirmed ? "Mission abgeschlossen" : "Ankunft bestaetigen";
    default:
      return "Noch nicht gestartet";
  }
}

function updateVisibility() {
  lockScreen.classList.toggle("hidden", state.unlocked);
  setupOverlay.classList.toggle("hidden", !state.unlocked || Boolean(state.passengerCount));
  app.classList.toggle("hidden", !state.unlocked);
}

function updatePhaseCards() {
  const activePhase = currentPhase();

  phaseCards.forEach((card) => {
    card.classList.toggle("hidden", card.dataset.phase !== activePhase);
  });

  phaseStatus.textContent = phaseLabel(activePhase);
}

function updateMissionStatus() {
  if (!state.passengerCount) {
    missionStatus.textContent = "Warte auf Missionsstart";
  } else if (!state.stormAcknowledged) {
    missionStatus.textContent = "Rettungsmission gestartet";
  } else if (!state.supplies.confirmed) {
    missionStatus.textContent = "Versorgung laeuft";
  } else if (!state.radioConfirmed) {
    missionStatus.textContent = "Funkkontakt herstellen";
  } else if (!state.borderCrossed) {
    missionStatus.textContent = "Grenze sichern";
  } else if (!state.treesCleared) {
    missionStatus.textContent = "Weg freimachen";
  } else if (!state.finalSignalSent) {
    missionStatus.textContent = "Letztes Signal fehlt";
  } else if (!state.arrivalConfirmed) {
    missionStatus.textContent = "Ankunft bestaetigen";
  } else {
    missionStatus.textContent = "Mission abgeschlossen";
  }
}

function updateStormPanel() {
  stormState.textContent = state.stormAcknowledged ? "Abgeschlossen" : "Aktiv";
  stormLog.textContent = state.stormAcknowledged
    ? "Sturmwarnung bestaetigt. Funk faellt in Sturmnaehe aus."
    : "Sturm im Blick behalten. In Sturmnaehe faellt der Funk aus.";
  stormButton.disabled = state.stormAcknowledged;
}

function updateSuppliesTask(count) {
  suppliesState.textContent = state.supplies.confirmed ? "Abgeschlossen" : count ? "Aktiv" : "Gesperrt";
  suppliesSuccess.textContent = state.supplies.confirmed && count
    ? `Versorgung gesichert. ${count} Passagiere koennen weiter.`
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
  radioLog.textContent = state.radioConfirmed && count
    ? `Pilot meldet: ${count} Personen bereit zum Weiterweg.`
    : "Noch kein Funkkontakt.";
}

function updateBorderTask() {
  borderState.textContent = state.borderCrossed ? "Abgeschlossen" : state.radioConfirmed ? "Aktiv" : "Gesperrt";
  borderButton.disabled = !state.radioConfirmed || state.borderCrossed;
  mailPreview.textContent = state.borderCrossed
    ? "Mail klar: Sicherer Pfad liegt im Osten."
    : "Sicherer Pfad ist die Richtung, in der die Sonne aufgeht.";
}

function updateTreesTask() {
  treesState.textContent = state.treesCleared ? "Abgeschlossen" : state.borderCrossed ? "Aktiv" : "Gesperrt";
  treesButton.disabled = !state.borderCrossed || state.treesCleared;
  treesLog.textContent = state.treesCleared
    ? "Code bestaetigt. Pfad ist frei."
    : "Pfad noch blockiert.";
}

function updateFinalTask() {
  finalState.textContent = state.finalSignalSent ? "Abgeschlossen" : state.treesCleared ? "Aktiv" : "Gesperrt";
  finalButton.disabled = !state.treesCleared || state.finalSignalSent;
  finalLog.textContent = state.finalSignalSent
    ? "ALPHA bestaetigt. Rettungsstation in Sicht."
    : "Freigabesignal fehlt noch.";
}

function updateArrivalTask(count) {
  returnState.textContent = state.arrivalConfirmed ? "Abgeschlossen" : state.finalSignalSent ? "Aktiv" : "Gesperrt";
  returnButton.disabled = !state.finalSignalSent || state.arrivalConfirmed;
  returnLog.textContent = state.arrivalConfirmed && count
    ? `${count} Passagiere sicher angekommen.`
    : "Gruppe noch unterwegs.";
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

  updateMissionStatus();
  updatePhaseCards();
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
    passwordFeedback.textContent = "Falsches Passwort.";
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
  updateVisibility();
  render();
});

stormButton.addEventListener("click", () => {
  state.stormAcknowledged = true;
  stormFeedback.textContent = "Sturmwarnung bestaetigt. Die Mission kann weitergehen.";
  stormFeedback.className = "task-feedback success";
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
    suppliesFeedback.textContent = "Versorgung unvollstaendig.";
    suppliesFeedback.className = "task-feedback error";
    return;
  }

  state.supplies.confirmed = true;
  suppliesFeedback.textContent = "Versorgung komplett.";
  suppliesFeedback.className = "task-feedback success";
  saveState();
  render();
});

radioForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const answer = normalize(radioAnswerInput.value);

  if (answer !== "112") {
    radioFeedback.textContent = "Falscher Notruf.";
    radioFeedback.className = "task-feedback error";
    return;
  }

  state.radioConfirmed = true;
  radioFeedback.textContent = "Funkkontakt steht.";
  radioFeedback.className = "task-feedback success";
  saveState();
  render();
});

borderForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const answer = normalize(borderAnswerInput.value);

  if (answer !== "osten" && answer !== "ost") {
    borderFeedback.textContent = "Falsche Richtung.";
    borderFeedback.className = "task-feedback error";
    return;
  }

  state.borderCrossed = true;
  borderFeedback.textContent = "Grenze passiert.";
  borderFeedback.className = "task-feedback success";
  saveState();
  render();
});

treesForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const answer = normalize(treesAnswerInput.value);

  if (answer !== "12") {
    treesFeedback.textContent = "Code falsch.";
    treesFeedback.className = "task-feedback error";
    return;
  }

  state.treesCleared = true;
  treesFeedback.textContent = "Pfad freigegeben.";
  treesFeedback.className = "task-feedback success";
  saveState();
  render();
});

finalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const answer = normalize(finalAnswerInput.value);

  if (answer !== "alpha") {
    finalFeedback.textContent = "Falsches Funkwort.";
    finalFeedback.className = "task-feedback error";
    return;
  }

  state.finalSignalSent = true;
  finalFeedback.textContent = "Letzte Freigabe erteilt.";
  finalFeedback.className = "task-feedback success";
  saveState();
  render();
});

returnButton.addEventListener("click", () => {
  state.arrivalConfirmed = true;
  returnFeedback.textContent = "Ankunft bestaetigt.";
  returnFeedback.className = "task-feedback success";
  saveState();
  render();
});

resetButton.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  Object.assign(state, defaultState());

  passwordInput.value = "";
  passengerInput.value = "";
  radioAnswerInput.value = "";
  borderAnswerInput.value = "";
  treesAnswerInput.value = "";
  finalAnswerInput.value = "";

  passwordFeedback.textContent = "";
  stormFeedback.textContent = "";
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
