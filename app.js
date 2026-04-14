const PASSWORD = "RoterPanda25";
const STORAGE_KEY = "einsatzleitungszentrale-v7";

const CARE_STEPS = [
  {
    key: "aid",
    title: "Erste Hilfe",
    text: "Hilf den Passagieren, die Erste Hilfe zu finden.",
    label: "Wie viele Passagiere wurden versorgt?",
    done: "Erste Hilfe abgeschlossen."
  },
  {
    key: "food",
    title: "Nahrung",
    text: "Hilf den Passagieren, Nahrung zu finden.",
    label: "Wie viele Passagiere wurden versorgt?",
    done: "Nahrung abgeschlossen."
  },
  {
    key: "warmth",
    title: "Waerme",
    text: "Hilf den Passagieren, Waerme zu finden.",
    label: "Wie viele Passagiere wurden versorgt?",
    done: "Waerme abgeschlossen."
  }
];

const lockScreen = document.getElementById("lockScreen");
const app = document.getElementById("app");
const stormReminder = document.getElementById("stormReminder");
const passwordForm = document.getElementById("passwordForm");
const passwordInput = document.getElementById("passwordInput");
const passwordFeedback = document.getElementById("passwordFeedback");

const carePopup = document.getElementById("carePopup");
const carePopupTitle = document.getElementById("carePopupTitle");
const carePopupText = document.getElementById("carePopupText");
const carePopupLabel = document.getElementById("carePopupLabel");
const carePopupForm = document.getElementById("carePopupForm");
const carePopupInput = document.getElementById("carePopupInput");
const carePopupButton = document.getElementById("carePopupButton");
const carePopupFeedback = document.getElementById("carePopupFeedback");
const weatherPopup = document.getElementById("weatherPopup");
const weatherPopupButton = document.getElementById("weatherPopupButton");

const totalPassengers = document.getElementById("totalPassengers");
const suppliedPassengers = document.getElementById("suppliedPassengers");
const returningPassengers = document.getElementById("returningPassengers");
const missionStatus = document.getElementById("missionStatus");
const phaseStatus = document.getElementById("phaseStatus");
const progressLabel = document.getElementById("progressLabel");
const progressFill = document.getElementById("progressFill");

const missionContent = document.getElementById("missionContent");
const phaseCards = document.querySelectorAll(".phase-card");

const stormState = document.getElementById("stormState");
const stormLog = document.getElementById("stormLog");
const stormButton = document.getElementById("stormButton");
const stormFeedback = document.getElementById("stormFeedback");

const suppliesState = document.getElementById("suppliesState");
const pilotLog = document.getElementById("pilotLog");
const passengerForm = document.getElementById("passengerForm");
const passengerInput = document.getElementById("passengerInput");
const confirmPassengersButton = document.getElementById("confirmPassengersButton");
const suppliesFeedback = document.getElementById("suppliesFeedback");
const suppliesSuccess = document.getElementById("suppliesSuccess");

const radioState = document.getElementById("radioState");
const radioLog = document.getElementById("radioLog");
const openCarePopupButton = document.getElementById("openCarePopupButton");
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
    radioKitReady: false,
    passengerCount: null,
    healed: {
      aid: null,
      food: null,
      warmth: null
    },
    activeCareStep: null,
    weatherAcknowledged: false,
    stormReminderVisible: false,
    returnStarted: false,
    treesCleared: false,
    finalSignalSent: false,
    arrivalConfirmed: false
  };
}

