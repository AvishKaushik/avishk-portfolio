"use client";

export class MobileControls {
  private static instance: MobileControls | null = null;
  private container: HTMLDivElement | null = null;
  private isVisible = false;

  // Movement/action flags
  public leftDown = false;
  public rightDown = false;
  public jumpDown = false;
  public interactDown = false;
  public attackDown = false;

  private constructor() {}

  static getInstance(): MobileControls {
    if (!MobileControls.instance) {
      MobileControls.instance = new MobileControls();
    }
    return MobileControls.instance;
  }

  create() {
    if (typeof window === "undefined" || typeof document === "undefined") return;
    if (this.container) return;

    this.container = document.createElement("div");
    this.container.className = "mobile-controls";

    this.container.innerHTML = `
      <div class="control-pad">
        <div class="movement-buttons">
          <button class="ctrl-btn up" data-action="jump">▲</button>
          <div class="middle-row">
            <button class="ctrl-btn left" data-action="left">◀</button>
            <button class="ctrl-btn right" data-action="right">▶</button>
          </div>
        </div>
        <div class="action-buttons">
          <button class="ctrl-btn interact" data-action="interact">E</button>
          <button class="ctrl-btn attack" data-action="attack">X</button>
        </div>
      </div>
    `;

    const style = document.createElement("style");
    style.textContent = `
      .mobile-controls {
        position: fixed;
        bottom: 20px;
        left: 0;
        right: 0;
        z-index: 1000;
        display: none;
        pointer-events: none;
      }

      .control-pad {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: 0 20px;
        pointer-events: none;
      }

      .movement-buttons,
      .action-buttons {
        pointer-events: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }

      .middle-row {
        display: flex;
        gap: 10px;
      }

      .ctrl-btn {
        width: 60px;
        height: 60px;
        border-radius: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        user-select: none;
        touch-action: manipulation;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.4), 0 0 8px rgba(255,255,255,0.3) inset;
      }

      .ctrl-btn:active,
      .ctrl-btn.active {
        background: rgba(34, 197, 94, 0.4);
        border-color: rgba(34, 197, 94, 0.8);
        transform: scale(0.95);
        box-shadow: inset 0 2px 8px rgba(0,0,0,0.3), 0 2px 8px rgba(34, 197, 94, 0.4);
      }

      @media (max-width: 768px) {
        .ctrl-btn { width: 50px; height: 50px; font-size: 18px; }
      }

      @media (max-width: 480px) {
        .ctrl-btn { width: 44px; height: 44px; font-size: 16px; }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(this.container);

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.container) return;

    const buttons = this.container.querySelectorAll(".ctrl-btn");
    buttons.forEach((button) => {
      const action = button.getAttribute("data-action");
      if (!action) return;
      this.addButtonListeners(button, () => this.setFlag(action, true), () => this.setFlag(action, false));
    });
  }

  private addButtonListeners(button: Element, onPress: () => void, onRelease: () => void) {
    button.addEventListener("touchstart", (e) => { e.preventDefault(); onPress(); button.classList.add("active"); });
    button.addEventListener("touchend", (e) => { e.preventDefault(); onRelease(); button.classList.remove("active"); });
    button.addEventListener("mousedown", () => { onPress(); button.classList.add("active"); });
    button.addEventListener("mouseup", () => { onRelease(); button.classList.remove("active"); });
    button.addEventListener("mouseleave", () => { onRelease(); button.classList.remove("active"); });
  }

  private setFlag(key: string, isDown: boolean) {
    switch (key) {
      case "left": this.leftDown = isDown; break;
      case "right": this.rightDown = isDown; break;
      case "jump": this.jumpDown = isDown; break;
      case "interact": this.interactDown = isDown; break;
      case "attack": this.attackDown = isDown; break;
    }
  }

  show() {
    if (this.container && !this.isVisible) {
      this.container.style.display = "flex";
      this.isVisible = true;
    }
  }

  hide() {
    if (this.container && this.isVisible) {
      this.container.style.display = "none";
      this.isVisible = false;
    }
  }

  destroy() {
    if (this.container) {
      document.body.removeChild(this.container);
      this.container = null;
      this.isVisible = false;
    }
  }
}
