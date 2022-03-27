import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import ProgramTile from "../ProgramTile.vue";

describe("ProgramTile", () => {
  it("renders properly", () => {
    const wrapper = mount(ProgramTile, {
      props: { program: { title: "Example Program" } },
    });
    expect(wrapper.text()).toContain("Example Program");
  });
});
