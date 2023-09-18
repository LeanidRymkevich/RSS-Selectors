import App from './components/app';
import { IApp } from './components/interface';

const app: IApp = App.getInstance();
app.start();
