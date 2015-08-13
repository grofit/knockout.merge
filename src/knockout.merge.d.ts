/// <reference path="../knockout/knockout.d.ts" />

interface KnockoutMerge {
    fromJS(model: any, data: any);
    rules: Function[];
    globalHandlers: Function[];
}

interface KnockoutObservableArray<T> {
    withMergeConstructor(objectConstructor: Function) : KnockoutObservableArray<T>;
    withMergeConstructor(objectConstructor: Function, replaceOnMerge: boolean) : KnockoutObservableArray<T>;
}

interface KnockoutObservable<T> {
    withMergeMethod(mergeMethod: Function) : KnockoutObservable<T>;
    withMergeRule(mergeRule: string) : KnockoutObservable<T>;
}

interface KnockoutStatic
{
    merge: KnockoutMerge;
}

declare var koMerge: KnockoutMerge;
declare module "knockout.merge"
{
    export = koMerge;
}