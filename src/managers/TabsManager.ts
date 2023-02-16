import { html } from "../utils/html";

export class TabsManager {
    static readonly Tab = class Tab {
        readonly name: string;
        readonly content: (string | Node)[];

        #onClicks = new Set<(e: MouseEvent) => void>();

        constructor (name: string, content: (string | Node)[]) {
            this.name = name;
            this.content = content;
        }

        onClick(handler: (e: MouseEvent) => void) {
            this.#onClicks.add(handler);

            return this;
        }

        offClick(handler: (e: MouseEvent) => void) {
            return this.#onClicks.delete(handler);
        }
    }

    readonly tabsContainer = document.createElement("div");
    readonly tabElements: HTMLButtonElement[];

    constructor (readonly container: HTMLElement, readonly tabs: InstanceType<(typeof TabsManager)["Tab"]>[]) {
        this.tabsContainer.classList.add("tab-system-container");
        
        this.tabsContainer.append(...tabs.map((tab, i) => html`
            <button class="tab-system-tab ${i === 0 ? "active-tab" : ""}">
                <p class="tab-title-text">${tab.name}</p>
            </button>
        `));
        
        this.tabElements = Array.from(this.tabsContainer.querySelectorAll(".tab-system-tab"));

        this.tabElements.forEach((tab, i) => {
           tab.addEventListener("click", () => this.switchTabs(i)); 
        });

        this.container.append(this.tabsContainer);
    }
    
    switchTabs(index: number) {
        if (index < 0 || index >= this.tabs.length) return;
        
        this.activeTab.classList.remove("active-tab");
        this.tabElements[index].classList.add("active-tab");
    }
    
    get activeTab() {
        return this.tabsContainer.querySelector(".active-tab")!;
    }
}