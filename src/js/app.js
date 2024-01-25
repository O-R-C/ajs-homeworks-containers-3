import Settings from './Settings';
import dataSettings from './dataSettings';

const settings = new Settings(dataSettings);

settings.userSettings.set('theme', 'gray');
settings.userSettings.set('theme1', 'gray');

console.log(settings.settings);

