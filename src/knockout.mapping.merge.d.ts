interface KnockoutMapping {
    mergeFromJS(model: any, data: any);
    mergeRules: Function[];
}

interface KnockoutObservableArray<T> {
    withMergeConstructor(objectConstructor: Function) : KnockoutObservableArray<T>;
    withMergeConstructor(objectConstructor: Function, replaceOnMerge: boolean) : KnockoutObservableArray<T>;
}

interface KnockoutObservable<T> {
    withMergeMethod(mergeMethod: Function) : KnockoutObservable<T>;
    withMergeRule(mergeRule: string) : KnockoutObservable<T>;
}