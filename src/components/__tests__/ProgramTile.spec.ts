import { describe, it, expect, beforeEach } from "vitest";

import { mount } from "@vue/test-utils";
import ProgramTile from "../ProgramTile.vue";

describe("ProgramTile", () => {
  let enrolled: boolean;
  beforeEach(() => {
    enrolled = false;
  });
  it("renders properly", () => {
    const wrapper = mount(ProgramTile, {
      props: { program: { title: "Example Program", id: 1, image: "kljads", enrolled } },
    });
    expect(wrapper.text()).toContain("Example Program");
  });

  it("renders Start Now is the user is already enrolled", () => {
    const wrapper = mount(ProgramTile, {
      props: { program: { title: "Example Program", id: 1, image: "kljads", enrolled } },
    });
    expect(wrapper.text()).toContain("Start Now");
  });

  it("renders Enrolled is the user is already enrolled", () => {
    enrolled = true;
    const wrapper = mount(ProgramTile, {
      props: { program: { title: "Example Program", id: 1, image: "kljads", enrolled } },
    });
    expect(wrapper.text()).toContain("Enrolled");
  });
});
