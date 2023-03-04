import { Form, FormProps } from "src/core/components/Form";
import { LabeledTextField } from "src/core/components/LabeledTextField";
import { z } from "zod";
export { FORM_ERROR } from "src/core/components/Form";

export function PromotionForm<S extends z.ZodType<any, any>>(
  props: FormProps<S>
) {
  return (
    <Form<S> {...props}>
      <LabeledTextField name="title" label="title" placeholder="title" />
      <LabeledTextField name="userId" label="userId" placeholder="userId" type="number" />
    </Form>
  );
}
