const PASSWORD = "roterpanda13";
const STORAGE_KEY = "einsatzleitungszentrale-v12";
const MORSE_EMAIL_PLAIN = "Erzaehle dem Waechter folgenden Witz: Faehrt ein Panda ueber die Strasse - BamBus";
const MORSE_EMAIL_CODE = ". .-. --.. .- . .... .-.. . / -.. . -- / .-- .- . -.-. .... - . .-. / ..-. --- .-.. --. . -. -.. . -. / .-- .. - --.. ---... / ..-. .- . .... .-. - / . .. -. / .--. .- -. -.. .- / ..- . -... . .-. / -.. .. . / ... - .-. .- ... ... . / -....- / -... .- -- -... ..- ...";
const WILDLIFE_PHONE = "06702069205";
const WILDLIFE_PHONE_DISPLAY = "06702069205";
const WILDLIFE_DIGITS = [
  { title: "1. Ziffer", clue: "Die kleinste gerade Zahl", answer: "0" },
  { title: "2. Ziffer", clue: "Anzahl der Todsuenden minus 1", answer: "6" },
  { title: "3. Ziffer", clue: "Anzahl der Zwerge", answer: "7" },
  { title: "4. Ziffer", clue: "Die kleinste gerade Zahl", answer: "0" },
  { title: "5. Ziffer", clue: "Anzahl der Finger einer Hand minus 3", answer: "2" },
  { title: "6. Ziffer", clue: "Die kleinste gerade Zahl", answer: "0" },
  { title: "7. Ziffer", clue: "Anzahl der Seiten eines Wuerfels", answer: "6" },
  { title: "8. Ziffer", clue: "Anzahl der Katzenleben laut Mythos", answer: "9" },
  { title: "9. Ziffer", clue: "Anzahl der Katzenleben minus 7", answer: "2" },
  { title: "10. Ziffer", clue: "Die kleinste gerade Zahl", answer: "0" },
  { title: "11. Ziffer", clue: "Anzahl der Finger einer Hand", answer: "5" }
];

const CARE_STEPS = [
  { key: "aid", title: "Erste Hilfe", text: "Hilf den GuSp, die Erste Hilfe zu finden.", label: "Wie viele GuSp wurden versorgt?", done: "Erste Hilfe abgeschlossen." },
  { key: "food", title: "Nahrung", text: "Hilf den GuSp, Nahrung zu finden.", label: "Wie viele GuSp wurden versorgt?", done: "Nahrung abgeschlossen." },
  { key: "warmth", title: "Waerme", text: "Hilf den GuSp, Waerme zu finden.", label: "Wie viele GuSp wurden versorgt?", done: "Waerme abgeschlossen." }
];

const LEADERSHIP_JOBS = [
  "Berufsfeuerwehr",
  "Rettungsdienst",
  "Polizei",
  "Bergrettung",
  "Zivilschutz",
  "Luftrettung",
  "Katastrophenschutz",
  "Geheimdienst",
  "Krisenstab",
  "Sondereinsatzkoordination"
];

const LEADERSHIP_ROLES = [
  "Funkleitung",
  "Lagebild",
  "Wetterlage",
  "Sicherheitsfreigabe",
  "Routenkoordination",
  "Verbindung Sicherheitsoffizier",
  "Dokumentation",
  "Gefahrenanalyse",
  "Tierlage",
  "Entscheidungsfreigabe"
];

const lockScreen = document.getElementById("lockScreen");
const app = document.getElementById("app");
const stormReminder = document.getElementById("stormReminder");
const leadershipPopup = document.getElementById("leadershipPopup");
const leadershipForm = document.getElementById("leadershipForm");
const leadershipInput = document.getElementById("leadershipInput");
const leadershipFeedback = document.getElementById("leadershipFeedback");
const leadershipProfiles = document.getElementById("leadershipProfiles");
const leadershipCommandText = document.getElementById("leadershipCommandText");
const leadershipProfilesList = document.getElementById("leadershipProfilesList");
const prelockPanel = document.getElementById("prelockPanel");
const prelockButton = document.getElementById("prelockButton");
const passwordForm = document.getElementById("passwordForm");
const passwordInput = document.getElementById("passwordInput");
const passwordFeedback = document.getElementById("passwordFeedback");
const heroAddress = document.getElementById("heroAddress");

const carePopup = document.getElementById("carePopup");
const carePopupTitle = document.getElementById("carePopupTitle");
const carePopupText = document.getElementById("carePopupText");
const carePopupLabel = document.getElementById("carePopupLabel");
const carePopupForm = document.getElementById("carePopupForm");
const carePopupInput = document.getElementById("carePopupInput");
const carePopupButton = document.getElementById("carePopupButton");
const carePopupFeedback = document.getElementById("carePopupFeedback");

const phaseOnePopup = document.getElementById("phaseOnePopup");
const phaseOnePopupButton = document.getElementById("phaseOnePopupButton");
const weatherPopup = document.getElementById("weatherPopup");
const weatherPopupButton = document.getElementById("weatherPopupButton");
const weatherPopupTextA = document.getElementById("weatherPopupTextA");
const weatherPopupTextB = document.getElementById("weatherPopupTextB");
const wildlifePopup = document.getElementById("wildlifePopup");
const wildlifePuzzleLog = document.getElementById("wildlifePuzzleLog");
const wildlifeDecryptButton = document.getElementById("wildlifeDecryptButton");
const wildlifeContactCard = document.getElementById("wildlifeContactCard");
const wildlifePhoneText = document.getElementById("wildlifePhoneText");
const wildlifeFollowup = document.getElementById("wildlifeFollowup");
const wildlifeContactCheck = document.getElementById("wildlifeContactCheck");
const wildlifeClearCheck = document.getElementById("wildlifeClearCheck");
const wildlifePopupButton = document.getElementById("wildlifePopupButton");
const wildlifeCipherPopup = document.getElementById("wildlifeCipherPopup");
const wildlifeCipherTitle = document.getElementById("wildlifeCipherTitle");
const wildlifeCipherText = document.getElementById("wildlifeCipherText");
const wildlifeCipherForm = document.getElementById("wildlifeCipherForm");
const wildlifeCipherInput = document.getElementById("wildlifeCipherInput");
const wildlifeCipherButton = document.getElementById("wildlifeCipherButton");
const wildlifeCipherAttempts = document.getElementById("wildlifeCipherAttempts");
const wildlifeCipherFeedback = document.getElementById("wildlifeCipherFeedback");
const quicksandPopup = document.getElementById("quicksandPopup");
const quicksandViewedCheck = document.getElementById("quicksandViewedCheck");
const phaseOnePopupText = document.getElementById("phaseOnePopupText");

