# Getting Started

## Create the product list

### 1. [NgForOf](https://angular.io/api/common/NgForOf)

A [structural directive](https://angular.io/guide/structural-directives) that renders a template for each item in a collection. The directive is placed on an element, which becomes the parent of the cloned templates.

#### a. selectors

**ngFor & ngForOf**

When you use `*ngFor`, the Angular compiler de-sugars that syntax into its cannonical form which has both attributes on the element.

So,

```typescript
  <div *ngFor="let item of items"></div>
```

desugars to:

```typescript
 <template [ngFor]="let item of items">
     <div></div>
 </template>
```

This first de-sugaring is due to the '*'. The next de-sugaring is because of the micro syntax: "let item of items". The Angular compiler de-sugars that to:

```typescript
<template ngFor let-item="$implicit" [ngForOf]="items">
   <div>...</div>
 </template>
```



**Syntactic sugar**

In [computer science](https://en.wikipedia.org/wiki/Computer_science), **syntactic sugar** is [syntax](https://en.wikipedia.org/wiki/Syntax_(programming_languages)) within a [programming language](https://en.wikipedia.org/wiki/Programming_language) that is designed to make things easier to read or to express. It makes the language "sweeter" for human use: things can be expressed more clearly, more concisely, or in an alternative style that some may prefer.

> de-sugar syntax



## Pass data between child and parent component

Key features in the `@Component()` are as follows:

- The `selector`, `app-product-alerts`, identifies the component. By convention, Angular component selectors begin with the prefix `app-`, followed by the component name.
- The template and style filenames reference the component's HTML and CSS.
- The `@Component()` definition also exports the class, `ProductAlertsComponent`, which handles functionality for the component.



### 1. Input

<img src = "https://angular.io/generated/images/guide/inputs-outputs/input.svg" width=500px/>

**[Usage](https://angular.io/guide/inputs-outputs)**

A common pattern in Angular is **sharing data between a parent component and one or more child components**. You can implement this pattern by using the `@Input()` and `@Output()` directives.

`@Input()` and `@Output()` give a child component a way to communicate with its parent component. `@Input()` allows a parent component to update data in the child component. Conversely, `@Output()` allows the child to send data to a parent component.

To use `@Input()`, you must configure the parent and child.

* Configuring the child component

  ```typescript
  import { Component, Input } from '@angular/core'; // First, import Input
  export class ItemDetailComponent {
    @Input() item = ''; // decorate the property with @Input()
  }
  ```

  In this case, `@Input()` decorates the property `item`, which has a type of `string`, however, `@Input()` properties can have any type, such as `number`, `string`, `boolean`, or `object`. The value for `item` comes from the parent component.

* Configuring the parent component

  1. Use the child's selector, here `<app-item-detail>`, as a directive within the parent component template.

  2. Use [property binding](https://angular.io/guide/property-binding) to bind the `item` property in the child to the `currentItem` property of the parent.

     ```typescript
     <app-item-detail [item]="currentItem"></app-item-detail>
     ```

  3. In the parent component class, designate a value for `currentItem`:

     ```typescript
     export class AppComponent {
       currentItem = 'Television';
     }
     ```

     

### 2. Output

<img src = "https://angular.io/generated/images/guide/inputs-outputs/output.svg" width=500px/>

`@Output()` marks a property in a child component as a doorway through which data can travel from the child to the parent.

The child component uses the `@Output()` property to raise an event to notify the parent of the change. To raise an event, an `@Output()` must have the type of `EventEmitter`, which is a class in `@angular/core` that you use to emit custom events.

* configuring the child component

  1. Import `Output` and `EventEmitter` in the child component class:

     ```typescript
     import { Output, EventEmitter } from '@angular/core';
     ```

  2. In the component class, decorate a property with `@Output()`. The following example `newItemEvent` `@Output()` has a type of `EventEmitter`, which means it's an event.

     src/app/item-output/item-output.component.ts

     ```typescript
     @Output() newItemEvent = new EventEmitter<string>();
     ```

     The different parts of the above declaration are as follows:

     - `@Output()`—a decorator function marking the property as a way for data to go from the child to the parent
     - `newItemEvent`—the name of the `@Output()`
     - `EventEmitter<string>`—the `@Output()`'s type
     - `new EventEmitter<string>()`—tells Angular to create a new event emitter and that the data it emits is of type string.

  3. Create an `addNewItem()` method in the same component class:

     ```typescript
     export class ItemOutputComponent {
     
       @Output() newItemEvent = new EventEmitter<string>();
     
       addNewItem(value: string) {
         this.newItemEvent.emit(value);
       }
     }
     ```

     

* configuring the parent component

  1. In the parent's template, bind the parent's method to the child's event.

  2. Put the child selector, here `<app-item-output>`, within the parent component's template, `app.component.html`.

     src/app/app.component.html

     ```
     content_copy<app-item-output (newItemEvent)="addItem($event)"></app-item-output>
     ```

     The event binding, `(newItemEvent)='addItem($event)'`, connects the event in the child, `newItemEvent`, to the method in the parent, `addItem()`.

     The `$event` contains the data that the user types into the `<input>` in the child template UI.

     To see the `@Output()` working, you can add the following to the parent's template:

     ```html
     content_copy<ul>
       <li *ngFor="let item of items">{{item}}</li>
     </ul>
     ```

     The `*ngFor` iterates over the items in the `items` array. When you enter a value in the child's `<input>` and click the button, the child emits the event and the parent's `addItem()` method pushes the value to the `items` array and new item renders in the list.

![input-output-diagram](https://angular.io/generated/images/guide/inputs-outputs/input-output-diagram.svg)



# Adding Navigation

## Associate a URL path with a component

## View product details

1. In `product-details.component.ts`, import `ActivatedRoute` from `@angular/router`, and the `products` array from `../products`.

   `ActivatedRoute` provides access to information about a route associated with a component that is loaded in an outlet. Use to traverse the `RouterState` tree and extract information from nodes.

2. Inject `ActivatedRoute` into the `constructor()` by adding `private route: ActivatedRoute` as an argument within the constructor's parentheses.

   By injecting `ActivatedRoute`, you are configuring the component to use a service. 

3. In the `ngOnInit()` method, extract the `productId` from the route parameters and find the corresponding product in the `products` array.

4. Update the `ProductDetailsComponent` template to display product details with an `*ngIf`. If a product exists, the `<div>` renders with a name, price, and description.

   The line, `<h4>{{ product.price | currency }}</h4>`, uses the `currency` pipe to transform `product.price` from a number to a currency string. A pipe is a way you can transform data in your HTML template. For more information about Angular pipes, see [Pipes](https://angular.io/guide/pipes).



# Managing Data

## Create the shopping cart service

In Angular, a service is an instance of a class that you can make available to any part of your application using Angular's [dependency injection system](https://angular.io/guide/glossary#dependency-injection-di).

The next step is to build a way for users to add products to a cart. This section walks you through adding a **Buy** button and setting up a cart service to store information about products in the cart.

[More details about service in angular](https://angular.io/guide/architecture-services)



## Create the cart view

For customers to see their cart, you can create the cart view in two steps:

1. Create a cart component and configure routing to the new component.
2. Display the cart items.



## Retrieve shipping prices

Servers often return data in the form of a stream. Streams are useful because they make it easy to transform the returned data and make modifications to the way you request that data. Angular `HttpClient` is a built-in way to fetch data from external APIs and provide them to your application as a stream.

### Configure AppModule to use HttpClient

To use Angular's `HttpClient`, you must configure your application to use `HttpClientModule`.

Angular's `HttpClientModule` registers the providers your application needs to use the `HttpClient` service

### Configure `CartService` to use `HttpClient`

The next step is to inject the `HttpClient` service into your service so your application can fetch data and interact with external APIs and resources.

1. In `cart.service.ts`, import `HttpClient` from the `@angular/common/http` package.

   src/app/cart.service.ts

   ```typescript
   content_copyimport { Injectable } from '@angular/core';
   import { HttpClient } from '@angular/common/http';
   import { Product } from './products';
   ```

2. Inject `HttpClient` into the `CartService` `constructor()`.

   src/app/cart.service.ts

   ```typescript
   content_copyexport class CartService {
     items: Product[] = [];
   
     constructor(
       private http: HttpClient
     ) {}
   }
   ```

### Configure `CartService` to get shipping prices

To get shipping data, from `shipping.json`, You can use the `HttpClient` `get()` method.



## Create a shipping component

The `async` pipe returns the latest value from a stream of data and continues to do so for the life of a given component. When Angular destroys that component, the `async` pipe automatically stops. 



# Using forms for user input

