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
          <button class="d-pad-btn up" data-direction="up">▲</button>
          <div class="d-pad-middle">
            <button class="d-pad-btn left" data-direction="left">◀</button>
            <button class="d-pad-btn right" data-direction="right">▶</button>
          </div>
          <button class="d-pad-btn down" data-direction="down">▼</button>
        </div>
      </div>
    `;

    // Add styles
    const style = document.createElement("style");
    style.textContent = `
      .mobile-controls {
        position: fixed;
        bottom: 20px;
        left: 20px;
        z-index: 1000;
        display: none;
      }
      
      .control-pad {
        background: rgba(0, 0, 0, 0.7);
        border-radius: 50px;
        padding: 10px;
        backdrop-filter: blur(10px);
      }
      
      .d-pad {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
      }
      
      .d-pad-middle {
        display: flex;
        gap: 5px;
      }
      
      .d-pad-btn {
        width: 50px;
        height: 50px;
        border: 2px solid #fff;
        background: rgba(255, 255, 255, 0.2);
        color: #fff;
        border-radius: 10px;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        user-select: none;
        touch-action: manipulation;
        transition: all 0.1s ease;
      }
      
      .d-pad-btn:active,
      .d-pad-btn.active {
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0.95);
      }
      
      .d-pad-btn.up {
        border-radius: 10px 10px 5px 5px;
      }
      
      .d-pad-btn.down {
        border-radius: 5px 5px 10px 10px;
      }
      
      .d-pad-btn.left {
        border-radius: 10px 5px 5px 10px;
      }
      
      .d-pad-btn.right {
        border-radius: 5px 10px 10px 5px;
      }
      
      @media (max-width: 768px) {
        .mobile-controls {
          display: block;
        }
        
        .d-pad-btn {
          width: 45px;
          height: 45px;
          font-size: 18px;
        }
      }
      
      @media (max-width: 480px) {
        .mobile-controls {
          bottom: 15px;
          left: 15px;
        }
        
        .d-pad-btn {
          width: 40px;
          height: 40px;
          font-size: 16px;
        }
      }
    `;

    document.head.appendChild(style);
    document.body.appendChild(this.container);

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.container) return;

    const buttons = this.container.querySelectorAll('.d-pad-btn');
    
    buttons.forEach(button => {
      const direction = button.getAttribute('data-direction');
      if (!direction) return;

      // Touch events
      button.addEventListener('touchstart', (e) => {
        e.preventDefault();
        this.handleButtonPress(direction);
        button.classList.add('active');
      });

      button.addEventListener('touchend', (e) => {
        e.preventDefault();
        this.handleButtonRelease(direction);
        button.classList.remove('active');
      });

      // Mouse events for testing
      button.addEventListener('mousedown', () => {
        this.handleButtonPress(direction);
        button.classList.add('active');
      });

      button.addEventListener('mouseup', () => {
        this.handleButtonRelease(direction);
        button.classList.remove('active');
      });

      button.addEventListener('mouseleave', () => {
        this.handleButtonRelease(direction);
        button.classList.remove('active');
      });
    });
  }

  private handleButtonPress(direction: string) {
    // Create custom keyboard events
    const event = new KeyboardEvent('keydown', {
      key: this.getKeyForDirection(direction),
      code: this.getKeyCodeForDirection(direction),
    });
    document.dispatchEvent(event);
  }

  private handleButtonRelease(direction: string) {
    // Create custom keyboard events
    const event = new KeyboardEvent('keyup', {
      key: this.getKeyForDirection(direction),
      code: this.getKeyCodeForDirection(direction),
    });
    document.dispatchEvent(event);
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