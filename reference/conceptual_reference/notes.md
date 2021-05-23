# Angular Concepts Overview

* Angular is a platform and framework for building single-page client applications using HTML and TypeScript. 

* The basic building blocks of the Angular framework are Angular components that are organized into *NgModels*.
  * Component define view, which are sets of screen elements that Angular can choose among and modify according to your program logic and data.
  * Component use services, which provide specific functionality not directly related to views. 

* Modules, components and services are classes that use *decorators*. These decorators mark their type and provide metadata that tells Angular how to use them.
* Angular provides the `Router` service to help you define navigation paths among views. 



### Modules

An NgModule declares a compilation context for a set of components that is dedicated to an application domain, a workflow, or a closely related set of capabilities. 

Every Angular app has a *root module*, conventionally named `AppModule`, which provides the bootstrap mechanism that launches the application. An app typically contains many functional modules.



### Components

Every Angular application has at least one component, the *root component* that connects a component hierarchy with the page **document object model (DOM)**.

**template, directives, and data binding**

There are two types of data binding:

- *Event binding* lets your app respond to user input in the target environment by updating your application data.
- *Property binding* lets you interpolate values that are computed from your application data into the HTML.

**pipe**

Your templates can use *pipes* to improve the user experience by transforming values for display. For example, use pipes to display dates and currency values that are appropriate for a user's locale.



### Services and dependency injection

For data or logic that isn't associated with a specific view, and that you want to share across components, you create a *service* class. A service class definition is immediately preceded by the `@Injectable()` decorator. The decorator provides the metadata that allows other providers to be **injected** as dependencies into your class.

**Routing**

It is modeled on the familiar browser navigation conventions:

- Enter a URL in the address bar and the browser navigates to a corresponding page.
- Click links on the page and the browser navigates to a new page.
- Click the browser's back and forward buttons and the browser navigates backward and forward through the history of pages you've seen.

*lazy-load:* when the router determines that the current application state requires particular functionality, and the module that defines it hasn't loaded. 

![overview2](https://angular.io/generated/images/guide/architecture/overview2.png)

- Together, a component and template define an Angular view.
  - A decorator on a component class adds the metadata, including a pointer to the associated template.
  - Directives and binding markup in a component's template modify views based on program data and logic.
- The dependency injector provides services to a component, such as the router service that lets you define navigation among views.



# Introduction to modules

## NgModule metadata

An NgModule is defined by a class decorated with `@NgModule()`. The `@NgModule()` decorator is a function that takes a single metadata object, whose properties describe the module. The most important properties are as follows.

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
@NgModule({
  imports:      [ BrowserModule ], // Other modules whose exported classes are needed by component templates declared in this NgModule. 一般是自带的module
  providers:    [ Logger ], // Creators of services that this NgModule contributes to the global collection of services; they become accessible in all parts of the app. (You can also specify providers at the component level.)
  declarations: [ AppComponent ], // The components, directives, and pipes that belong to this NgModule.
  exports:      [ AppComponent ], // The subset of declarations that should be visible and usable in the component templates of other NgModules.
  bootstrap:    [ AppComponent ] // The main application view, called the root component, which hosts all other app views. Only the root NgModule should set the bootstrap property.
})
export class AppModule { }
```

> A root NgModule has no reason to *export* anything because other modules don't need to *import* the root NgModule.



## NgModules and components

NgModules provide a *compilation context* for their components.

![view-hierarchy](https://angular.io/generated/images/guide/architecture/view-hierarchy.png)

When you create a component, it's associated directly with a single view, called the *host view*. The host view can be the root of a view hierarchy, which can contain *embedded views*, which are in turn the host views of other components. 



## NgModules and JavaScript modules

The NgModule system is different from and unrelated to the JavaScript (ES2015) module system for managing collections of JavaScript objects. These are *complementary* module systems that you can use together to write your apps.



## Angular libraries

![library-module](https://angular.io/generated/images/guide/architecture/library-module.png)

Angular loads as a collection of JavaScript modules. You can think of them as library modules. Each Angular library name begins with the `@angular` prefix. Install them with the node package manager `npm` and import parts of them with JavaScript `import` statements.

For example:

```typescript
import { BrowserModule } from '@angular/platform-browser';
```

To accès that material within `BrowserModule`, we need to add it to the `@NgModule` metadata:

```typescript
imports:      [ BrowserModule ],
```

In this way you're using the Angular and JavaScript module systems *together*.



# Introduction to components and templates

