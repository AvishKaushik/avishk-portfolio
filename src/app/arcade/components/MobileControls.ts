"use client";

export class MobileControls {
  private static instance: MobileControls | null = null;
  private container: HTMLDivElement | null = null;
  private isVisible = false;

  private constructor() {}

  static getInstance(): MobileControls {
    if (!MobileControls.instance) {
      MobileControls.instance = new MobileControls();
    }
    return MobileControls.instance;
  }

  create() {
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    if (this.container) return;

    this.container = document.createElement("div");
    this.container.className = "mobile-controls";
    
    this.container.innerHTML = `
      <div class="control-pad">
        <div class="d-pad">
          <button class="d-pad-btn up" data-direction="up">
            <span class="btn-icon">▲</span>
            <span class="btn-label">UP</span>
          </button>
          <div class="d-pad-middle">
            <button class="d-pad-btn left" data-direction="left">
              <span class="btn-icon">◀</span>
              <span class="btn-label">LEFT</span>
            </button>
            <button class="d-pad-btn right" data-direction="right">
              <span class="btn-icon">▶</span>
              <span class="btn-label">RIGHT</span>
            </button>
          </div>
          <button class="d-pad-btn down" data-direction="down">
            <span class="btn-icon">▼</span>
            <span class="btn-label">DOWN</span>
          </button>
        </div>
        <div class="action-buttons">
          <button class="action-btn jump" data-action="jump">
            <span class="btn-icon">🚀</span>
            <span class="btn-label">JUMP</span>
          </button>
        </div>
      </div>
    `;

    // Add enhanced styles
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
      
      .d-pad {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        background: rgba(0, 0, 0, 0.8);
        border-radius: 20px;
        padding: 15px;
        backdrop-filter: blur(15px);
        border: 2px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        pointer-events: auto;
      }
      
      .d-pad-middle {
        display: flex;
        gap: 8px;
      }
      
      .d-pad-btn {
        width: 55px;
        height: 55px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
        color: #fff;
        border-radius: 12px;
        cursor: pointer;
        user-select: none;
        touch-action: manipulation;
        transition: all 0.2s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        overflow: hidden;
      }
      
      .btn-icon {
        font-size: 20px;
        line-height: 1;
        margin-bottom: 2px;
      }
      
      .btn-label {
        font-size: 8px;
        font-weight: bold;
        opacity: 0.7;
        font-family: monospace;
      }
      
      .d-pad-btn:active,
      .d-pad-btn.active {
        background: linear-gradient(145deg, rgba(59, 130, 246, 0.4), rgba(59, 130, 246, 0.2));
        border-color: rgba(59, 130, 246, 0.6);
        transform: scale(0.95);
        box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.3);
      }
      
      .d-pad-btn.up {
        border-radius: 12px 12px 8px 8px;
      }
      
      .d-pad-btn.down {
        border-radius: 8px 8px 12px 12px;
      }
      
      .d-pad-btn.left {
        border-radius: 12px 8px 8px 12px;
      }
      
      .d-pad-btn.right {
        border-radius: 8px 12px 12px 8px;
      }
      
      .action-buttons {
        display: flex;
        flex-direction: column;
        gap: 10px;
        pointer-events: auto;
      }
      
