import { UserInputValidators } from "@repo/zod";

export const createValidators = () => {
  const userInputValidators = new UserInputValidators();

  return {
    userInputValidators,
  };
};
