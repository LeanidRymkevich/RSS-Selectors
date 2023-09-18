import { Task } from './types';

export const tasks: Task[] = [
  {
    id: 1,
    description: 'Select the circles',
    selector: 'circle',
    code: `<square></square>
           <circle></circle>
           <square></square>
           <circle></circle>`,
    codeWrapper: `<div class="code">
                    &lt;div class="table"&gt;

                    <div data-tag="square" class="code__item">
                      &lt;square&gt;&lt;/square&gt;
                    </div>

                    <div data-tag="circle" class="code__item">
                      &lt;circle&gt;&lt;/circle&gt;
                    </div>

                    <div data-tag="square" class="code__item">
                      &lt;square&gt;&lt;/square&gt;
                    </div>

                    <div data-tag="circle" class="code__item">
                    &lt;circle&gt;&lt;/circle&gt;
                    </div>

                    &lt;/div&gt;
                  </div>`,
  },
  {
    id: 2,
    description: 'Select a square inside a circle',
    selector: 'circle square',
    code: `<circle>
            <square></square>
          </circle>
          <circle>
            <circle></circle>
          </circle>
          <circle></circle>
          <square></square>`,
    codeWrapper: `<div class="code">
                    &lt;div class="table"&gt;

                    <div data-tag="circle" class="code__item">
                      &lt;circle&gt;

                      <div data-tag="square" class="code__item">
                        &lt;square&gt;&lt;/square&gt;
                      </div>

                      &lt;/circle&gt;
                    </div>

                    <div data-tag="circle" class="code__item">
                      &lt;circle&gt;

                      <div data-tag="circle" class="code__item">
                        &lt;circle&gt;&lt;/circle&gt;
                      </div>
                      
                      &lt;/circle&gt;
                    </div>

                    <div data-tag="circle" class="code__item">
                      &lt;circle&gt;&lt;/circle&gt;
                    </div>

                    <div data-tag="square" class="code__item">
                      &lt;square&gt;&lt;/square&gt;
                    </div>

                    &lt;/div&gt;
                  </div>`,
  },
  {
    id: 3,
    description: 'Select the red circle',
    selector: 'circle.red',
    code: `<circle>
            <circle class="red"></circle>
           </circle>
           <circle>
            <circle></circle>
           </circle>
           <circle></circle>
           <square class="red"></square>`,
    codeWrapper: `<div class="code">
                    &lt;div class="table"&gt;

                    <div data-tag="circle" class="code__item">
                    &lt;circle&gt;

                      <div data-tag="circle" data-class="red" class="code__item">
                        &lt;circle class="red"&gt;&lt;/circle&gt;
                      </div>

                      &lt;/circle&gt;
                    </div>

                    <div data-tag="circle" class="code__item">
                      &lt;circle&gt;

                      <div data-tag="circle" class="code__item">
                        &lt;circle&gt;&lt;/circle&gt;
                      </div>
                      
                      &lt;/circle&gt;
                    </div>

                    <div data-tag="circle" class="code__item">
                      &lt;circle&gt;&lt;/circle&gt;
                    </div>

                    <div data-tag="square" data-class="red" class="code__item">
                      &lt;square class="red"&gt;&lt;/square&gt;
                    </div>

                    &lt;/div&gt;
                  </div>`,
  },
  {
    id: 4,
    description: 'Select a square and a circle inside the big circles ',
    selector: 'circle > *',
    code: `<circle>
            <circle></circle>
           </circle>
           <square></square>
           <circle>
            <square></square>
           </circle>
           <circle></circle>
           `,
    codeWrapper: `<div class="code">
                  &lt;div class="table"&gt;
                  
                  <div data-tag="circle" class="code__item">
                      &lt;circle&gt;

                      <div data-tag="circle" class="code__item">
                        &lt;circle&gt;&lt;/circle&gt;
                      </div>
                      
                      &lt;/circle&gt;
                    </div>

                    <div data-tag="square" class="code__item">
                      &lt;square&gt;&lt;/square&gt;
                    </div>

                    <div data-tag="circle" class="code__item">
                    &lt;circle&gt;

                      <div data-tag="square" class="code__item">
                        &lt;square&gt;&lt;/square&gt;
                      </div>

                    &lt;/circle&gt;
                    </div>

                    <div data-tag="circle" class="code__item">
                      &lt;circle&gt;&lt;/circle&gt;
                    </div>

                  &lt;/div&gt;
                  </div>`,
  },
  {
    id: 5,
    description: 'Select the square with exclamation points(!!)',
    selector: '#one-only',
    code: `<square></square>
           <circle>
            <square id=one-only></square>
           </circle>
           <circle></circle>
           <circle class="red">
            <circle></circle>
           </circle>
           `,
    codeWrapper: `<div class="code">
                  &lt;div class="table"&gt;

                    <div data-tag="square" class="code__item">
                      &lt;square&gt;&lt;/square&gt;
                    </div>

                    <div data-tag="circle" class="code__item">
                    &lt;circle&gt;

                      <div data-tag="square" data-id="one-only" class="code__item">
                        &lt;square id="one-only"&gt;&lt;/square&gt;
                      </div>

                    &lt;/circle&gt;
                    </div>

                    <div data-tag="circle" class="code__item">
                      &lt;circle&gt;&lt;/circle&gt;
                    </div>

                    <div data-tag="circle" data-class="red" class="code__item">
                    &lt;circle class="red"&gt;

                      <div data-tag="circle" class="code__item">
                        &lt;circle&gt;&lt;/circle&gt;
                      </div>

                    &lt;/circle&gt;
                    </div>

                &lt;/div&gt;
                </div>`,
  },
  {
    id: 6,
    description: 'Select the red square with exclamation points(!!)',
    selector: 'square.red#one-only',
    code: `<square id=one-only class="red"></square>
           <circle></circle>
           <circle>
            <circle class="red"></circle>
           </circle>
           <circle>
            <square class="red"></square>
           </circle>
           `,
    codeWrapper: `<div class="code">
                  &lt;div class="table"&gt;

                    <div data-tag="square" data-class="red" data-id="one-only" class="code__item">
                      &lt;square class="red" id="one-only"&gt;&lt;/square&gt;
                    </div>

                    <div data-tag="circle" class="code__item">
                      &lt;circle&gt;&lt;/circle&gt;
                    </div>

                    <div data-tag="circle" class="code__item">
                    &lt;circle&gt;
      
                      <div data-tag="circle" data-class="red" class="code__item">
                        &lt;circle class="red"&gt;&lt;/circle&gt;
                      </div>
      
                    &lt;/circle&gt;
                    </div>

                    <div data-tag="circle" class="code__item">
                    &lt;circle&gt;

                      <div data-tag="square" data-class="red" class="code__item">
                        &lt;square class="red"&gt;&lt;/square&gt;
                      </div>

                    &lt;/circle&gt;
                    </div>

                  &lt;/div&gt;
                  </div>`,
  },
  {
    id: 7,
    description: 'Select the violet square and circle next to the white circle',
    selector: '.white ~ *',
    code: `<circle class="white">
             <square></square>
           </circle>
           <square>
             <circle></circle>
           </square>
           <circle>
             <circle></circle>
           </circle>
           `,
    codeWrapper: `<div class="code">
                  &lt;div class="table"&gt;

                    <div data-tag="circle" data-class="white" class="code__item">
                    &lt;circle class="white"&gt;
      
                      <div data-tag="square" class="code__item">
                        &lt;square&gt;&lt;/square&gt;
                      </div>
      
                    &lt;/circle&gt;
                    </div>

                    <div data-tag="square" class="code__item">
                    &lt;square&gt;

                      <div data-tag="circle" class="code__item">
                        &lt;circle&gt;&lt;/circle&gt;
                      </div>

                    &lt;/square&gt;
                    </div>

                    <div data-tag="circle" class="code__item">
                    &lt;circle&gt;
      
                      <div data-tag="circle" class="code__item">
                        &lt;circle&gt;&lt;/circle&gt;
                      </div>
      
                    &lt;/circle&gt;
                    </div>

                  &lt;/div&gt;
                  </div>`,
  },
  {
    id: 8,
    description: 'Select the shadowed circle',
    selector: '[data-shadowed=true]',
    code: `<circle data-shadowed=true>
             <square></square>
           </circle>
           <circle class="red">
             <circle></circle>
           </circle>
           <square>
             <circle></circle>
           </square>
           `,
    codeWrapper: `<div class="code">
                  &lt;div class="table"&gt;

                    <div data-tag="circle" data-attribute="data-shadowed=true" class="code__item">
                    &lt;circle data-shadowed=true&gt;

                      <div data-tag="square" class="code__item">
                        &lt;square&gt;&lt;/square&gt;
                      </div>

                    &lt;/circle&gt;
                    </div>

                    <div data-tag="circle" data-class="red" class="code__item">
                    &lt;circle class="red"&gt;

                      <div data-tag="circle" class="code__item">
                        &lt;circle&gt;&lt;/circle&gt;
                      </div>

                    &lt;/circle&gt;
                    </div>

                    <div data-tag="square" class="code__item">
                    &lt;square&gt;

                      <div data-tag="circle" class="code__item">
                        &lt;circle&gt;&lt;/circle&gt;
                      </div>

                    &lt;/square&gt;
                    </div>

                  &lt;/div&gt;
                  </div>`,
  },

  {
    id: 9,
    description: 'Select two violet rectangles inside figures',
    selector: 'rectangle:first-child',
    code: `<square>
             <rectangle></rectangle>
             <rectangle></rectangle>
           </square>
           <circle>
             <rectangle></rectangle>
             <rectangle></rectangle>
           </circle>
           `,
    codeWrapper: `<div class="code">
                  &lt;div class="table"&gt;

                    <div data-tag="square" class="code__item">
                    &lt;square&gt;

                      <div data-tag="rectangle" class="code__item">
                        &lt;rectangle&gt;&lt;/rectangle&gt;
                      </div>

                      <div data-tag="rectangle" class="code__item">
                        &lt;rectangle&gt;&lt;/rectangle&gt;
                      </div>

                    &lt;/square&gt;
                    </div>

                    <div data-tag="circle" class="code__item">
                    &lt;circle&gt;

                      <div data-tag="rectangle" class="code__item">
                        &lt;rectangle&gt;&lt;/rectangle&gt;
                      </div>

                      <div data-tag="rectangle" class="code__item">
                        &lt;rectangle&gt;&lt;/rectangle&gt;
                      </div>

                    &lt;/circle&gt;
                    </div>

                  &lt;/div&gt;
                  </div>`,
  },
  {
    id: 10,
    description: 'Select the rectangle with "?" inside',
    selector: 'rectangle:only-child',
    code: `<circle>
              <rectangle></rectangle>
           </circle>
           <square>
              <rectangle></rectangle>
              <rectangle></rectangle>
              <rectangle></rectangle>
           </square>
           <circle>
              <rectangle></rectangle>
              <rectangle></rectangle>
           </circle>
           `,
    codeWrapper: `<div class="code">
                  &lt;div class="table"&gt;

                  <div data-tag="circle" class="code__item">
                  &lt;circle&gt;

                    <div data-tag="rectangle" class="code__item">
                      &lt;rectangle&gt;&lt;/rectangle&gt;
                    </div>

                  &lt;/circle&gt;
                  </div>

                  <div data-tag="square" class="code__item">
                  &lt;square&gt;

                    <div data-tag="rectangle" class="code__item">
                      &lt;rectangle&gt;&lt;/rectangle&gt;
                    </div>

                    <div data-tag="rectangle" class="code__item">
                      &lt;rectangle&gt;&lt;/rectangle&gt;
                    </div>

                    <div data-tag="rectangle" class="code__item">
                      &lt;rectangle&gt;&lt;/rectangle&gt;
                    </div>

                  &lt;/square&gt;
                  </div>

                  <div data-tag="circle" class="code__item">
                  &lt;circle&gt;

                    <div data-tag="rectangle" class="code__item">
                      &lt;rectangle&gt;&lt;/rectangle&gt;
                    </div>

                    <div data-tag="rectangle" class="code__item">
                      &lt;rectangle&gt;&lt;/rectangle&gt;
                    </div>

                  &lt;/circle&gt;
                  </div>

                &lt;/div&gt;
                </div>`,
  },
];
