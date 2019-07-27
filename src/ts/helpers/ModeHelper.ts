import { RestaurantsView, EditorModeView } from "../views/index";
import { Restaurants } from "../models/index";

export class ModeHelper {
  
  constructor(private _updateList: Function, private _editorView: EditorModeView){};

  public activateAddMode(toggleFunction: any): void {
    this._updateList();

    let items = document.querySelectorAll('[data-item]');

    items.forEach(toggleFunction);

    this._editorView.activateAddMode();
  }

  public activateEditMode(editFunction: any): void {

    let items = document.querySelectorAll('[data-item]');

    items.forEach(editFunction);

    this._editorView.activateEditMode();
  }

  public activateRemoveMode(removeFunction: any): void {

    let items = document.querySelectorAll('[data-item]');

    items.forEach(removeFunction);

    this._editorView.activateRemoveMode();
  }

  public activateMenuMode(toggleFunction: any): void {
    this._updateList();

    let items = document.querySelectorAll('[data-item]');

    items.forEach(toggleFunction);

    this._editorView.activateMenuMode();
  }
}