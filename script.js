document.addEventListener("DOMContentLoaded", function () {
  // Load navbar.html into the navbar-placeholder div
  fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('navbar-placeholder').innerHTML = data;
    })
    .catch(err => console.error('Error loading navbar:', err));

  // Quest generation functionality
  const questButton = document.getElementById("quest-button");
  const questText = document.getElementById("quest-text");
  const bahayButton = document.getElementById("bahay-quest-button");
  const bahayQuestText = document.getElementById("bahay-quest-text");
  const questProgress = document.getElementById("quest-progress");
  const confirmText = document.getElementById("confirm-text");
  const confirmYesButton = document.getElementById("confirm-yes");

  let completedQuests = parseInt(localStorage.getItem("completedQuests")) || 0;
  let totalQuests = 30; // Define total quests for progress calculation
  let currentQuest = ""; // Store current quest to confirm completion

  function updateProgress() {
    let progressPercentage = (completedQuests / totalQuests) * 100;
    questProgress.style.width = progressPercentage + "%";
    localStorage.setItem("completedQuests", completedQuests);
  }

  function generateQuest(button, textElement, questList) {
    const randomIndex = Math.floor(Math.random() * questList.length);
    currentQuest = questList[randomIndex];
    textElement.textContent = currentQuest;

    // Show confirmation prompt
    confirmText.style.display = "block";
    confirmYesButton.style.display = "block";
  }

  confirmYesButton.addEventListener("click", function () {
    if (currentQuest) {
      completedQuests = Math.min(completedQuests + 1, totalQuests);
      updateProgress();
      currentQuest = ""; // Reset quest after confirmation

      // Hide confirmation prompt
      confirmText.style.display = "none";
      confirmYesButton.style.display = "none";
    }
  });

  updateProgress();
});
