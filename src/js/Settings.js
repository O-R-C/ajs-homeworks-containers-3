/**
 * управляет настройками кастомизации приложения
 * @class
 */
export default class Settings {
  userSettings = new Map();

  /**
   * сохраняет массив настроек,
   * устанавливает значения по умолчанию
   * @param {Array} dataSettings массив настроек
   */
  constructor(dataSettings) {
    this.checkDataSettings(dataSettings);

    this.dataSettings = new Map(dataSettings);
    this.setDefaultSettings(dataSettings);
  }

  /**
   * проверяет массив настроек на соответствие структуры
   * @param {Array} dataSettings массив настроек
   * @throws {Error} если структура массива настроек не валидна
   */
  checkDataSettings(dataSettings) {
    if (!Array.isArray(dataSettings)) {
      throw new Error('настройки должны быть массивом');
    }

    if (!dataSettings.length) {
      throw new Error('пустой массив настроек');
    }

    dataSettings.forEach((item) => {
      if (!Array.isArray(item)) {
        throw new Error('элемент настройки должен быть массивом');
      }

      const [, value] = item;

      if (!Array.isArray(value)) {
        throw new Error('значения должны быть массивом');
      }

      if (!value.length) {
        throw new Error('пустой массив значений настроек');
      }
    });
  }

  /**
   * устанавливает значения по умолчанию
   * @param {Array} dataSettings массив настроек
   */
  setDefaultSettings(dataSettings) {
    const defaultSettings = dataSettings.map((setting) => {
      const [key, value] = setting;

      return [key, value.at(0)];
    });

    this.defaultSettings = new Map(defaultSettings);
  }

  /**
   * @returns {Map} результат слияния дефолтных и пользовательских настроек
   */
  get settings() {
    let userSettings = this.getCorrectUserSettings();

    return new Map([...this.defaultSettings, ...userSettings]);
  }

  /**
   *
   * @returns {Array} массив корректных настроек пользователя
   */
  getCorrectUserSettings() {
    if (!this.userSettings.size) return [];

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
