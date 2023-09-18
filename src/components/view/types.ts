import IDisplayView from './display/interfaces';
import { IEditorView } from './editors/types';
import { ILevelView } from './levels/interfaces';
import ITaskDescription from './taskDescription/interfaces';
import IView from './view/interfaces';

export type display = IView & IDisplayView;
export type editors = IView & IEditorView;
export type levels = IView & ILevelView;
export type taskDescription = IView & ITaskDescription;
