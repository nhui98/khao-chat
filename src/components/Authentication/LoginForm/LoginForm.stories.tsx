import { ComponentMeta, ComponentStory } from "@storybook/react";
import LoginForm from "./LoginForm";

export default {
  title: "authentication/loginform",
  component: LoginForm,
  argTypes: {},
  decorators: [(story) => story()],
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = () => <LoginForm />;

export const Base = Template.bind({});
