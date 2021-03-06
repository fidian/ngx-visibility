import { Injectable, OnDestroy } from '@angular/core';

type EntryCallback = (isVisible: boolean) => void;

interface EntryInfo {
    callback: EntryCallback;
    observerInfo: ObserverInfo;
}

interface ObserverInfo {
    config: IntersectionObserverInit;
    count: number;
    observer: IntersectionObserver;
}

@Injectable()
export class NgxVisibilityService implements OnDestroy {
    private entryMap = new Map<Element, EntryInfo>();
    private observerInfoList: ObserverInfo[] = [];

    ngOnDestroy() {
        this.entryMap.forEach((entryInfo, element) => {
            this.unobserve(element);
        });
        this.entryMap.clear();
    }

    observe(
        element: Element,
        callback: EntryCallback,
        config: IntersectionObserverInit = {}
    ) {
        const configCopy = {
            root: config.root || null,
            rootMargin: config.rootMargin || '0px',
            threshold: [].concat(config.threshold || 0)
        };
        const observerInfo = this.getObserver(configCopy);
        this.entryMap.set(element, {
            callback,
            observerInfo
        });
        observerInfo.observer.observe(element);
        observerInfo.count += 1;
    }

    unobserve(element: Element) {
        const entryInfo = this.entryMap.get(element);

        if (entryInfo) {
            this.entryMap.delete(element);
            entryInfo.observerInfo.count -= 1;

            if (entryInfo.observerInfo.count === 0) {
                entryInfo.observerInfo.observer.disconnect();
                this.observerInfoList = this.observerInfoList.filter(
                    oi => oi.observer !== entryInfo.observerInfo.observer
                );
            }
        }
    }

    private getObserver(config: IntersectionObserverInit) {
        const configThresholdString = [].concat(config.threshold).join(' ');
        const filteredList = this.observerInfoList.filter(
            oi =>
                oi.config.root === config.root &&
                oi.config.rootMargin === config.rootMargin &&
                [].concat(oi.config.threshold).join(' ') ===
                    configThresholdString
        );

        if (filteredList && filteredList.length) {
            return filteredList[0];
        }

        const observer = new IntersectionObserver(toggledEntries => {
            for (const entry of toggledEntries) {
                const entryInfo = this.entryMap.get(entry.target);

                if (entryInfo) {
                    entryInfo.callback(entry.isIntersecting);
                }
            }
        }, config);

        const observerInfo = {
            observer,
            config,
            count: 0
        };
        this.observerInfoList.push(observerInfo);

        return observerInfo;
    }
}
