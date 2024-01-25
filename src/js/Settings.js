/**
 * управляет настройками кастомизации приложения
 * @class
 */
export default class Settings {
  userSettings = new Map();

  constructor(dataSettings) {
    this.dataSettings = new Map(dataSettings);
    this.setDefaultSettings(dataSettings);
  }

  setDefaultSettings(dataSettings) {
    const defaultSettings = dataSettings.map((setting) => {
      const [key, value] = setting;

      return [key, value.at(0)];
    });

    this.defaultSettings = new Map(defaultSettings);
  }

  get settings() {
    let userSettings = this.getCorrectUserSettings();

    return new Map([...this.defaultSettings, ...userSettings]);
  }

  getCorrectUserSettings() {
    if (!this.userSettings.size) return this.userSettings;

    let result = [...this.userSettings].reduce((acc, item) => {
      const [key, value] = item;

      if (this.dataSettings.get(key)?.includes(value)) {
        return [...acc, item];
      }
      return acc;
    }, []);

    return result;
  }
}