function loadState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return defaultState();
  try {
    const parsed = JSON.parse(saved);
    return {
      ...defaultState(),
      ...parsed,
      healed: { ...defaultState().healed, ...(parsed.healed || {}) }
    };
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

function healedTotal() {
  return (state.healed.aid || 0) + (state.healed.food || 0) + (state.healed.warmth || 0);
}

function phaseOneDone() {
  return state.passengerCount !== null && healedTotal() >= state.passengerCount;
}

function nextCareStep() {
  return CARE_STEPS.find((step) => state.healed[step.key] === null) || null;
}

function completedStages() {
  return [
    state.radioKitReady,
    state.passengerCount !== null,
    phaseOneDone(),
    state.returnStarted,
    state.treesCleared,
    state.finalSignalSent,
    state.arrivalConfirmed
  ].filter(Boolean).length;
}

function progressPercent() {
  return Math.round((completedStages() / 7) * 100);
}

function currentPhase() {
  if (!state.radioKitReady) return "storm";
  if (state.passengerCount === null) return "supplies";
  if (!phaseOneDone()) return "radio";
  if (!state.weatherAcknowledged) return "radio";
  if (!state.returnStarted) return "border";
  if (!state.treesCleared) return "trees";
  if (!state.finalSignalSent) return "final";
  return "arrival";
}

function phaseLabel(phase) {
  switch (phase) {
    case "storm": return "Funkgeraet";
    case "supplies": return "Pilot";
    case "radio": return phaseOneDone() && !state.weatherAcknowledged ? "Wetterwarnung" : "Phase 1";
    case "border": return "Phase 2";
    case "trees": return "Hindernis";
    case "final": return "Signal";
    case "arrival": return state.arrivalConfirmed ? "Abgeschlossen" : "Ankunft";
    default: return "Warte";
  }
}

function updateVisibility() {
  lockScreen.classList.toggle("hidden", state.unlocked);
  app.classList.toggle("hidden", !state.unlocked);
  stormReminder.classList.toggle("hidden", !state.unlocked || !state.stormReminderVisible);
  carePopup.classList.toggle("hidden", !state.unlocked || state.activeCareStep === null);
  weatherPopup.classList.toggle("hidden", !state.unlocked || !phaseOneDone() || state.weatherAcknowledged);
}

function updatePhaseCards() {
  const activePhase = currentPhase();
  phaseCards.forEach((card) => {
    card.classList.toggle("hidden", card.dataset.phase !== activePhase);
  });
  phaseStatus.textContent = phaseLabel(activePhase);
}

function updateMissionStatus() {
  if (!state.unlocked) {
    missionStatus.textContent = "Warte auf Zugriff";
  } else if (!state.radioKitReady) {
    missionStatus.textContent = "Funkgeraet holen";
  } else if (state.passengerCount === null) {
    missionStatus.textContent = "Pilot befragen";
  } else if (!phaseOneDone()) {
    missionStatus.textContent = "Phase 1: Versorgung";
  } else if (!state.weatherAcknowledged) {
    missionStatus.textContent = "Wetterwarnung";
  } else if (!state.returnStarted) {
    missionStatus.textContent = "Phase 2: Rueckweg";
  } else if (!state.treesCleared) {
    missionStatus.textContent = "Hindernis raeumen";
  } else if (!state.finalSignalSent) {
    missionStatus.textContent = "Letztes Signal";
  } else if (!state.arrivalConfirmed) {
    missionStatus.textContent = "Ankunft bestaetigen";
  } else {
    missionStatus.textContent = "Mission abgeschlossen";
  }
}

function updateCarePopup() {
  const step = CARE_STEPS.find((item) => item.key === state.activeCareStep);
  if (!step) {
    carePopupFeedback.textContent = "";
    return;
  }
  carePopupTitle.textContent = step.title;
  carePopupText.textContent = step.text;
  carePopupLabel.textContent = step.label;
  carePopupButton.textContent = `${step.title} bestaetigen`;
}

function updateStartTask() {
  stormState.textContent = state.radioKitReady ? "Abgeschlossen" : "Aktiv";
  stormLog.textContent = state.radioKitReady ? "Funkgeraete uebernommen." : "Ohne Funkgeraet kein Kontakt.";
  stormButton.disabled = state.radioKitReady;
}

function updatePassengerTask() {
  suppliesState.textContent = state.passengerCount !== null ? "Abgeschlossen" : state.radioKitReady ? "Aktiv" : "Gesperrt";
  pilotLog.textContent = state.passengerCount !== null
    ? `Pilot meldet: ${state.passengerCount} Passagiere.`
    : "Stelle zuerst Funkkontakt her.";
  confirmPassengersButton.disabled = !state.radioKitReady || state.passengerCount !== null;
  suppliesSuccess.textContent = state.passengerCount !== null ? `${state.passengerCount} Passagiere erfasst.` : "";
}

function updatePhaseOneTask() {
  radioState.textContent = phaseOneDone() ? "Abgeschlossen" : state.passengerCount !== null ? "Aktiv" : "Gesperrt";
  openCarePopupButton.disabled = state.passengerCount === null || phaseOneDone();

  if (phaseOneDone()) {
    radioLog.textContent = `Phase 1 abgeschlossen. ${healedTotal()} Personen versorgt.`;
  } else if (state.passengerCount !== null) {
    const next = nextCareStep();
    radioLog.textContent = next
      ? `Naechster Schritt: ${next.title}. Versorgt: ${healedTotal()} / ${state.passengerCount}`
      : `Versorgt: ${healedTotal()} / ${state.passengerCount}`;
  } else {
    radioLog.textContent = "Versorgung noch nicht gestartet.";
  }
}

function updateReturnTask() {
  borderState.textContent = state.returnStarted ? "Abgeschlossen" : phaseOneDone() ? "Aktiv" : "Gesperrt";
  borderButton.disabled = !phaseOneDone() || state.returnStarted;
  mailPreview.textContent = state.returnStarted
    ? "Rueckweg freigegeben: Osten."
    : "Erst alle versorgen. Dann Rueckweg nach Osten.";
}

function updateTreesTask() {
  treesState.textContent = state.treesCleared ? "Abgeschlossen" : state.returnStarted ? "Aktiv" : "Gesperrt";
  treesButton.disabled = !state.returnStarted || state.treesCleared;
  treesLog.textContent = state.treesCleared ? "Pfad frei." : "Pfad blockiert.";
}

function updateFinalTask() {
  finalState.textContent = state.finalSignalSent ? "Abgeschlossen" : state.treesCleared ? "Aktiv" : "Gesperrt";
  finalButton.disabled = !state.treesCleared || state.finalSignalSent;
  finalLog.textContent = state.finalSignalSent ? "ALPHA bestaetigt." : "Freigabesignal fehlt.";
}

function updateArrivalTask() {
  returnState.textContent = state.arrivalConfirmed ? "Abgeschlossen" : state.finalSignalSent ? "Aktiv" : "Gesperrt";
  returnButton.disabled = !state.finalSignalSent || state.arrivalConfirmed;
  returnLog.textContent = state.arrivalConfirmed ? "Gruppe sicher angekommen." : "Gruppe noch unterwegs.";
}

function render() {
  totalPassengers.textContent = state.passengerCount === null ? "Unbekannt" : `${state.passengerCount}`;
  suppliedPassengers.textContent = `${healedTotal()}`;
  returningPassengers.textContent = state.arrivalConfirmed && state.passengerCount !== null ? `${state.passengerCount}` : "0";
  progressLabel.textContent = `${progressPercent()}%`;
  progressFill.style.width = `${progressPercent()}%`;

  missionContent.classList.toggle("hidden", !state.unlocked);

  updateMissionStatus();
  updatePhaseCards();
  updateStartTask();
  updatePassengerTask();
  updatePhaseOneTask();
  updateReturnTask();
  updateTreesTask();
  updateFinalTask();
  updateArrivalTask();
  updateCarePopup();
  updateVisibility();
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
  render();
});

