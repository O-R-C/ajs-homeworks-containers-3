import Settings from '../Settings';
import dataSettings from '../dataSettings';

describe('create new Settings', () => {
  test('correct create', () => {
    const settings = new Settings(dataSettings);

    expect(settings instanceof Settings).toBeTruthy();
  });

  describe('invalid dataSettings', () => {
    describe('dataSettings not Array', () => {
      const dataSettings = [{}, '', 1, null, undefined];

      test.each(dataSettings)('%p', (dataSettings) => {
        expect(() => new Settings(dataSettings)).toThrow(
          'настройки должны быть массивом'
        );
      });
    });

    test('empty Array', () => {
      expect(() => new Settings([])).toThrow('пустой массив настроек');
    });

    describe('item not Array', () => {
      const dataSettings = [
        [123, 123],
        ['123', undefined],
        [null, null],
        [undefined, ''],
        [{}, []],
      ];

      test.each(dataSettings)('%p', (key, value) => {
        expect(() => new Settings([key, value])).toThrow(
          'элемент настройки должен быть массивом'
        );
      });
    });

    describe('value not Array', () => {
      const dataSettings = [
        [[123, 123]],
        [['123', undefined]],
        [[null, null]],
        [[undefined, '']],
        [[{}, '123']],
      ];

      test.each(dataSettings)('%p', (item) => {
        expect(() => new Settings([item])).toThrow(
          'значения должны быть массивом'
        );
      });
    });

    describe('value empty', () => {
      const dataSettings = [
        [[123, []]],
        [['123', []]],
        [[null, []]],
        [[undefined, []]],
        [[{}, []]],
      ];

      test.each(dataSettings)('%p', (item) => {
        expect(() => new Settings([item])).toThrow(
          'пустой массив значений настроек'
        );
      });
    });
  });
});

describe('test get settings', () => {
  const settings = new Settings(dataSettings);
  const defaultSettings = new Map([
    ['theme', 'dark'],
    ['music', 'trance'],
    ['difficulty', 'easy'],
  ]);

  test('empty userSetting', () => {
    expect(settings.settings).toEqual(defaultSettings);
  });

  describe('add some userSettings', () => {
    describe('correct settings', () => {
      const userSettings = [
        ['theme', 'gray'],
        ['music', 'rock'],
        ['difficulty', 'nightmare'],
      ];

      beforeEach(() => settings.userSettings.clear());

      test.each(userSettings)('%p', (key, value) => {
        settings.userSettings.set(key, value);

        expect(settings.settings).toEqual(
          new Map([...defaultSettings, [key, value]])
        );
      });
    });

    describe('incorrect settings', () => {
      const userSettings = [
        ['theme', 'gray1'],
        ['music2', 'rock'],
        ['difficulty', ''],
      ];

      beforeEach(() => settings.userSettings.clear());

      test.each(userSettings)('%p', (key, value) => {
        settings.userSettings.set(key, value);

        expect(settings.settings).toEqual(defaultSettings);
      });
    });
  });
});
