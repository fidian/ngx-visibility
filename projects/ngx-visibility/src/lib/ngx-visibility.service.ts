import { Injectable, OnDestroy } from '@angular/core';

type EntryCallback = (isVisible: boolean) => void;

interface EntryInfo {
    callback: EntryCallback;
    config: IntersectionObserverInit;
    observer: IntersectionObserver;
}

@Injectable()
export class NgxVisibilityService implements OnDestroy {
    private entryMap = new Map<Element, EntryInfo>();
    private observerMap = new WeakMap<IntersectionObserverInit, IntersectionObserver>();
    private observerEntryCount = new Map<IntersectionObserver, number>();

    ngOnDestroy() {
        this.entryMap.forEach((entryInfo, element) => {
            this.unobserve(element);
        });
        this.observerEntryCount.forEach((count, observer) => {
            observer.disconnect();
        });
        this.entryMap.clear();
        this.observerEntryCount.clear();
        this.observerMap = new WeakMap();
    }

    observe(element: Element, callback: EntryCallback, config: IntersectionObserverInit = {}) {
        const observer = this.getObserver(config);
        this.entryMap.set(element, {
            callback,
            config,
            observer
        });
        observer.observe(element);
        const count = this.observerEntryCount.get(observer) || 0;
        this.observerEntryCount.set(observer, count + 1);
    }

    unobserve(element: Element) {
        const entryInfo = this.entryMap.get(element);

        if (entryInfo) {
            this.entryMap.delete(element);
            const count = this.observerEntryCount.get(entryInfo.observer) || 0;

            if (count <= 1) {
                this.observerEntryCount.delete(entryInfo.observer);
                this.observerMap.delete(entryInfo.config);
            } else {
                this.observerEntryCount.set(entryInfo.observer, count - 1);
            }
        }
    }

    private getObserver(config: IntersectionObserverInit) {
        let observer = this.observerMap.get(config);

        if (!observer) {
            observer = new IntersectionObserver(toggledEntries => {
                for (const entry of toggledEntries) {
                    const entryInfo = this.entryMap.get(entry.target);

                    if (entryInfo) {
                        entryInfo.callback(entry.isIntersecting);
                    }
                }
            }, config);
        }

        return observer;
    }
}
