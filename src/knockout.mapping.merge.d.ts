/// <reference path="../knockout/knockout.d.ts" />
/// <reference path="../knockout.mapping/knockout.mapping.d.ts" />

interface KnockoutMerge {
    fromJS(model: any, data: any);
    rules: Function[];
}

interface KnockoutObservableArray<T> {
    withMergeConstructor(objectConstructor: Function) : KnockoutObservableArray<T>;
    withMergeConstructor(objectConstructor: Function, replaceOnMerge: boolean) : KnockoutObservableArray<T>;
}

interface KnockoutObservable<T> {
    withMergeMethod(mergeMethod: Function) : KnockoutObservable<T>;
    withMergeRule(mergeRule: string) : KnockoutObservable<T>;
}

interface KnockoutMapping
{
    merge: KnockoutMerge;
}