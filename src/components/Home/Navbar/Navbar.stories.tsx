import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AuthContextProvider } from "../../../context/AuthContext";
import Navbar from "./Navbar";

export default {
  title: "home/navbar",
  component: Navbar,
  argTypes: {},
  decorators: [(story) => <AuthContextProvider>{story()}</AuthContextProvider>],
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = () => <Navbar />;

export const Base = Template.bind({});
