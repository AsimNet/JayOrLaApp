import { TabsPage } from './tabs/tabs';
import { TutorialPage } from './tutorial/tutorial';
import { HomePage } from './home/home';
import { SettingsPage } from './settings/settings';

// The page the user lands on after opening the app and without a session
export const FirstRunPage = TutorialPage;

// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs
export const MainPage = TabsPage;

// The initial root pages for our tabs (remove if not using tabs)
export const Tab1Root = HomePage;
export const Tab3Root = SettingsPage;
