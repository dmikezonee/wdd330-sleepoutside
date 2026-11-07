export default class Alert {
  constructor() {
    this.path = `${import.meta.env.BASE_URL}json/alerts.json`;
  }

  async init() {
    const alerts = await fetch(this.path).then((response) => {
      if (!response.ok) {
        throw new Error('Unable to load alerts');
      }
      return response.json();
    });

    if (alerts.length > 0) {
      this.renderAlerts(alerts);
    }
  }

  renderAlerts(alerts) {
    const alertSection = document.createElement('section');
    alertSection.classList.add('alert-list');

    alerts.forEach((alert) => {
      const paragraph = document.createElement('p');

      paragraph.textContent = alert.message;
      paragraph.style.backgroundColor = alert.background;
      paragraph.style.color = alert.color;

      alertSection.appendChild(paragraph);
    });

    const main = document.querySelector('main');

    if (main) {
      main.prepend(alertSection);
    }
  }
}