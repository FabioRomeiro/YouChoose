export class MessengerView {
  
  protected _dadElement: Element;

  constructor() {
    this._dadElement = document.querySelector('[data-messenger]');
  }

  private template(data: { message: string, type: string, icon?: string }): string {
    return `
      <div class="messenger-message messenger-message--${ data.type || 'default' }">
        ${ data.icon ? `<i class="custom-icon ${ data.icon } message-icon"></i>` : '' }
        <p>${ data.message }</p>
        <i class="custom-icon x message-close" data-close-message></i>
      </div>
    `;
  }

  update(models: { message: string, type: string, icon?: string }, mls: number): void {
    
    this._dadElement.innerHTML = this.template(models);

    this._dadElement.classList.add('appear');
    
    let timer = setTimeout(() => {
      this._dadElement.classList.remove('appear');
    }, mls);

    function closeMessage() {
      clearTimeout(timer);
      this._dadElement.classList.remove('appear');
    }

    let x = document.querySelector('[data-close-message]');

    x.removeEventListener('click', closeMessage.bind(this));
    x.addEventListener('click', closeMessage.bind(this));
  }
}