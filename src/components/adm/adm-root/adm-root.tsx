import { Component } from "@stencil/core";

@Component({
  tag: "adm-root"
})
export class AdmRoot {
  render() {
    return [
      <adm-header />,
      <div>
        <slot />
      </div>
    ];
  }
}