const totalPassengers = document.getElementById("totalPassengers");
const suppliedPassengers = document.getElementById("suppliedPassengers");
const returningPassengers = document.getElementById("returningPassengers");
const missionStatus = document.getElementById("missionStatus");
const phaseStatus = document.getElementById("phaseStatus");
const progressLabel = document.getElementById("progressLabel");
const progressFill = document.getElementById("progressFill");
const missionTimer = document.getElementById("missionTimer");
const prologuePanel = document.getElementById("prologuePanel");
const prologueStage = document.getElementById("prologueStage");
const prologueScenes = Array.from(document.querySelectorAll(".prologue-scene"));
const prologueCounter = document.getElementById("prologueCounter");
const prologuePrev = document.getElementById("prologuePrev");
const prologueNext = document.getElementById("prologueNext");
const prologueClose = document.getElementById("prologueClose");
const prologueOpen = document.getElementById("prologueOpen");

const missionContent = document.getElementById("missionContent");
const phaseCards = document.querySelectorAll(".phase-card");

const stormState = document.getElementById("stormState");
const stormLog = document.getElementById("stormLog");
const stormButton = document.getElementById("stormButton");
const stormFeedback = document.getElementById("stormFeedback");
const stormReminderText = document.getElementById("stormReminderText");

const suppliesState = document.getElementById("suppliesState");
const pilotLog = document.getElementById("pilotLog");
const passengerForm = document.getElementById("passengerForm");
const passengerInput = document.getElementById("passengerInput");
const crewInput = document.getElementById("crewInput");
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
const treesButton = document.getElementById("treesButton");
const treesFeedback = document.getElementById("treesFeedback");

const finalState = document.getElementById("finalState");
const finalLog = document.getElementById("finalLog");
const finalButton = document.getElementById("finalButton");
const finalFeedback = document.getElementById("finalFeedback");

const returnState = document.getElementById("returnState");
const returnLog = document.getElementById("returnLog");
const returnButton = document.getElementById("returnButton");
const returnFeedback = document.getElementById("returnFeedback");

const routeState = document.getElementById("routeState");
const routeLog = document.getElementById("routeLog");
const quicksandButton = document.getElementById("quicksandButton");
const quicksandClearCheck = document.getElementById("quicksandClearCheck");
const routeButton = document.getElementById("routeButton");
const wildlifeButton = document.getElementById("wildlifeButton");
const routeFeedback = document.getElementById("routeFeedback");

const phaseTwoState = document.getElementById("phaseTwoState");
const phaseTwoLog = document.getElementById("phaseTwoLog");
const phaseTwoButton = document.getElementById("phaseTwoButton");
const phaseTwoFeedback = document.getElementById("phaseTwoFeedback");

const rescueState = document.getElementById("rescueState");
const rescueLog = document.getElementById("rescueLog");
const rescueForm = document.getElementById("rescueForm");
const rescueNameInput = document.getElementById("rescueNameInput");
const rescueNameButton = document.getElementById("rescueNameButton");
const crewRescueForm = document.getElementById("crewRescueForm");
const crewRescueNameInput = document.getElementById("crewRescueNameInput");
const crewRescueNameButton = document.getElementById("crewRescueNameButton");
const rescueFeedback = document.getElementById("rescueFeedback");
const rescuedNamesList = document.getElementById("rescuedNamesList");
const rescuedCrewNamesList = document.getElementById("rescuedCrewNamesList");
const missionCompleteCard = document.getElementById("missionCompleteCard");
const missionCompleteText = document.getElementById("missionCompleteText");
const completionScreen = document.getElementById("completionScreen");
const completionLeadText = document.getElementById("completionLeadText");
const completionTimerValue = document.getElementById("completionTimerValue");
const completionRescueValue = document.getElementById("completionRescueValue");
const completionNamesList = document.getElementById("completionNamesList");
const completionCrewNamesList = document.getElementById("completionCrewNamesList");
const completionCrewText = document.getElementById("completionCrewText");
const completionResetButton = document.getElementById("completionResetButton");

const resetButton = document.getElementById("resetButton");
let prelockReady = false;
let currentPrologueScene = 0;

function defaultState() {
  return {
    unlocked: false,
    leadershipConfirmed: false,
    leadershipNames: [],
    leadershipProfiles: [],
    prologueDismissed: false,
    missionStartedAt: null,
    missionCompletedAt: null,
    radioKitReady: false,
    passengerCount: null,
    crewCount: null,
    healed: { aid: null, food: null, warmth: null },
    activeCareStep: null,
    phaseOneAcknowledged: false,
    weatherAcknowledged: false,
    stormReminderVisible: false,
    returnStarted: false,
    treesCleared: false,
    mailSolved: false,
    riverCrossed: false,
    routeConfirmed: false,
    wildlifeAlerted: false,
    wildlifeBriefed: false,
    wildlifePhoneUnlocked: false,
    wildlifeCipherOpen: false,
    wildlifeDigitIndex: 0,
    wildlifeDigitAttemptsLeft: 3,
    wildlifeContactConfirmed: false,
    wildlifeDangerCleared: false,
    quicksandUnlocked: false,
    quicksandViewed: false,
    quicksandCrossed: false,
    phaseTwoClosed: false,
    rescuedNames: [],
    rescuedCrewNames: []
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
      rescuedNames: parsed.rescuedNames || [],
      rescuedCrewNames: parsed.rescuedCrewNames || [],
      healed: { ...defaultState().healed, ...(parsed.healed || {}) }
    };
  } catch {
    return defaultState();
  }
}

const state = loadState();
let missionTimerInterval = null;

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function normalize(value) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

