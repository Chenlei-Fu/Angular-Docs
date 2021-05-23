# Components

## Overview

### Creating a component

#### 1. using the angular cli

```typescript
ng generate component <component-name>
```

#### 2. manually

To create a new component manually:

1. Navigate to your Angular project directory.

2. Create a new file, `<component-name>.component.ts`.

3. At the top of the file, add the following import statement.

   ```typescript
   import { Component } from '@angular/core';
   ```

4. Indicate selector, templateUrl and styleUrls.

   ```typescript
   @Component({
     selector: 'app-component-overview',
     templateUrl: './component-overview.component.html',
     styleUrls: ['./component-overview.component.css']
   })
   ```

5. Add a `class` statement that includes the code for the component.

   ```typescript
   export class ComponentOverviewComponent {
   }
   ```

* Specifying a component's CSS selector

  ```typescript
  @Component({
    selector: 'app-component-overview',
  })
  ```

  

* Defining a component's template

  ```typescript
  // external file
  @Component({
    selector: 'app-component-overview',
    templateUrl: './component-overview.component.html',
  })
  
  // HTML content
  @Component({
    selector: 'app-component-overview',
    template: '<h1>Hello World!</h1>',
  })
  ```

  

* Declaring a component's style

  ```typescript
  // external file
  @Component({
    selector: 'app-component-overview',
    templateUrl: './component-overview.component.html',
    styleUrls: ['./component-overview.component.css']
  })
  
  // css content
  @Component({
    selector: 'app-component-overview',
    template: '<h1>Hello World!</h1>',
    styles: ['h1 { font-weight: normal; }']
  })
  ```



## Lifecycle hooks

