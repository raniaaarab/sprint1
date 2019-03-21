import { Component } from "@stencil/core";

@Component({
  tag: "evae-root"
})
export class EvaeRoot {
  render() {
    return [
      <adm-header />,
      <div>
        <slot />
      </div>
    ];
  }
}
