import InputAreaBlock from "../components/InputAreaBlock";

// eslint-disable-next-line import/prefer-default-export
export function validate(inputs: InputAreaBlock[]) {
    // собирает все значения в полях в форму (которую потом будет выводить)
    const form: Record<string, any> = {};
    inputs.forEach((element) => {
        form[element.getName()] = element.getValue();
    });

    // ещё раз проверяет у всех полей была ли пройдена валидация
    const isValid = inputs.every((element) => element.getValidationCheck());

    return { isValid, form }
}