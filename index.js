/**
 * @format
 */
import { AppRegistry } from 'react-native';
import Main from './src/Main'; // ✅ on importe le fichier qui wrappe ThemeProvider
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => Main); // ✅ ici aussi
