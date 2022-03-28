import { describe, it, expect, beforeEach } from "vitest";

import { mount } from "@vue/test-utils";
import ProgramTile from "../ProgramTile.vue";

describe("ProgramTile", () => {
  let enrolled: boolean;
  beforeEach(() => {
    enrolled = false;
  });
  const createWrapper = () =>
    mount(ProgramTile, {
      props: { program: { title: "Example Program", id: 1, image: "image", enrolled } },
    });
  it("renders properly", () => {
    const wrapper = createWrapper();
    expect(wrapper.text()).toContain("Example Program");
  });

  it("renders Start Now is the user is not enrolled", () => {
    const wrapper = createWrapper();
    expect(wrapper.text()).toContain("Start Now");
  });

  it("renders Enrolled is the user is already enrolled", () => {
    enrolled = true;
    const wrapper = createWrapper();
    expect(wrapper.text()).toContain("Enrolled");
  });
});
