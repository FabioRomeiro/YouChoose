import { EditorModeView } from "../views/index";
import { domInject } from "./decorators/index";

export class ModeHelper {

  private _items: NodeListOf<Element>;

  constructor(private _updateList: Function, private _editorView: EditorModeView) { };

  private _reselectItems(): void {
    this._items = document.querySelectorAll('[data-item]');
  }

  public activateAddMode(toggleFunction: any): void {
    this._updateList();

    this._reselectItems();

    this._items.forEach(toggleFunction);

    this._editorView.activateAddMode();
  }

  public activateEditMode(editFunction: any): void {

    this._reselectItems();

    this._items.forEach(editFunction);

    this._editorView.activateEditMode();
  }

  public activateRemoveMode(removeFunction: any): void {

    this._reselectItems();

    this._items.forEach(removeFunction);

    this._editorView.activateRemoveMode();
  }

  public activateMenuMode(toggleFunction: any): void {
    this._updateList();

    this._reselectItems();

    this._items.forEach(toggleFunction);

    this._editorView.activateMenuMode();
  }
}