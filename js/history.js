// js/history.js

export function ourHistory() {
  async function fetchHomeContent() {
    try {
      const response = await fetch("data/data.json");
      const data = await response.json();
      const homeData = data.about.text;
      const welcomeData = data.about.welcome;

      const mainContent = document.getElementById("main-content");
      const boldedText = homeData.replace(
        /Restaurant Larsson/g,
        "<strong>Restaurant Larsson</strong>"
      );

      mainContent.innerHTML = `
          <article class="our-history">
            <h2 class="welcome">${welcomeData}</h2>
            <p class="about-txt">${boldedText.replace(/\n/g, "<br>")}</p>
          </article>
        `;
    } catch (error) {
      console.error("Error fetching home content:", error);
      const mainContent = document.getElementById("main-content");
      mainContent.innerHTML =
        "<p>Sorry, we couldn't load the content at the moment.</p>";
    }
  }

  fetchHomeContent();
}
