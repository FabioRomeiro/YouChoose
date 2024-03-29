export class EditorModeView {

  private _featureElements: NodeListOf<Element>;

  constructor(private _featureAttribute: string) {
    this._featureElements = document.querySelectorAll(`[${this._featureAttribute}]`);
  }

  private _showViewMode(modeName: string): void {
    this._featureElements.forEach(element => {
      let isTheModeView = element.getAttribute(this._featureAttribute) == modeName;
      let isHidden = element.classList.contains('hide');

      if (isTheModeView && isHidden) {
        element.classList.remove('hide');
      } else if (!isTheModeView && !isHidden) {
        element.classList.add('hide');
      }
    });
  }

  public activateAddMode(): void {
    this._showViewMode('add-edit');
  }

  public activateEditMode(): void {
    this._showViewMode('add-edit');
  }

  public activateMenuMode(): void {
    this._showViewMode('menu');
  }

  public activateRemoveMode(): void {
    this._showViewMode('remove');
  }

}