function leadershipDisplayName() {
  const names = state.leadershipNames || [];
  if (!names.length) return "Einsatzleitung";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} und ${names[1]}`;
  return `${names.slice(0, -1).join(", ")} und ${names[names.length - 1]}`;
}

function currentCommanderIndex() {
  if (!state.leadershipProfiles.length) return 0;
  return completedStages() % state.leadershipProfiles.length;
}

function currentCommanderName() {
  if (!state.leadershipProfiles.length) return "Einsatzleitung";
  return state.leadershipProfiles[currentCommanderIndex()].name;
}

function generateLeadershipProfiles(names) {
  return names.map((name, index) => ({
    name,
    age: 22 + Math.floor(Math.random() * 21),
    job: LEADERSHIP_JOBS[index % LEADERSHIP_JOBS.length],
    role: LEADERSHIP_ROLES[index % LEADERSHIP_ROLES.length]
  }));
}

function healedTotal() {
  return (state.healed.aid || 0) + (state.healed.food || 0) + (state.healed.warmth || 0);
}

function totalPeople() {
  if (state.passengerCount === null || state.crewCount === null) return null;
  return state.passengerCount + state.crewCount;
}

function rescueTarget() {
  return totalPeople() || 0;
}

function rescueComplete() {
  return rescueTarget() > 0
    && state.rescuedNames.length === (state.passengerCount || 0)
    && state.rescuedCrewNames.length === (state.crewCount || 0);
}

function rescuedTotal() {
  return state.rescuedNames.length + state.rescuedCrewNames.length;
}

function wildlifeResolved() {
  return !state.wildlifeAlerted || (
    state.wildlifePhoneUnlocked &&
    state.wildlifeContactConfirmed &&
    state.wildlifeDangerCleared
  );
}

function formatElapsedTime(ms) {
  const safeMs = Math.max(0, ms);
  const totalHundredths = Math.floor(safeMs / 10);
  const hundredths = totalHundredths % 100;
  const totalSeconds = Math.floor(totalHundredths / 100);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const hours = Math.floor(totalMinutes / 60);

  return [
    String(hours).padStart(2, "0"),
    String(minutes).padStart(2, "0"),
    String(seconds).padStart(2, "0")
  ].join(":") + `.${String(hundredths).padStart(2, "0")}`;
}

function currentElapsedMs() {
  if (!state.missionStartedAt) return 0;
  const end = state.missionCompletedAt || Date.now();
  return end - state.missionStartedAt;
}

function updateMissionTimer() {
  if (!missionTimer) return;
  missionTimer.textContent = formatElapsedTime(currentElapsedMs());
}

function syncMissionTimer() {
  updateMissionTimer();

  const shouldRun = Boolean(state.missionStartedAt) && !state.missionCompletedAt;
  if (shouldRun && !missionTimerInterval) {
    missionTimerInterval = window.setInterval(updateMissionTimer, 50);
  } else if (!shouldRun && missionTimerInterval) {
    window.clearInterval(missionTimerInterval);
    missionTimerInterval = null;
  }
}

function updatePrologueUI() {
  if (!prologueScenes.length) return;

  const shouldLockPrologue =
    state.unlocked &&
    state.leadershipConfirmed &&
    !state.prologueDismissed &&
    currentPrologueScene < prologueScenes.length;

  document.body.classList.toggle("prologue-reading", shouldLockPrologue);

  if (prologuePanel) {
    prologuePanel.classList.toggle("hidden", state.prologueDismissed);
  }

  if (prologueOpen) {
    prologueOpen.classList.toggle("hidden", !state.prologueDismissed);
  }

  prologueScenes.forEach((scene, index) => {
    scene.classList.toggle("is-active", index === currentPrologueScene);
  });

  if (prologueCounter) {
    prologueCounter.textContent = `Szene ${currentPrologueScene + 1} von ${prologueScenes.length}`;
  }

  if (prologuePrev) {
    prologuePrev.disabled = currentPrologueScene === 0;
  }

  if (prologueNext) {
    prologueNext.disabled = currentPrologueScene === prologueScenes.length - 1;
  }

  if (prologueClose) {
    prologueClose.classList.toggle("hidden", state.prologueDismissed || currentPrologueScene !== prologueScenes.length - 1);
  }
}

function changePrologueScene(step) {
  const nextIndex = Math.min(
    prologueScenes.length - 1,
    Math.max(0, currentPrologueScene + step)
  );

  if (nextIndex === currentPrologueScene) return;
  currentPrologueScene = nextIndex;
  updatePrologueUI();
}

function phaseOneDone() {
  return state.passengerCount !== null && healedTotal() === state.passengerCount;
}

function nextCareStep() {
  return CARE_STEPS.find((step) => state.healed[step.key] === null) || null;
}

function completedStages() {
  return [
    state.radioKitReady,
    state.passengerCount !== null && state.crewCount !== null,
    phaseOneDone(),
    state.phaseOneAcknowledged,
    state.weatherAcknowledged,
    state.returnStarted,
    state.treesCleared,
    state.mailSolved,
    state.riverCrossed,
    state.wildlifeAlerted && wildlifeResolved(),
    state.quicksandCrossed,
    state.routeConfirmed,
    state.phaseTwoClosed,
    rescueComplete()
  ].filter(Boolean).length;
}

function progressPercent() {
  const targetStages = 13 + (state.wildlifeAlerted ? 1 : 0);
  return Math.round((completedStages() / targetStages) * 100);
}

function currentPhase() {
  if (!state.radioKitReady) return "storm";
  if (state.passengerCount === null || state.crewCount === null) return "supplies";
  if (!phaseOneDone()) return "radio";
  if (!state.phaseOneAcknowledged) return "radio";
  if (!state.weatherAcknowledged) return "radio";
  if (!state.returnStarted) return "border";
  if (!state.treesCleared) return "trees";
  if (!state.mailSolved) return "final";
  if (!state.riverCrossed) return "arrival";
  if (!state.routeConfirmed) return "route";
  if (!state.phaseTwoClosed) return "phase2close";
  return "rescue";
}

function phaseLabel(phase) {
  if (rescueComplete()) return "Mission abgeschlossen";
  switch (phase) {
    case "storm": return "Funkgeraet";
    case "supplies": return "Pilot";
    case "radio":
      if (phaseOneDone() && !state.phaseOneAcknowledged) return "Phase 1 abgeschlossen";
      if (phaseOneDone() && !state.weatherAcknowledged) return "Wetterwarnung";
      return "Phase 1";
    case "border": return "Rueckweg-Karte";
    case "trees": return "Grenzfluss";
    case "final": return "Mail";
    case "arrival": return state.riverCrossed ? "Bruecke ueberquert" : "Bruecke";
    case "route": return "Heimweg";
    case "phase2close": return "Phase 2 Ende";
    case "rescue": return rescueComplete() ? "Alle zurueck" : "Gerettete erfassen";
    default: return "Warte";
  }
}

function updateVisibility() {
  lockScreen.classList.toggle("hidden", state.unlocked);
  app.classList.toggle("hidden", !state.unlocked || !state.leadershipConfirmed);
  prelockPanel.classList.toggle("hidden", prelockReady);
  passwordForm.classList.toggle("hidden", !prelockReady);
  leadershipPopup.classList.toggle("hidden", !state.unlocked || state.leadershipConfirmed);
  leadershipProfiles.classList.toggle("hidden", !state.unlocked || !state.leadershipConfirmed);
  stormReminder.classList.toggle("hidden", !state.unlocked || !state.stormReminderVisible);
  completionScreen.classList.toggle("hidden", !state.unlocked || !rescueComplete());
  carePopup.classList.toggle("hidden", !state.unlocked || state.activeCareStep === null);
  phaseOnePopup.classList.toggle("hidden", !state.unlocked || !phaseOneDone() || state.phaseOneAcknowledged);
  weatherPopup.classList.toggle("hidden", !state.unlocked || !phaseOneDone() || !state.phaseOneAcknowledged || state.weatherAcknowledged);
  wildlifePopup.classList.toggle("hidden", !state.unlocked || !state.wildlifeAlerted || state.wildlifeBriefed);
  wildlifeCipherPopup.classList.toggle("hidden", !state.unlocked || !state.wildlifeCipherOpen);
  quicksandPopup.classList.toggle("hidden", !state.unlocked || !state.quicksandUnlocked || state.quicksandViewed);
}

function updateLeadershipUI() {
  const address = leadershipDisplayName();
  const commander = currentCommanderName();
  heroAddress.textContent = address;
  stormReminderText.textContent = "Sturm im Blick. Funk aus bei Naehe.";
  weatherPopupTextA.textContent = `${address}, bitte den Sicherheitsoffizier um einen zweiten Laptop und eine Einschulung.`;
  weatherPopupTextB.textContent = `${address}, mit dem zweiten Laptop behaltet ihr den Sturm waehrend des Rueckwegs im Blick.`;
  phaseOnePopupText.textContent = `${address}, alle GuSp wurden versorgt. Der Rueckweg kann jetzt vorbereitet werden.`;
  leadershipCommandText.replaceChildren();
  const commandLabel = document.createElement("span");
  commandLabel.className = "leadership-command-label";
  commandLabel.textContent = "Aktuelle Einsatzleitung";
  const commandName = document.createElement("strong");
  commandName.className = "leadership-command-name";
  commandName.textContent = commander;
  leadershipCommandText.append(commandLabel, commandName);

  leadershipProfilesList.innerHTML = "";
  state.leadershipProfiles.forEach((profile, index) => {
    const card = document.createElement("article");
    card.className = "leadership-card";
    if (index === currentCommanderIndex()) card.classList.add("is-command");

    if (index === currentCommanderIndex()) {
      const badge = document.createElement("span");
      badge.className = "command-badge";
      badge.textContent = "Aktuelle Einsatzleitung";
      card.appendChild(badge);
    }

    const title = document.createElement("h3");
    title.textContent = profile.name;
    card.appendChild(title);

    const age = document.createElement("p");
    age.textContent = `Alter: ${profile.age}`;
    card.appendChild(age);

    const job = document.createElement("p");
    job.textContent = `Beruf: ${profile.job}`;
    card.appendChild(job);

    const role = document.createElement("p");
    role.textContent = `Funktion: ${profile.role}`;
    card.appendChild(role);

    leadershipProfilesList.appendChild(card);
  });
}

function updatePhaseCards() {
  const activePhase = currentPhase();
  phaseCards.forEach((card) => {
    const isActive = card.dataset.phase === activePhase;
    card.classList.toggle("hidden", !isActive);
    card.classList.toggle("active-task", isActive);
  });
  phaseStatus.textContent = phaseLabel(activePhase);
}

function updateMissionStatus() {
  if (!state.unlocked) missionStatus.textContent = "Warte auf Zugriff";
  else if (!state.radioKitReady) missionStatus.textContent = "Funkgeraet holen";
  else if (state.passengerCount === null || state.crewCount === null) missionStatus.textContent = "Pilot befragen";
  else if (!phaseOneDone()) missionStatus.textContent = "Phase 1: Versorgung";
  else if (!state.phaseOneAcknowledged) missionStatus.textContent = "Phase 1 abgeschlossen";
  else if (!state.weatherAcknowledged) missionStatus.textContent = "Wetterwarnung";
  else if (!state.returnStarted) missionStatus.textContent = "Rueckweg-Karte";
  else if (!state.treesCleared) missionStatus.textContent = "Zum Grenzfluss leiten";
  else if (!state.mailSolved) missionStatus.textContent = "Mail entschluesseln";
  else if (!state.riverCrossed) missionStatus.textContent = "Bruecke ueberqueren";
  else if (!state.routeConfirmed) missionStatus.textContent = "Heimweg Richtung Zivilisation";
  else if (!state.phaseTwoClosed) missionStatus.textContent = "Phase 2 abschliessen";
  else if (!rescueComplete()) missionStatus.textContent = "Gerettete erfassen";
  else missionStatus.textContent = "Mission abgeschlossen";
}

function updateCarePopup() {
  const step = CARE_STEPS.find((item) => item.key === state.activeCareStep);
  if (!step) {
    carePopupFeedback.textContent = "";
    return;
  }
  carePopupTitle.textContent = step.title;
  carePopupText.textContent = `${currentCommanderName()}, ${step.text.charAt(0).toLowerCase()}${step.text.slice(1)}`;
  carePopupLabel.textContent = step.label;
  carePopupButton.textContent = `${step.title} bestaetigen`;
}

function updateStartTask() {
  stormState.textContent = state.radioKitReady ? "Abgeschlossen" : "Aktiv";
  stormLog.textContent = state.radioKitReady
    ? `${leadershipDisplayName()}, die Funkgeraete wurden uebernommen.`
    : `${leadershipDisplayName()}, ohne Funkgeraet kein Kontakt.`;
  stormButton.disabled = state.radioKitReady;
}

function updatePassengerTask() {
  const countsReady = state.passengerCount !== null && state.crewCount !== null;
  suppliesState.textContent = countsReady ? "Abgeschlossen" : state.radioKitReady ? "Aktiv" : "Gesperrt";
  pilotLog.textContent = countsReady
    ? `${leadershipDisplayName()}, der Pilot meldet: ${state.passengerCount} GuSp und ${state.crewCount} Besatzungsmitglieder.`
    : `${leadershipDisplayName()}, stellt zuerst Funkkontakt her.`;
  confirmPassengersButton.disabled = !state.radioKitReady || countsReady;
  suppliesSuccess.textContent = countsReady ? `${state.passengerCount} GuSp und ${state.crewCount} Besatzungsmitglieder erfasst.` : "";
}

function updatePhaseOneTask() {
  radioState.textContent = phaseOneDone() ? "Abgeschlossen" : state.passengerCount !== null ? "Aktiv" : "Gesperrt";
  openCarePopupButton.disabled = state.passengerCount === null || phaseOneDone();
  if (phaseOneDone()) {
    radioLog.textContent = `${leadershipDisplayName()}, Phase 1 abgeschlossen. ${healedTotal()} GuSp versorgt.`;
  } else if (state.passengerCount !== null) {
    const next = nextCareStep();
    radioLog.textContent = next
      ? `${leadershipDisplayName()}, naechster Schritt: ${next.title}. Versorgt: ${healedTotal()} / ${state.passengerCount}`
      : `${leadershipDisplayName()}, versorgt: ${healedTotal()} / ${state.passengerCount}`;
  } else {
    radioLog.textContent = "Versorgung noch nicht gestartet.";
  }
}

function updateReturnTask() {
  borderState.textContent = state.returnStarted ? "Abgeschlossen" : state.weatherAcknowledged ? "Aktiv" : "Gesperrt";
  borderButton.disabled = !state.weatherAcknowledged || state.returnStarted;
  mailPreview.textContent = state.returnStarted
    ? "Hinweis frei: Bitte den Sicherheitsoffizier um die Rueckweg-Karte."
    : "Der Code ist eine zweistellige Zahl. Die Zehnerstelle ist um 1 kleiner als die Einerstelle. Zusammen ergeben beide Ziffern 3. Welche Zahl ist gesucht?";
}

function updateTreesTask() {
  treesState.textContent = state.treesCleared ? "Abgeschlossen" : state.returnStarted ? "Aktiv" : "Gesperrt";
  treesButton.disabled = !state.returnStarted || state.treesCleared;
  treesLog.textContent = state.treesCleared ? "Grenzfluss erreicht." : "Der Weg zum Grenzfluss ist auf der Rueckweg-Karte markiert.";
}

function updateFinalTask() {
  finalState.textContent = state.mailSolved ? "Abgeschlossen" : state.treesCleared ? "Aktiv" : "Gesperrt";
  finalButton.disabled = !state.treesCleared || state.mailSolved;
  finalLog.textContent = state.mailSolved ? MORSE_EMAIL_PLAIN : MORSE_EMAIL_CODE;
}

function updateArrivalTask() {
  returnState.textContent = state.riverCrossed ? "Abgeschlossen" : state.mailSolved ? "Aktiv" : "Gesperrt";
  returnButton.disabled = !state.mailSolved || state.riverCrossed;
  returnLog.textContent = state.riverCrossed ? "Bruecke ueber den Grenzfluss ueberquert." : "Die GuSp warten auf die entschluesselte Mail.";
}

function updateRouteTask() {
  routeState.textContent = state.routeConfirmed ? "Abgeschlossen" : state.riverCrossed ? "Aktiv" : "Gesperrt";
  quicksandButton.disabled = !state.riverCrossed || state.quicksandUnlocked;
  quicksandButton.textContent = state.quicksandUnlocked ? "Treibsand gemeldet" : "Treibsand";
  quicksandViewedCheck.checked = state.quicksandViewed;
  quicksandClearCheck.checked = state.quicksandCrossed;
  routeButton.disabled = !state.riverCrossed || !state.quicksandViewed || !state.quicksandCrossed || !wildlifeResolved() || state.routeConfirmed;
  wildlifeButton.disabled = !state.riverCrossed || state.routeConfirmed;
  wildlifeButton.textContent = "Wildtiersichtung";

  if (state.routeConfirmed) {
    routeLog.textContent = `${leadershipDisplayName()}, die GuSp und die Besatzung haben die Zivilisation erreicht.`;
  } else if (state.wildlifeAlerted && !wildlifeResolved()) {
    routeLog.textContent = "Wildtiersichtung offen. Erst Wildtieraufsicht kontaktieren und Gefahr beenden, dann weiter Richtung Zivilisation.";
  } else if (state.quicksandCrossed) {
    routeLog.textContent = "Treibsand erfolgreich ueberquert. Fuehrt die Gruppe weiter bis in die Zivilisation.";
  } else if (state.quicksandUnlocked) {
    routeLog.textContent = "Treibsand-Standort bekannt. Fuehrt die GuSp ueber die markierte trockene Route.";
  } else {
    routeLog.textContent = "Nach der Bruecke folgt ihr der vorgeschlagenen Route weiter Richtung Zivilisation.";
  }
}

function updatePhaseTwoCloseTask() {
  phaseTwoState.textContent = state.phaseTwoClosed ? "Abgeschlossen" : state.routeConfirmed ? "Aktiv" : "Gesperrt";
  phaseTwoButton.disabled = !state.routeConfirmed || state.phaseTwoClosed;
  phaseTwoLog.textContent = state.phaseTwoClosed
    ? `${leadershipDisplayName()}, Phase 2 ist offiziell abgeschlossen.`
    : `${leadershipDisplayName()}, bestaetigt jetzt den sicheren Heimweg aller GuSp und der Besatzung.`;
}

function updateRescueTask() {
  const target = rescueTarget();
  rescueState.textContent = rescueComplete() ? "Abgeschlossen" : state.phaseTwoClosed ? "Aktiv" : "Gesperrt";
  rescueNameButton.disabled = !state.phaseTwoClosed || rescueComplete();
  rescueNameInput.disabled = !state.phaseTwoClosed || rescueComplete();
  crewRescueNameButton.disabled = !state.phaseTwoClosed || rescueComplete();
  crewRescueNameInput.disabled = !state.phaseTwoClosed || rescueComplete();
  rescueLog.textContent = state.phaseTwoClosed
    ? `GuSp: ${state.passengerCount}, Besatzung: ${state.crewCount}, gesamt: ${target}. Eingetragen: ${rescuedTotal()} von ${target}.`
    : "Phase 2 muss zuerst abgeschlossen werden.";

  rescuedNamesList.innerHTML = "";
  state.rescuedNames.forEach((name, index) => {
    const tag = document.createElement("span");
    tag.className = "rescued-name-chip";
    tag.textContent = `${index + 1}. ${name}`;
    rescuedNamesList.appendChild(tag);
  });

  rescuedCrewNamesList.innerHTML = "";
  state.rescuedCrewNames.forEach((name, index) => {
    const tag = document.createElement("span");
    tag.className = "rescued-name-chip";
    tag.textContent = `${index + 1}. ${name}`;
    rescuedCrewNamesList.appendChild(tag);
  });

  missionCompleteCard.classList.toggle("hidden", !rescueComplete());
  if (rescueComplete()) {
    missionCompleteText.textContent = `Gratulation ${leadershipDisplayName()}, alle GuSp und alle Besatzungsmitglieder sind sicher zurueck. Gute Besserung an alle Geretteten.`;
  }
}

function updateWildlifePopup() {
  wildlifePhoneText.textContent = WILDLIFE_PHONE_DISPLAY;
  if (state.wildlifePhoneUnlocked && state.wildlifeContactConfirmed && state.wildlifeDangerCleared) {
    wildlifePuzzleLog.textContent = "Wildtieraufsicht kontaktiert. Keine Gefahr mehr durch Wildtier.";
  } else if (state.wildlifePhoneUnlocked) {
    wildlifePuzzleLog.textContent = `Telefonnummer entschluesselt: ${WILDLIFE_PHONE_DISPLAY}`;
  } else {
    wildlifePuzzleLog.textContent = "Die Telefonnummer ist noch verschluesselt.";
  }

  wildlifeDecryptButton.disabled = state.wildlifePhoneUnlocked;
  wildlifeDecryptButton.textContent = state.wildlifePhoneUnlocked
    ? "Einsatzlogbuch entschluesselt"
    : "Entschluesselung des Einsatzlogbuches";
  wildlifeContactCard.classList.toggle("hidden", !state.wildlifePhoneUnlocked);
  wildlifeFollowup.classList.toggle("hidden", !state.wildlifePhoneUnlocked);
  wildlifeContactCheck.checked = state.wildlifeContactConfirmed;
  wildlifeClearCheck.checked = state.wildlifeDangerCleared;
}

function updateCompletionScreen() {
  completionTimerValue.textContent = formatElapsedTime(currentElapsedMs());
  completionRescueValue.textContent = `${rescuedTotal()}`;
  completionLeadText.textContent = `Gratulation ${leadershipDisplayName()}, eure Mission war erfolgreich. Alle GuSp und alle Besatzungsmitglieder haben es in die Zivilisation geschafft.`;
  completionNamesList.innerHTML = "";
  state.rescuedNames.forEach((name, index) => {
    const tag = document.createElement("span");
    tag.className = "rescued-name-chip";
    tag.textContent = `${index + 1}. ${name}`;
    completionNamesList.appendChild(tag);
  });
  completionCrewNamesList.innerHTML = "";
  state.rescuedCrewNames.forEach((name, index) => {
    const tag = document.createElement("span");
    tag.className = "rescued-name-chip";
    tag.textContent = `${index + 1}. ${name}`;
    completionCrewNamesList.appendChild(tag);
  });
  completionCrewText.textContent = state.rescuedCrewNames.length
    ? `Dank an die tapfere Besatzung: ${state.rescuedCrewNames.join(", ")}.`
    : "Dank an die tapfere Besatzung.";
}

function updateWildlifeCipherPopup() {
  const step = WILDLIFE_DIGITS[state.wildlifeDigitIndex];
  if (!step) return;

  wildlifeCipherTitle.textContent = `${step.title} von ${WILDLIFE_DIGITS.length}`;
  wildlifeCipherText.textContent = step.clue;
  wildlifeCipherAttempts.textContent = `Verbleibende Versuche: ${state.wildlifeDigitAttemptsLeft}`;
  wildlifeCipherAttempts.className = "task-feedback";
  wildlifeCipherButton.textContent = `Ziffer ${state.wildlifeDigitIndex + 1} pruefen`;
}

function render() {
  totalPassengers.textContent = totalPeople() === null ? "Unbekannt" : `${totalPeople()}`;
  suppliedPassengers.textContent = `${healedTotal()}`;
  returningPassengers.textContent = state.phaseTwoClosed ? `${rescuedTotal()}` : "0";
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
  updateRouteTask();
  updatePhaseTwoCloseTask();
  updateRescueTask();
  updateWildlifePopup();
  updateWildlifeCipherPopup();
  updateCompletionScreen();
  updatePrologueUI();
  updateLeadershipUI();
  updateCarePopup();
  updateVisibility();
  syncMissionTimer();
}

function resetMission() {
  localStorage.removeItem(STORAGE_KEY);
  Object.assign(state, defaultState());
  prelockReady = false;

  passwordInput.value = "";
  leadershipInput.value = "";
  passengerInput.value = "";
  crewInput.value = "";
  borderAnswerInput.value = "";
  carePopupInput.value = "";
  rescueNameInput.value = "";
  crewRescueNameInput.value = "";

  passwordFeedback.textContent = "";
  leadershipFeedback.textContent = "";
  stormFeedback.textContent = "";
  suppliesFeedback.textContent = "";
  suppliesSuccess.textContent = "";
  radioFeedback.textContent = "";
  borderFeedback.textContent = "";
  treesFeedback.textContent = "";
  finalFeedback.textContent = "";
  returnFeedback.textContent = "";
  routeFeedback.textContent = "";
  phaseTwoFeedback.textContent = "";
  rescueFeedback.textContent = "";
  carePopupFeedback.textContent = "";
  wildlifeCipherFeedback.textContent = "";
  wildlifeCipherAttempts.textContent = "";

  render();
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

leadershipForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const names = leadershipInput.value
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (!names.length) {
    leadershipFeedback.textContent = "Bitte mindestens einen Namen eintragen.";
    leadershipFeedback.className = "task-feedback error";
    return;
  }

  if (names.length > 5) {
    leadershipFeedback.textContent = "Bitte hoechstens 5 Namen eintragen.";
    leadershipFeedback.className = "task-feedback error";
    return;
  }

  state.leadershipNames = names;
  state.leadershipProfiles = generateLeadershipProfiles(names);
  state.leadershipConfirmed = true;
  if (!state.missionStartedAt) state.missionStartedAt = Date.now();
  leadershipFeedback.textContent = "";
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
  const crew = Number.parseInt(crewInput.value, 10);
  if (!Number.isInteger(count) || count <= 0 || !Number.isInteger(crew) || crew <= 0) {
    suppliesFeedback.textContent = "Bitte fuer GuSp und Besatzung gueltige Zahlen eintragen.";
    suppliesFeedback.className = "task-feedback error";
    return;
  }
  state.passengerCount = count;
  state.crewCount = crew;
  suppliesFeedback.textContent = "Anzahl der GuSp und der Besatzung bestaetigt.";
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
    if (!phaseOneDone()) {
      state.healed.aid = null;
      state.healed.food = null;
      state.healed.warmth = null;
      state.activeCareStep = "aid";
      carePopupInput.value = "";
      carePopupFeedback.textContent = "Die Summe passt nicht zur Gesamtanzahl. Bitte alle drei Angaben neu eingeben.";
      carePopupFeedback.className = "task-feedback error";
      radioFeedback.textContent = "Phase 1 ungueltig. Alle drei Angaben neu eingeben.";
      radioFeedback.className = "task-feedback error";
      saveState();
      render();
      return;
    }
    state.activeCareStep = null;
    state.phaseOneAcknowledged = false;
  }

  saveState();
  render();
});

phaseOnePopupButton.addEventListener("click", () => {
  state.phaseOneAcknowledged = true;
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
  if (answer !== "12") {
    borderFeedback.textContent = "Falsche Loesung.";
    borderFeedback.className = "task-feedback error";
    return;
  }
  state.returnStarted = true;
  borderFeedback.textContent = "Hinweis frei: Bitte den Sicherheitsoffizier um die Rueckweg-Karte.";
  borderFeedback.className = "task-feedback success";
  saveState();
  render();
});

treesButton.addEventListener("click", () => {
  state.treesCleared = true;
  treesFeedback.textContent = "GuSp zum Grenzfluss geleitet.";
  treesFeedback.className = "task-feedback success";
  saveState();
  render();
});

finalButton.addEventListener("click", () => {
  state.mailSolved = true;
  finalFeedback.textContent = "Uebersetzung bestaetigt. Nachricht weitergegeben.";
  finalFeedback.className = "task-feedback success";
  saveState();
  render();
});

returnButton.addEventListener("click", () => {
  state.riverCrossed = true;
  returnFeedback.textContent = "Bruecke ueber den Grenzfluss ueberquert.";
  returnFeedback.className = "task-feedback success";
  saveState();
  render();
});

wildlifeButton.addEventListener("click", () => {
  state.wildlifeAlerted = true;
  state.wildlifeBriefed = false;
  routeFeedback.textContent = "Wildtiersichtung gemeldet. Neue Anweisung geoeffnet.";
  routeFeedback.className = "task-feedback error";
  saveState();
  render();
});

quicksandButton.addEventListener("click", () => {
  state.quicksandUnlocked = true;
  routeFeedback.textContent = "Treibsand gemeldet. Standortkarte geoeffnet.";
  routeFeedback.className = "task-feedback success";
  saveState();
  render();
});

quicksandViewedCheck.addEventListener("change", () => {
  state.quicksandViewed = quicksandViewedCheck.checked;
  routeFeedback.textContent = state.quicksandViewed
    ? "Treibsand-Hinweis bestaetigt."
    : "Treibsand-Hinweis noch offen.";
  routeFeedback.className = state.quicksandViewed ? "task-feedback success" : "task-feedback";
  saveState();
  render();
});

quicksandClearCheck.addEventListener("change", () => {
  state.quicksandCrossed = quicksandClearCheck.checked;
  routeFeedback.textContent = state.quicksandCrossed
    ? "Treibsand erfolgreich ueberquert."
    : "Treibsand muss noch bestaetigt werden.";
  routeFeedback.className = state.quicksandCrossed ? "task-feedback success" : "task-feedback";
  saveState();
  render();
});

wildlifePopupButton.addEventListener("click", () => {
  state.wildlifeBriefed = true;
  saveState();
  render();
});

wildlifeContactCheck.addEventListener("change", () => {
  state.wildlifeContactConfirmed = wildlifeContactCheck.checked;
  saveState();
  render();
});

wildlifeClearCheck.addEventListener("change", () => {
  state.wildlifeDangerCleared = wildlifeClearCheck.checked;
  saveState();
  render();
});

wildlifeDecryptButton.addEventListener("click", () => {
  state.wildlifeCipherOpen = true;
  state.wildlifeDigitIndex = 0;
  state.wildlifeDigitAttemptsLeft = 3;
  wildlifeCipherInput.value = "";
  wildlifeCipherFeedback.textContent = "";
  wildlifeCipherAttempts.textContent = "";
  saveState();
  render();
});

wildlifeCipherForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const step = WILDLIFE_DIGITS[state.wildlifeDigitIndex];
  if (!step) return;

  const answer = String(Number.parseInt(wildlifeCipherInput.value, 10));
  if (answer === step.answer) {
    if (state.wildlifeDigitIndex === WILDLIFE_DIGITS.length - 1) {
      state.wildlifePhoneUnlocked = true;
      state.wildlifeCipherOpen = false;
      wildlifeCipherFeedback.textContent = "";
      routeFeedback.textContent = "Telefonnummer der Wildtieraufsicht entschluesselt.";
      routeFeedback.className = "task-feedback success";
    } else {
      state.wildlifeDigitIndex += 1;
      state.wildlifeDigitAttemptsLeft = 3;
      wildlifeCipherInput.value = "";
      wildlifeCipherFeedback.textContent = `Richtig. ${WILDLIFE_DIGITS[state.wildlifeDigitIndex].title} wird geoeffnet.`;
      wildlifeCipherFeedback.className = "task-feedback success";
      saveState();
      render();
      return;
    }
  } else {
    state.wildlifeDigitAttemptsLeft -= 1;

    if (state.wildlifeDigitAttemptsLeft <= 0) {
      state.wildlifeDigitIndex = 0;
      state.wildlifeDigitAttemptsLeft = 3;
      wildlifeCipherInput.value = "";
      wildlifeCipherFeedback.textContent = "Drei Versuche verbraucht. Das Einsatzlogbuch startet wieder bei Ziffer 1.";
      wildlifeCipherFeedback.className = "task-feedback error";
      saveState();
      render();
      return;
    }

    wildlifeCipherFeedback.textContent = `Falsch. Noch ${state.wildlifeDigitAttemptsLeft} Versuch(e) fuer diese Ziffer.`;
    wildlifeCipherFeedback.className = "task-feedback error";
    wildlifeCipherInput.value = "";
    saveState();
    render();
    return;
  }

  wildlifeCipherInput.value = "";
  saveState();
  render();
});

routeButton.addEventListener("click", () => {
  state.routeConfirmed = true;
  routeFeedback.textContent = "Zivilisation erreicht. Der Rueckweg ist geschafft.";
  routeFeedback.className = "task-feedback success";
  saveState();
  render();
});

phaseTwoButton.addEventListener("click", () => {
  state.phaseTwoClosed = true;
  phaseTwoFeedback.textContent = "Phase 2 abgeschlossen.";
  phaseTwoFeedback.className = "task-feedback success";
  saveState();
  render();
});

rescueForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!state.phaseTwoClosed) {
    rescueFeedback.textContent = "Phase 2 muss zuerst abgeschlossen werden.";
    rescueFeedback.className = "task-feedback error";
    return;
  }

  const name = rescueNameInput.value.trim();
  const normalizedName = normalize(name);
  if (!name) {
    rescueFeedback.textContent = "Bitte einen GuSp-Vornamen eintragen.";
    rescueFeedback.className = "task-feedback error";
    return;
  }

  if (state.rescuedNames.some((entry) => normalize(entry) === normalizedName)) {
    rescueFeedback.textContent = "Dieser Vorname wurde bereits eingetragen.";
    rescueFeedback.className = "task-feedback error";
    return;
  }

  if (state.rescuedNames.length >= (state.passengerCount || 0)) {
    rescueFeedback.textContent = "Alle GuSp sind bereits eingetragen.";
    rescueFeedback.className = "task-feedback success";
    return;
  }

  state.rescuedNames.push(name);
  rescueNameInput.value = "";

  if (rescueComplete()) {
    if (!state.missionCompletedAt) state.missionCompletedAt = Date.now();
    rescueFeedback.textContent = "Alle GuSp und Besatzungsmitglieder sind erfasst.";
    rescueFeedback.className = "task-feedback success";
  } else {
    rescueFeedback.textContent = `${rescuedTotal()} von ${rescueTarget()} Geretteten eingetragen.`;
    rescueFeedback.className = "task-feedback success";
  }

  saveState();
  render();
});

crewRescueForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!state.phaseTwoClosed) {
    rescueFeedback.textContent = "Phase 2 muss zuerst abgeschlossen werden.";
    rescueFeedback.className = "task-feedback error";
    return;
  }

  const name = crewRescueNameInput.value.trim();
  const normalizedName = normalize(name);
  if (!name) {
    rescueFeedback.textContent = "Bitte einen Besatzungsnamen eintragen.";
    rescueFeedback.className = "task-feedback error";
    return;
  }

  if (state.rescuedCrewNames.some((entry) => normalize(entry) === normalizedName)) {
    rescueFeedback.textContent = "Dieser Besatzungsname wurde bereits eingetragen.";
    rescueFeedback.className = "task-feedback error";
    return;
  }

  if (state.rescuedCrewNames.length >= (state.crewCount || 0)) {
    rescueFeedback.textContent = "Die Besatzung ist bereits vollstaendig eingetragen.";
    rescueFeedback.className = "task-feedback success";
    return;
  }

  state.rescuedCrewNames.push(name);
  crewRescueNameInput.value = "";

  if (rescueComplete()) {
    if (!state.missionCompletedAt) state.missionCompletedAt = Date.now();
    rescueFeedback.textContent = "Alle GuSp und Besatzungsmitglieder sind erfasst.";
    rescueFeedback.className = "task-feedback success";
  } else {
    rescueFeedback.textContent = `${rescuedTotal()} von ${rescueTarget()} Geretteten eingetragen.`;
    rescueFeedback.className = "task-feedback success";
  }

  saveState();
  render();
});

resetButton.addEventListener("click", resetMission);
completionResetButton.addEventListener("click", resetMission);

render();

prelockButton.addEventListener("click", () => {
  prelockReady = true;
  passwordFeedback.textContent = "Winkelschrift geprüft. Passwortfeld freigeschaltet.";
  passwordFeedback.className = "task-feedback success";
  render();
});

if (prologuePrev) {
  prologuePrev.addEventListener("click", () => {
    changePrologueScene(-1);
  });
}

if (prologueNext) {
  prologueNext.addEventListener("click", () => {
    changePrologueScene(1);
  });
}

if (prologueClose) {
  prologueClose.addEventListener("click", () => {
    state.prologueDismissed = true;
    saveState();
    render();
  });
}

if (prologueOpen) {
  prologueOpen.addEventListener("click", () => {
    state.prologueDismissed = false;
    saveState();
    render();
  });
}

if (prologueStage) {
  prologueStage.addEventListener("wheel", (event) => {
    event.preventDefault();
  }, { passive: false });
}

document.querySelectorAll(".overlay-close").forEach((btn) => {
  btn.addEventListener("click", () => {
    const overlay = btn.closest(".overlay-screen");
    if (!overlay) return;

    overlay.classList.add("hidden");

    if (overlay.id === "carePopup") {
      state.activeCareStep = null;
    }

    if (overlay.id === "wildlifeCipherPopup") {
      state.wildlifeCipherOpen = false;
    }

    if (overlay.id === "quicksandPopup") {
      state.quicksandViewed = state.quicksandViewed || false;
    }

    if (overlay.id === "wildlifePopup") {
      state.wildlifeBriefed = true;
    }

    saveState();
    render();
  });
});
