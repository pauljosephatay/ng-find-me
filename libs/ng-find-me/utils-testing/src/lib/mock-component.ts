import { Component, Directive } from '@angular/core';

export function MockComponent(options: Component): Directive {
  const metadata: Component = {
    selector: options.selector,
    inputs: options.inputs,
    outputs: options.outputs,
    template: options.template,
  };
  return <any>Component(metadata)(class _ {});
}
