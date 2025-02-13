import React from 'react';
import { Input, Button, FormItem, FormContainer, Alert } from 'components/ui';
import { PasswordInput, ActionLink } from 'components/shared';
import useTimeOutMessage from 'utils/hooks/useTimeOutMessage';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import useAuth from 'utils/hooks/useAuth';

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Please enter your full name'),
  email: Yup.string()
    .email('Invalid email')
    .required('Please enter your email'),
  password: Yup.string().required('Please enter your password'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Your passwords do not match'
  ),
});

const SignUpForm = (props) => {
  const { disableSubmit = false, className, signInUrl = '/sign-in' } = props;

  const { signUp } = useAuth();

  const [message, setMessage] = useTimeOutMessage();

  const onSignUp = async (values, setSubmitting) => {
    const { fullName, password, email } = values;
    setSubmitting(true);
    const result = await signUp({ fullName, password, email });

    if (result.status === 'failed') {
      setMessage(result.message);
    }

    setSubmitting(false);
  };

  return (
    <div className={className}>
      {message && (
        <Alert className="mb-4" type="danger" showIcon>
          {message}
        </Alert>
      )}
      <Formik
        initialValues={{
          fullName: 'admin1',
          password: '123Qwe1',
          confirmPassword: '123Qwe1',
          email: 'test@testmail.com',
        }}
        validationSchema={validationSchema}
        // actions.setSubmitting (ref: https://formik.org/docs/api/formik)
        onSubmit={(values, { setSubmitting }) => {
          if (!disableSubmit) {
            onSignUp(values, setSubmitting);
          } else {
            setSubmitting(false);
          }
        }}
      >
        {({ touched, errors, isSubmitting }) => (
          <Form>
            <FormContainer>
              <FormItem
                label="Email"
                invalid={errors.email && touched.email}
                errorMessage={errors.email}
              >
                <Field
                  type="email"
                  autoComplete="off"
                  name="email"
                  placeholder="Email"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="Full Name"
                invalid={errors.fullName && touched.fullName}
                errorMessage={errors.fullName}
              >
                <Field
                  type="text"
                  autoComplete="off"
                  name="fullName"
                  placeholder="John Doe"
                  component={Input}
                />
              </FormItem>
              <FormItem
                label="Password"
                invalid={errors.password && touched.password}
                errorMessage={errors.password}
              >
                <Field
                  autoComplete="off"
                  name="password"
                  placeholder="Password"
                  component={PasswordInput}
                />
              </FormItem>
              <FormItem
                label="Confirm Password"
                invalid={errors.confirmPassword && touched.confirmPassword}
                errorMessage={errors.confirmPassword}
              >
                <Field
                  autoComplete="off"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  component={PasswordInput}
                />
              </FormItem>
              <Button
                block
                loading={isSubmitting}
                variant="solid"
                type="submit"
              >
                {isSubmitting ? 'Creating Account...' : 'Sign Up'}
              </Button>
              <div className="mt-4 text-center">
                <span>Already have an account? </span>
                <ActionLink to={signInUrl}>Sign in</ActionLink>
              </div>
            </FormContainer>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