      .action-btn {
        width: 70px;
        height: 70px;
        border: 3px solid rgba(34, 197, 94, 0.4);
        background: linear-gradient(145deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1));
        color: #fff;
        border-radius: 50%;
        cursor: pointer;
        user-select: none;
        touch-action: manipulation;
        transition: all 0.2s ease;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        box-shadow: 0 4px 16px rgba(34, 197, 94, 0.2);
      }
      
      .action-btn .btn-icon {
        font-size: 24px;
        margin-bottom: 2px;
      }
      
      .action-btn .btn-label {
        font-size: 9px;
        opacity: 0.8;
        font-family: monospace;
      }
      
      .action-btn:active,
      .action-btn.active {
        background: linear-gradient(145deg, rgba(34, 197, 94, 0.4), rgba(34, 197, 94, 0.2));
        border-color: rgba(34, 197, 94, 0.8);
        transform: scale(0.95);
        box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(34, 197, 94, 0.4);
      }
      
      @media (max-width: 768px) {
        .mobile-controls {
          display: block;
        }
      }
      
      @media (max-width: 480px) {
        .mobile-controls {
          bottom: max(15px, env(safe-area-inset-bottom));
        }
        
        .control-pad {
          padding: 0 max(15px, env(safe-area-inset-left)) 0 max(15px, env(safe-area-inset-right));
        }
        
        .d-pad {
          padding: 12px;
        }
        
        .d-pad-btn {
          width: 48px;
          height: 48px;
        }
        
        .btn-icon {
          font-size: 16px;
        }
        
        .btn-label {
          font-size: 7px;
        }
        
        .action-btn {
          width: 58px;
          height: 58px;
        }
        
        .action-btn .btn-icon {
          font-size: 18px;
        }
      }
      
      @media (max-width: 360px) {
        .mobile-controls {
          bottom: max(10px, env(safe-area-inset-bottom));
        }
        
        .control-pad {
          padding: 0 max(10px, env(safe-area-inset-left)) 0 max(10px, env(safe-area-inset-right));
        }
        
        .d-pad {
          padding: 10px;
          gap: 6px;
        }
        
        .d-pad-middle {
          gap: 6px;
        }
        
        .d-pad-btn {
          width: 42px;
          height: 42px;
        }
        
        .btn-icon {
          font-size: 14px;
        }
        
        .btn-label {
          font-size: 6px;
        }
        
        .action-btn {
          width: 52px;
          height: 52px;
        }
        
        .action-btn .btn-icon {
          font-size: 16px;
        }
        
        .action-btn .btn-label {
          font-size: 7px;
        }
      }
      
      @media (max-height: 600px) {
        .mobile-controls {
          bottom: 10px;
        }
        
        .d-pad-btn {
          width: 40px;
          height: 40px;
        }
        
        .action-btn {
          width: 50px;
          height: 50px;
        }
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(this.container);

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.container) return;

    // Handle D-pad buttons
    const dpadButtons = this.container.querySelectorAll('.d-pad-btn');
    dpadButtons.forEach(button => {
      const direction = button.getAttribute('data-direction');
      if (!direction) return;

      this.addButtonListeners(button, () => this.handleButtonPress(direction), () => this.handleButtonRelease(direction));
    });

    // Handle action buttons
    const actionButtons = this.container.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
      const action = button.getAttribute('data-action');
      if (!action) return;

      this.addButtonListeners(button, () => this.handleActionPress(action), () => this.handleActionRelease(action));
    });
  }

  private addButtonListeners(button: Element, onPress: () => void, onRelease: () => void) {
    // Touch events
    button.addEventListener('touchstart', (e) => {
      e.preventDefault();
      onPress();
      button.classList.add('active');
    });

    button.addEventListener('touchend', (e) => {
      e.preventDefault();
      onRelease();
      button.classList.remove('active');
    });

    // Mouse events for testing
    button.addEventListener('mousedown', () => {
      onPress();
      button.classList.add('active');
    });

    button.addEventListener('mouseup', () => {
      onRelease();
      button.classList.remove('active');
    });

    button.addEventListener('mouseleave', () => {
      onRelease();
      button.classList.remove('active');
    });
  }

  private handleButtonPress(direction: string) {
    console.log('Button pressed:', direction); // Debug log
    // Create custom keyboard events with proper properties
    const event = new KeyboardEvent('keydown', {
      key: this.getKeyForDirection(direction),
      code: this.getKeyCodeForDirection(direction),
      bubbles: true,
      cancelable: true,
    });
    window.dispatchEvent(event);
  }

  private handleButtonRelease(direction: string) {
    console.log('Button released:', direction); // Debug log
    // Create custom keyboard events with proper properties
    const event = new KeyboardEvent('keyup', {
      key: this.getKeyForDirection(direction),
      code: this.getKeyCodeForDirection(direction),
      bubbles: true,
      cancelable: true,
    });
    window.dispatchEvent(event);
  }

  private handleActionPress(action: string) {
    console.log('Action pressed:', action); // Debug log
    const event = new KeyboardEvent('keydown', {
      key: this.getKeyForAction(action),
      code: this.getKeyCodeForAction(action),
      bubbles: true,
      cancelable: true,
    });
    window.dispatchEvent(event);
  }

  private handleActionRelease(action: string) {
    console.log('Action released:', action); // Debug log
    const event = new KeyboardEvent('keyup', {
      key: this.getKeyForAction(action),
      code: this.getKeyCodeForAction(action),
      bubbles: true,
      cancelable: true,
    });
    window.dispatchEvent(event);
  }

  private getKeyForDirection(direction: string): string {
    switch (direction) {
      case 'up': return 'ArrowUp';
      case 'down': return 'ArrowDown';
      case 'left': return 'ArrowLeft';
      case 'right': return 'ArrowRight';
      default: return '';
    }
  }

  private getKeyCodeForDirection(direction: string): string {
    switch (direction) {
      case 'up': return 'ArrowUp';
      case 'down': return 'ArrowDown';
      case 'left': return 'ArrowLeft';
      case 'right': return 'ArrowRight';
      default: return '';
    }
  }

  private getKeyForAction(action: string): string {
    switch (action) {
      case 'jump': return ' '; // Spacebar
      default: return '';
    }
  }

  private getKeyCodeForAction(action: string): string {
    switch (action) {
      case 'jump': return 'Space';
      default: return '';
    }
  }

  show() {
    if (this.container && !this.isVisible) {
      this.container.style.display = 'block';
      this.isVisible = true;
    }
  }

  hide() {
    if (this.container && this.isVisible) {
      this.container.style.display = 'none';
      this.isVisible = false;
    }
  }

  destroy() {
    if (this.container && typeof document !== 'undefined') {
      document.body.removeChild(this.container);
      this.container = null;
      this.isVisible = false;
    }
  }
} 