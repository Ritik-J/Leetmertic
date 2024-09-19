document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector("#searchInput");
  const searchBtn = document.querySelector("#searchBtn");

  const userSummary = document.querySelector(".user-summary");
  const easy = document.querySelector("#easy");
  const medium = document.querySelector("#medium");
  const hard = document.querySelector("#hard");

  const userStats = document.querySelector(".user-stats");
  const cardOne = document.querySelector("#card1"); //ranking
  const cardTwo = document.querySelector("#card2"); //acceptance rate
  const cardThree = document.querySelector("#card3"); //contributionpoint
  const cardFour = document.querySelector("#card4"); //total questions
  const cardFive = document.querySelector("#card5"); //total solved
  const cardSix = document.querySelector("#card6"); //reputation

  //fetching user deatil
  const fetchUserDetail = async (username) => {
    const fetchUrl = `https://leetcode-stats-api.herokuapp.com/${username}`;
    try {
      searchBtn.innerHTML = "searching...";
      const res = await fetch(fetchUrl);
      const data = await res.json();
      if (data.status === "success") {
        document.querySelector(".user-container").style.opacity = 1;
      } else {
        document.querySelector(".user-container").style.opacity = 1;
        document.querySelector(".user-container").innerHTML = "user not found";
      }
      storeUserData(data);
    } finally {
      searchBtn.innerHTML = "search";
    }
  };

  searchBtn.addEventListener("click", function () {
    const username = searchInput.value;
    if (username.trim() !== "") {
      fetchUserDetail(username);
    }
  });

  const storeUserData = (data) => {
    const easyQuestion = data.easySolved;
    const mediumQuestion = data.mediumSolved;
    const hardQuestion = data.hardSolved;
    const userRanking = data.ranking;
    const acceptanceRate = data.acceptanceRate;
    const contributionPoints = data.contributionPoints;
    const totalQuestions = data.totalQuestions;
    const totalSolved = data.totalSolved;
    const reputation = data.reputation;

    userSummaryData(easyQuestion, mediumQuestion, hardQuestion);
    userStatsData(
      userRanking,
      acceptanceRate,
      contributionPoints,
      totalQuestions,
      totalSolved,
      reputation
    );
  };

  const userSummaryData = (easyQuestion, mediumQuestion, hardQuestion) => {
    easy.innerHTML = easyQuestion;
    medium.innerHTML = mediumQuestion;
    hard.innerHTML = hardQuestion;
  };

  const userStatsData = (
    userRanking,
    acceptanceRate,
    contributionPoints,
    totalQuestions,
    totalSolved,
    reputation
  ) => {
    cardOne.innerHTML = userRanking;
    cardTwo.innerHTML = acceptanceRate;
    cardThree.innerHTML = contributionPoints;
    cardFour.innerHTML = totalQuestions;
    cardFive.innerHTML = totalSolved;
    cardSix.innerHTML = reputation;
  };
});