stormButton.addEventListener("click", () => {
  state.radioKitReady = true;
  stormFeedback.textContent = "Funkgeraete erhalten.";
  stormFeedback.className = "task-feedback success";
  saveState();
  render();
});

passengerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const count = Number.parseInt(passengerInput.value, 10);
  if (!Number.isInteger(count) || count <= 0) {
    suppliesFeedback.textContent = "Ungueltige Zahl.";
    suppliesFeedback.className = "task-feedback error";
    return;
  }
  state.passengerCount = count;
  suppliesFeedback.textContent = "Passagierzahl bestaetigt.";
  suppliesFeedback.className = "task-feedback success";
  saveState();
  render();
});

openCarePopupButton.addEventListener("click", () => {
  const next = nextCareStep();
  if (!next) return;
  state.activeCareStep = next.key;
  carePopupInput.value = "";
  carePopupFeedback.textContent = "";
  saveState();
  render();
});

carePopupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const value = Number.parseInt(carePopupInput.value, 10);
  if (!Number.isInteger(value) || value < 0) {
    carePopupFeedback.textContent = "Ungueltige Zahl.";
    carePopupFeedback.className = "task-feedback error";
    return;
  }

  const step = CARE_STEPS.find((item) => item.key === state.activeCareStep);
  if (!step) return;

  state.healed[step.key] = value;
  radioFeedback.textContent = step.done;
  radioFeedback.className = "task-feedback success";

  const next = nextCareStep();
  if (next) {
    state.activeCareStep = next.key;
    carePopupInput.value = "";
    carePopupFeedback.textContent = "";
  } else {
    state.activeCareStep = null;
    if (phaseOneDone()) {
      state.stormReminderVisible = true;
    }
  }

  saveState();
  render();
});

weatherPopupButton.addEventListener("click", () => {
  state.weatherAcknowledged = true;
  state.stormReminderVisible = true;
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
  state.returnStarted = true;
  borderFeedback.textContent = "Rueckweg gestartet.";
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
  borderAnswerInput.value = "";
  treesAnswerInput.value = "";
  finalAnswerInput.value = "";
  carePopupInput.value = "";

  passwordFeedback.textContent = "";
  stormFeedback.textContent = "";
  suppliesFeedback.textContent = "";
  suppliesSuccess.textContent = "";
  radioFeedback.textContent = "";
  borderFeedback.textContent = "";
  treesFeedback.textContent = "";
  finalFeedback.textContent = "";
  returnFeedback.textContent = "";
  carePopupFeedback.textContent = "";

  render();
});

render();
