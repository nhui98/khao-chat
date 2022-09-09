import { ComponentMeta, ComponentStory } from "@storybook/react";
import RegisterForm from "./RegisterForm";

export default {
  title: "authentication/registerform",
  component: RegisterForm,
  argTypes: {},
  decorators: [],
} as ComponentMeta<typeof RegisterForm>;

const Template: ComponentStory<typeof RegisterForm> = () => <RegisterForm />;

export const Base = Template.bind({});
