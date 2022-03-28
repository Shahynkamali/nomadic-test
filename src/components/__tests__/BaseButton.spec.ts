import { describe, it, expect, beforeEach } from "vitest";

import { mount } from "@vue/test-utils";
import BaseButton from "../BaseButton.vue";

describe("BaseButton", () => {
  const createWrapper = () =>
    mount(BaseButton, {
      slots: {
        default: "I am button",
      },
    });
  it("should render the slot content", () => {
    const wrapper = createWrapper();
    expect(wrapper.html()).toContain("I am button");
  });
});
